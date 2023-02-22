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
	"""
	This class is going to be used to send emails for both Classes Contact and Appointment.
	Once an object of this class has been instantiated with the message to be sent they can call the
	send_mail class method to send the email.
	The send_mail class method will try to send the message passed to it and based on the response
	it will either send and return a 200 success, or throw an error and return a 500 server error.
	"""
	msg = None
	
	def __init__(self, msg):
		self.msg = msg
	
	@classmethod
	def send_mail(cls):
		server = smtplib.SMTP('smtp.gmail.com', 587)
		try:
			server.starttls()
			server.login(email_add, email_pass)
			server.send_message(cls.msg)
			return 200
		except smtplib.SMTPException:
			return 500
		finally:
			server.quit()
		
			
class ContactEmail:
	"""
	The intended purpose of this class is to have an object instantiated
	taking in the necessary parameters to have an email sent of this class type.
	The class calls SendEmail's send_mail class method to send the formatted email.
	"""
	name = None
	email = None
	message = None
	
	def __init__(self, name, email, message):
		self.name = name
		self.email = email
		self.message = message
	
	@classmethod
	def contact_me_email(cls):
		email = EmailMessage()
		email.set_content(
			"Name: " + cls.name +
			"\n\nEmail: " + cls.email +
			"\n\nMessage: " + cls.message
		)
		email['Subject'] = 'Message from ' + cls.name
		email['From'] = email_add
		email['To'] = rcvr_email
		
		send_mail = SendEmail(email)
		status = send_mail.send_mail()
		return status
	
	
class ApptEmail:
	"""
	The intended purpose of this class is to have an object instantiated
	taking in the necessary parameters to have an email sent of this class type.
	The class calls SendEmail's send_mail class method to send the formatted email.
	"""
	name = None
	email = None
	age = None
	appt_type = None
	location = None
	message = None
	
	def __init__(self, name, email, age, appt_type, location, message):
		self.name = name
		self.email = email
		self.age = age
		self.appt_type = appt_type
		self.location = location
		self.message = message
	
	@classmethod
	def email_appointment(cls):
		email = EmailMessage()
		email.set_content(
			"Name: " + cls.name +
			"\n\nEmail: " + cls.email +
			"\n\nAge: " + cls.age +
			"\n\nType: " + cls.appt_type +
			"\n\nLocation: " + cls.location +
			"\n\nMessage: " + cls.message
		)
		email['Subject'] = 'Message from ' + cls.name
		email['From'] = email_add
		email['To'] = rcvr_email
		
		send_mail = SendEmail(email)
		status = send_mail.send_mail()
		return status
