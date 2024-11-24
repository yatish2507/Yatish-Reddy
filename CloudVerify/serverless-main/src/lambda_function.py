import os
import json
from utils.email_service import send_verification_email

def lambda_handler(event, context):
    """Main Lambda function handler."""
    try:
        sendgrid_api_key = os.environ.get("SENDGRID_API_NAME")
        domain_name = os.environ.get("DOMAIN_NAME")
        if not sendgrid_api_key:
            raise ValueError("SENDGRID_API_NAME environment variable is not set.")


        # Process SNS message
        for record in event['Records']:
            message = json.loads(record['Sns']['Message'])
            email = message['email']
            token = message['verification_token']
            expires_at = message['expires_at']

            # Generate verification link
            verification_link = f"http://{domain_name}/v1/user/verify?user={email}&token={token}"

            # Send verification email
            send_verification_email(
                email=email,
                verification_link=verification_link,
                sendgrid_api_key=sendgrid_api_key
            )
            print(f"Verification email sent to {email}")

        return {
            "statusCode": 200,
            "body": json.dumps("Verification email processed successfully.")
        }

    except Exception as e:
        print(f"Error processing verification email: {str(e)}")
        return {
            "statusCode": 500,
            "body": json.dumps(f"Error: {str(e)}")
        }
