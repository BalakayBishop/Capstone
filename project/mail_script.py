import os
from dotenv import load_dotenv, find_dotenv
from email.message import EmailMessage
import smtplib

load_dotenv(find_dotenv())

email_add = os.getenv('EMAIL_USER')
email_pass = os.getenv('GMAIL_APP_PASSWORD')
rcvr_email = os.getenv('RCVR_EMAIL')

def send_email(name, email, message):
	msg = EmailMessage()
	msg.set_content("Name: " + name + "\n\nEmail: " + email + "\n\nMessage: " + message)
	msg['Subject'] = 'Message from ' + name
	msg['From'] = email_add
	msg['To'] = rcvr_email
	
	server = smtplib.SMTP('smtp.gmail.com', 587)
	server.starttls()
	server.login(email_add, email_pass)
	status = server.send_message(msg)
	server.quit()
	
	return status
