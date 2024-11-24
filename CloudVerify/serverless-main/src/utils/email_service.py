from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import os


from_email = os.environ.get("FROM_EMAIL")

def send_verification_email(email, verification_link, sendgrid_api_key):
    """Send verification email using SendGrid."""
    message = Mail(
        from_email=from_email,
        to_emails=email,
        subject='Verify Your Email',
        html_content=f"""
        <p>Hello,</p>
        <p>Please verify your email by clicking the link below:</p>
        <a href="{verification_link}">{verification_link}</a>
        <p>This link will expire in 2 minutes.</p>
        """
    )
    try:
        sg = SendGridAPIClient(sendgrid_api_key)
        sg.send(message)
        print(f"Email sent to {email}")
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        raise
