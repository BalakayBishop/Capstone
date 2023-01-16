from flask import render_template, Blueprint, request, jsonify
from project.mail_script import send_email

core = Blueprint('core', __name__)

@core.route('/')
def index():
    return render_template('index.html')


@core.route('/about')
def about():
    return render_template('about.html')


@core.route('/contact_me')
def contact():
    return render_template('contact.html')
    

@core.route('/appointment')
def appointment():
    return render_template('appointment.html')


@core.route('/forum')
def forum():
    return render_template('forum.html')

@core.route('/contact_email', methods=['POST'])
def contact_email():
    form_data = request.get_json()
    user_name = form_data['name']
    user_email = form_data['email']
    user_message = form_data['message']
    
    status = contact_email(user_name, user_email, user_message)
    
    return jsonify({
        'status': status
    })


@core.route('/appointment_email', methods=['POST'])
def appointment_email():
    form_data = request.get_json()
    user_name = form_data['name']
    user_email = form_data['email']
    user_message = form_data['message']
    
    status = contact_email(user_name, user_email, user_message)
    
    return jsonify({
        'status': status
    })
