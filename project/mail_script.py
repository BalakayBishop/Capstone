import os
from dotenv import load_dotenv, find_dotenv
import smtplib

load_dotenv(find_dotenv())

email_add = os.getenv('EMAIL_USER')
email_pass = os.getenv('GMAIL_APP_PASSWORD')
rcvr_email = os.getenv('RCVR_EMAIL')

subject = ""
body = ""
message = f"Subject: {subject}\n\n{body}"

server = smtplib.SMTP('smtp.gmail.com', 587)
server.starttls()
server.login(email_add, email_pass)
server.sendmail(email_add, rcvr_email, message)
