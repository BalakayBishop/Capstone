import os
from dotenv import load_dotenv, find_dotenv
from sqlalchemy import create_engine

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(find_dotenv())
SQLALCHEMY_DATABASE_URI = f"mysql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}/{os.getenv('DB_NAME')}"
SQLALCHEMY_TRACK_MODIFICATION = False
SECRET_KEY = os.getenv('SECRET_KEY')
FLASK_ENV = 'development'
TESTING = True
STATIC_FOLDER = '../static'
TEMPLATES_FOLDER = '../templates'

engine = create_engine(SQLALCHEMY_DATABASE_URI)