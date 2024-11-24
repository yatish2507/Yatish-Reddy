import datetime
from app import db
import uuid
from app.metrics import track_db_query

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.String, primary_key=True, nullable=False)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    account_created = db.Column(db.DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc), nullable=False)
    account_updated = db.Column(db.DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc), onupdate=datetime.datetime.now(datetime.timezone.utc), nullable=False)
    is_verified = db.Column(db.Boolean, default=False, nullable=False)

    def __repr__(self):
        return f"<User(id={self.id}, first_name={self.first_name}, last_name={self.last_name}, email={self.email})>"

class Image(db.Model):
    __tablename__ = 'image'

    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()),unique=True, nullable=False)
    file_name = db.Column(db.String, nullable=False)
    url = db.Column(db.String, nullable=False)
    upload_date = db.Column(db.DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc), nullable=False)
    user_id = db.Column(db.String, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f"<Image(id={self.id}, file_name={self.file_name}, url={self.url}, user_id={self.user_id})>"

class EmailVerification(db.Model):
    __tablename__ = 'email_verifications'

    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()), unique=True, nullable=False)
    user_id = db.Column(db.String, db.ForeignKey('user.id'), nullable=False)
    email = db.Column(db.String, nullable=False)
    token = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc), nullable=False)
    expires_at = db.Column(db.DateTime, nullable=False)
    
    def __repr__(self):
        return f"<EmailVerification(id={self.id}, user_id={self.user_id}, email={self.email}, created_at={self.created_at}, expires_at={self.expires_at})>"

@track_db_query
def fetch_user_by_id(user_id):
    return User.query.filter_by(id=user_id).first()

@track_db_query
def fetch_verification_by_token(token):
    return EmailVerification.query.filter_by(token=token).first()