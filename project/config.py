import os
from dotenv import load_dotenv, find_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(find_dotenv())
SQLALCHEMY_DATABASE_URI = 'sqlite:///'+os.path.join(basedir, 'data.sqlite')
SQLALCHEMY_TRACK_MODIFICATION = False
SECRET_KEY = os.getenv('SECRET_KEY')
FLASK_ENV = 'development'
TESTING = True
STATIC_FOLDER = '../static'
TEMPLATES_FOLDER = '../templates'