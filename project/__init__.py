from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


def create_app():
	app = Flask(__name__)
	app.config.from_pyfile('config.py')
	return app
# -----------------------------Assigning the created app to APP-----------------------------------
APP = create_app()

# --------------------------Initializing the SQLAlchemy with APP to db----------------------------
db = SQLAlchemy(APP)
Migrate(APP, db)

# -------------------------------------Login Manager----------------------------------------------
# login_manager = LoginManager()
# login_manager.init_app(app)
# login_manager.login_view = 'users.login'

# ---------------------------Registering the Blueprints for the views-----------------------------
from project.core.views import core
APP.register_blueprint(core)