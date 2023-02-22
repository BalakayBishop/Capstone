import os
from dotenv import load_dotenv, find_dotenv
from email.message import EmailMessage
import smtplib

load_dotenv(find_dotenv())

# Global variables to be used in the classes
email_add = os.getenv('EMAIL_USER')
email_pass = os.getenv('GMAIL_APP_PASSWORD')
rcvr_email = os.getenv('RCVR_EMAIL')

class SendEmail:
    msg = None

    def __init__(self, msg):
        self.msg = msg
        SendEmail.msg = msg

    @classmethod
    def send_mail(cls):
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            try:
                server.starttls()
                server.login(email_add, email_pass)
                server.send_message(SendEmail.msg)
                return 200
            except smtplib.SMTPException:
                return 500
            finally:
                server.quit()


class ContactEmail:

    def __init__(self, name, email, message):
        self.name = name
        self.email = email
        self.message = message

    
    def contact_me_email(self):
        email = EmailMessage()
        email['Subject'] = "Message from " + self.name
        email['From'] = email_add
        email['To'] = rcvr_email
        email.set_content(
            "Name: " + self.name +
            "\n\nEmail: " + self.email +
            "\n\nMessage: " + self.message
        )

        send_email = SendEmail(email)
        status = send_email.send_mail()
        return status

    
class ApptEmail:
    """
    The intended purpose of this class is to have an object instantiated
    taking in the necessary parameters to have an email sent of this class type.
    The class calls SendEmail's send_mail class method to send the formatted email.
    """
    
    def __init__(self, name, email, age, appt_type, location, message):
        self.name = name
        self.email = email
        self.age = age
        self.appt_type = appt_type
        self.location = location
        self.message = message
    
    
    def email_appointment(self):
        email = EmailMessage()
        email['Subject'] = 'Message from ' + self.name
        email['From'] = email_add
        email['To'] = rcvr_email
        email.set_content(
            "Name: " + self.name +
            "\n\nEmail: " + self.email +
            "\n\nAge: " + self.age +
            "\n\nType: " + self.appt_type +
            "\n\nLocation: " + self.location +
            "\n\nMessage: " + self.message
        )
        
        send_mail = SendEmail(email)
        status = send_mail.send_mail()
        return status
