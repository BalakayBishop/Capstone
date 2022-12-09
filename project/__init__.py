import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from dotenv import load_dotenv, find_dotenv

# ------------------------------------------------------------------------------------------------

app = Flask(__name__)

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(find_dotenv())
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///'+os.path.join(basedir, 'data.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATION'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

db = SQLAlchemy(app)
Migrate(app, db)

# ------------------------------------------------------------------------------------------------

# login_manager = LoginManager()
# login_manager.init_app(app)
# login_manager.login_view = 'users.login'

# ------------------------------------------------------------------------------------------------
from project.core.views import core
app.register_blueprint(core)