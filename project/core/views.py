from flask import render_template, Blueprint

core = Blueprint('core', __name__)

@core.route('/')
def index():
    return render_template('index.html')


@core.route('/about')
def about():
    return render_template('about.html')


@core.route('/contact_me')
def contact():
    return render_template('contact.html')\
    

@core.route('/appointment')
def appointment():
    return render_template('appointment.html')


@core.route('/forum')
def forum():
    return render_template('forum.html')


@core.route('/account')
def account():
    return render_template('account.html')