import logging
import watchtower
import boto3
import watchtower
from flask import Flask, make_response, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, inspect, text
from flask_bcrypt import Bcrypt
from app.config import Config

db = SQLAlchemy()
bcrypt = Bcrypt()
engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)

def create_app(config_overrides=None):
    app = Flask(__name__)
    app.config.from_object(Config)
    
    if config_overrides:
        app.config.update(config_overrides)

    db.init_app(app)
    bcrypt.init_app(app)
    
    cloudwatch_handler = watchtower.CloudWatchLogHandler(log_group='WebAppLogs', boto3_client=boto3.client('logs',region_name='us-east-1'))
    cloudwatch_handler.setLevel(logging.INFO)
    app.logger.addHandler(cloudwatch_handler)
    
    from app.routes import routes
    app.register_blueprint(routes)
    
    bootstrap_database(app)
    
    @app.before_request
    def handle_options_request():
        if request.method == 'OPTIONS':
            return make_response('',405)

    @app.errorhandler(404)
    def page_not_found(e):
        return make_response('', 404)

    return app


def bootstrap_database(app):
    inspector = inspect(engine)
    
    # Check if tables exist
    user_table_exists = inspector.has_table("user")
    image_table_exists = inspector.has_table("image")
    
    if not user_table_exists or not image_table_exists:
        print("Creating the tables...")
        from app import db
        with engine.begin() as connection:
            db.metadata.create_all(bind=connection)
        print("Tables created successfully.")
    else:
        print("Tables already exist. Checking for schema updates...")
        
        columns = [column["name"] for column in inspector.get_columns("user")]
        if "is_verified" not in columns:
            print("Adding 'is_verified' column to 'user' table...")
            with engine.connect() as connection:
                connection.execute(
                    text('ALTER TABLE "user" ADD COLUMN is_verified BOOLEAN DEFAULT FALSE NOT NULL')
                )
            print("'is_verified' column added successfully.")
        else:
            print("'is_verified' column already exists.")
    