from flask import render_template, Blueprint, request, jsonify
from project.mail_script import contact_me_email, email_appointment
from sqlalchemy.orm import sessionmaker
from project.config import engine
from project.models.models import Posts, Comments
from project.core.methods import convert

Session = sessionmaker(bind=engine)
session = Session()

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


@core.route('/contact_email', methods=['POST'])
def contact_email():
    form_data = request.get_json()
    user_name = form_data['name']
    user_email = form_data['email']
    user_message = form_data['message']
    
    status = contact_me_email(user_name, user_email, user_message)
    
    return jsonify({
        'status': status
    })
    

@core.route('/appointment')
def appointment():
    return render_template('appointment.html')


@core.route('/appointment_email', methods=['POST'])
def appointment_email():
    form_data = request.get_json()
    user_name = form_data['name']
    user_email = form_data['email']
    user_age = form_data['age']
    user_type = form_data['type']
    user_location = form_data['location']
    user_message = form_data['message']
    
    status = email_appointment(user_name, user_email, user_age, user_type, user_location, user_message)
    
    return jsonify({
        'status': status
    })


@core.route('/forum')
def forum():
    return render_template('forum.html')


@core.route('/get_all_posts', methods=['GET'])
def get_all_posts():
    # query for getting all posts and comments
    query = session.query(Posts).outerjoin(Comments).all()
    result = convert(query)
    if result is not None:
        return result, 200
    return jsonify({'status':'no posts'}), 404


@core.route('/get_post', methods=['GET'])
def get_post():
    post_id = request.args.get('post_id')
    query = session.query(Posts).filter(Posts.post_id==post_id).outerjoin(Comments).all()
    result = convert(query)
    if result is not None:
        return result, 200
    return jsonify({'status': 'no posts'}), 404


@core.route('/post_forum', methods=['POST'])
def post_forum():
    return jsonify({'status': 'testing'}), 200
