from flask import Blueprint, jsonify, request, make_response
from email_validator import validate_email, EmailNotValidError
from sqlalchemy.exc import OperationalError, IntegrityError
from sqlalchemy import text
import os
from dotenv import load_dotenv
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from app import bcrypt
from functools import wraps
from app.models import User, Image, EmailVerification
from app.metrics import api_metrics, track_s3_operation
import datetime
import uuid
import boto3
import logging
import json

load_dotenv()


routes = Blueprint('routes', __name__)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

file_handler = logging.FileHandler('/tmp/webapp_routes.log')
file_handler.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)

s3_client = boto3.client('s3')
S3_BUCKET = os.getenv('BUCKET_NAME')

sns_client = boto3.client('sns', region_name='us-east-1')
sns_topic_arn = os.getenv('SNS_TOPIC_ARN')

if not S3_BUCKET:
    logger.error("S3_BUCKET environment variable not set.")

logger.info(f"S3 Bucket Name: {S3_BUCKET}")

@track_s3_operation
def upload_image_to_s3(file, user_id):
    if not hasattr(file, 'filename') or not isinstance(user_id, str):
        logger.error(f"Invalid file or user_id: file={file}, user_id={user_id}")
        raise ValueError("Invalid file or user_id.")
    
    filename = f'{user_id}_{file.filename}'
    
    logger.info(f"Uploading file to S3 with filename: {filename}")
    
    s3_client.upload_fileobj(
        file,
        S3_BUCKET,
        filename,
        ExtraArgs={"ContentType": file.content_type}
    )
    return f'https://{S3_BUCKET}.s3.amazonaws.com/{filename}'

def handle_response(status_code):
    response = make_response('', status_code)
    response.headers['Cache-Control'] = 'no-cache'
    response.headers['Content-Length'] = '0'
    return response

#Uses send grid api to send email
def send_email(to_email, subject, content):
    message = Mail(
        from_email='jayaramareddy.y@northeastern.edu',
        to_emails=to_email,
        subject=subject,
        html_content=content
    )
    try:
        sg = SendGridAPIClient(os.getenv('SENDGRID_API_KEY'))
        sg.send(message)
    except Exception as e:
        print(f"Error sending email: {e}")

#Web app health check
@routes.route('/healthz', methods=['GET'])
def health_check():
    if request.method == 'GET':
        if request.content_length or request.data or request.query_string or request.form:  
            return handle_response(400)
        else:
            try:
                from app import db
                db.session.execute(text('SELECT 1'))
                return handle_response(200)
            except OperationalError:
                return handle_response(503)
    else:
        return handle_response(405)
    
@routes.route('/cicd', methods=['GET'])
def demo_check():
    if request.method == 'GET':
        if request.content_length or request.data or request.query_string or request.form:  
            return handle_response(400)
        else:
            try:
                from app import db
                db.session.execute(text('SELECT 1'))
                return handle_response(200)
            except OperationalError:
                return handle_response(503)
    else:
        return handle_response(405)

def token_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        auth = request.authorization
        if not auth or not auth.username or not auth.password:
            return handle_response(401)

        user = User.query.filter_by(email=auth.username).first()
        if not user or not bcrypt.check_password_hash(user.password, auth.password):
            return handle_response(401)
        
        if not user.is_verified:
            logger.warning("User %s attempted to access an endpoint without email verification.", user.id)
            return jsonify({"error": "Email verification required"}), 403

        return f(user, *args, **kwargs)

    return wrapper

#Creating new user
@routes.route('/v1/user', methods=['POST'])
@api_metrics('CreateUserAPI')
def create_user():
    if not request.is_json:
        logger.warning("Invalid request: JSON expected")
        return handle_response(400)
    
    user_data = request.get_json()
    required_fields = {"first_name", "last_name", "password", "email"}

    if not all(field in user_data for field in required_fields):
        logger.warning("Missing required fields in user data")
        return handle_response(400)

    if not set(user_data.keys()).issubset(required_fields):
        logger.warning("Unexpected fields in user data")
        return handle_response(400)

    first_name = user_data.get("first_name")
    last_name = user_data.get("last_name")
    password = user_data.get("password")
    email = user_data.get("email")

    if not first_name.isalpha() or not last_name.isalpha():
        logger.warning("Name fields should contain only alphabetic characters")
        return handle_response(400)
    
    try:
        valid = validate_email(email)
        email = valid.email
    except EmailNotValidError:
        logger.warning("Invalid email provided")
        return handle_response(400)

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        logger.warning("User with this email already exists")
        return handle_response(400)

    new_user = User(
        id=str(uuid.uuid4()),
        first_name=first_name,
        last_name=last_name,
        password=bcrypt.generate_password_hash(password).decode('utf-8'),
        email=email,
        account_created=datetime.datetime.now(datetime.timezone.utc),
        account_updated=datetime.datetime.now(datetime.timezone.utc),
        is_verified=False
    )

    try:
        from app import db
        db.session.add(new_user)
        db.session.commit()
        logger.info("User created successfully with email: %s", email)

        verification_token = str(uuid.uuid4())
        expiration_time = datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=2)

        email_verification = EmailVerification(
            id=str(uuid.uuid4()),
            user_id=new_user.id,
            email=email,
            token=verification_token,
            created_at=datetime.datetime.now(datetime.timezone.utc),
            expires_at=expiration_time
        )
        db.session.add(email_verification)
        db.session.commit()
        logger.info("Verification record added for user ID: %s", new_user.id)

        message = {
            "user_id": new_user.id,
            "email": email,
            "first_name": first_name,
            "verification_token": verification_token,
            "expires_at": expiration_time.isoformat()
        }

        sns_client.publish(
            TopicArn=sns_topic_arn,
            Message=json.dumps(message),
            Subject="User Registration - Email Verification"
        )
        
        logger.info("Published message to SNS for email verification to %s", email)
        
        return jsonify({
            "id": new_user.id,
            "first_name": new_user.first_name,
            "last_name": new_user.last_name,
            "email": new_user.email,
            "account_created": new_user.account_created,
            "account_updated": new_user.account_updated
        }), 201
    except IntegrityError:
        db.session.rollback()
        logger.error("Database integrity error while creating new user")
        return handle_response(400)
    except Exception as e:
        db.session.rollback()
        logger.exception("Unexpected error during user creation: %s", str(e))
        return handle_response(500)

#Email verification endpoint and is_verified field update
@routes.route('/v1/user/verify', methods=['GET'])
def verify_user():
    token = request.args.get('token')
    if not token:
        logger.warning("No token provided for email verification")
        return jsonify({"message": "Token missing"}), 400

    try:
        from app import db
        verification_record = EmailVerification.query.filter_by(token=token).first()

        if not verification_record:
            logger.warning("Invalid token")
            return jsonify({"message": "Invalid token"}), 404
        
        expires_at = verification_record.expires_at.replace(tzinfo=datetime.timezone.utc)

        if expires_at < datetime.datetime.now(datetime.timezone.utc):
            logger.warning("Token expired")
            db.session.delete(verification_record)
            db.session.commit()
            return jsonify({"message": "Verification link has expired"}), 410

        user = User.query.filter_by(id=verification_record.user_id).first()
        if user:
            user.is_verified = True
            user.account_updated = datetime.datetime.now(datetime.timezone.utc)
            db.session.delete(verification_record)
            db.session.commit()
            logger.info("User %s verified successfully", user.id)
            return jsonify({
                "message": "Email verified successfully",
                "user_details": {
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "email": user.email
                }
            }), 200
        else:
            logger.warning("User not found for token")
            return jsonify({"message": "User not found"}), 404
    except Exception as e:
        logger.exception("Unexpected error during email verification: %s", str(e))
        return jsonify({"message": "Internal server error"}), 500

#Retreiving and Updating User details
@routes.route('/v1/user/self', methods=['PUT', 'GET'])
@api_metrics('GetUserAPI')
@token_required
def user_self_handler(user):
    if request.method == 'GET':
        logger.info("Handling GET request for user self")
        
        if request.content_length or request.data or request.query_string or request.form:
            logger.warning("GET request with unexpected payload for user ID: %s", user.id)
            return handle_response(400)

        logger.info("Returning user information for user ID: %s", user.id)
        return jsonify({
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "account_created": user.account_created,
            "account_updated": user.account_updated
        }), 200
        
    elif request.method == 'PUT':
        logger.info("Handling PUT request for updating user self")

        if not request.is_json:
            logger.error("PUT request with non-JSON payload for user ID: %s", user.id)
            return handle_response(400)

        user_data = request.get_json()
        updatable_fields = ["first_name", "last_name", "password","email"]

        if any(field not in updatable_fields for field in user_data):
            logger.warning("PUT request with invalid fields for user ID: %s", user.id)
            return handle_response(400)
        
        if "email" in user_data:
            if user_data["email"] != user.email:
                logger.error("Email update mismatch for user ID: %s", user.id)
                return handle_response(400)
        if "first_name" in user_data:
            if not user_data["first_name"].isalpha():
                logger.warning("Invalid first name format for user ID: %s", user.id)
                return handle_response(400)
            else:
                user.first_name = user_data["first_name"]
        if "last_name" in user_data:
            if not user_data["last_name"].isalpha():
                logger.warning("Invalid last name format for user ID: %s", user.id)
                return handle_response(400)
            else:
                user.last_name = user_data["last_name"]
        if "password" in user_data:
            logger.debug("Updating password for user ID: %s", user.id)
            user.password = bcrypt.generate_password_hash(user_data["password"]).decode('utf-8')

        user.account_updated = datetime.datetime.now(datetime.timezone.utc)

        try:
            from app import db
            db.session.commit()
            logger.info("User information updated successfully for user ID: %s", user.id)
            
            send_email(user.email,'Profile Updated',f"<p>Hello {user.first_name},</p><p>Your profile information has been successfully updated.</p>")
            
            return "", 204
        except IntegrityError:
            db.session.rollback()
            logger.error("Database integrity error while updating user ID: %s", user.id)
            return handle_response(400)
        except Exception as e:
            db.session.rollback()
            logger.exception("Unexpected error while updating user ID: %s", user.id)
            return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
    else:
        logger.warning("Unsupported method %s requested on /v1/user/self by user ID: %s", request.method, user.id)
        return handle_response(405)
    pass    

#Uploading image to S3 bucket    
@routes.route('/v1/user/self/pic', methods=['POST'])
@api_metrics('AddPicAPI')
@token_required
def upload_profile_pic(user):
    
    if 'profilePic' not in request.files:
        logger.warning("profilePic file not found in request")
        return handle_response(400)
    
    existing_image = Image.query.filter_by(user_id=user.id).first()
    
    if existing_image:
        logger.warning(f"User {user.id} already has a profile picture. Only one profile picture is allowed.")
        return handle_response(409)
    
    file = request.files['profilePic']
    
    if file.content_type not in ['image/png', 'image/jpeg']:
        logger.warning(f"Unsupported file type: {file.content_type}")
        return handle_response(400)

    try:
        image_url = upload_image_to_s3(file, user.id)
        new_image = Image(
            id=str(uuid.uuid4()),
            file_name=file.filename,
            url=image_url,
            user_id=user.id,
            upload_date=datetime.datetime.now(datetime.timezone.utc)
        )
        from app import db
        db.session.add(new_image)
        db.session.commit()
        logger.info("Profile picture uploaded successfully")
        
        send_email(user.email,'Profile Picture Added',f"<p>Hello {user.first_name},</p><p>Your profile picture was successfully uploaded.</p>")

        return jsonify({
            "file_name": file.filename,
            "id": new_image.id,
            "url": image_url,
            "upload_date": new_image.upload_date.isoformat(),
            "user_id": user.id
        }), 201

    except Exception as e:
        logger.error(f"Failed to upload profile picture: {str(e)}")
        from app import db
        db.session.rollback()
        return handle_response(500)

#Retreiving image from bucket
@routes.route('/v1/user/self/pic', methods=['GET'])
@api_metrics('GetPicAPI')
@token_required
def get_profile_pic(user):
    from app.models import Image
    image = Image.query.filter_by(user_id=user.id).first()
    if not image:
        logger.error(f"No image found for user ID {user.id}")
        return handle_response(404)
    
    return jsonify({
        "file_name": image.file_name,
        "id": image.id,
        "url": image.url,
        "upload_date": image.upload_date.isoformat(),
        "user_id": user.id
    }), 200

#Deleting profile picture
@routes.route('/v1/user/self/pic', methods=['DELETE'])
@api_metrics('DeletePicAPI')
@token_required
def delete_profile_pic(user):
    from app.models import Image
    image = Image.query.filter_by(user_id=user.id).first()
    if not image:
        logger.error(f"No image found for user ID {user.id}")
        return handle_response(404)
    
    try:
        s3_key = f"{user.id}_{image.file_name}"
        response = s3_client.delete_object(Bucket=S3_BUCKET, Key=s3_key)
        logger.info(f"S3 delete response: {response}")
        from app import db
        db.session.delete(image)
        db.session.commit()
        send_email(user.email, 'Profile Picture Deleted', f"<p>Hello {user.first_name},</p><p>Your profile picture was successfully deleted.</p>")
        return "", 204
    except Exception as e:
        logger.error(f'Failed to delete image: {str(e)}')
        return handle_response(500)