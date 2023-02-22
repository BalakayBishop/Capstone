from project import db

class Posts (db.Model):
	__tablename__ = 'posts'
	post_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	post_title = db.Column(db.String(255))
	post_body = db.Column(db.String(1000))
	post_date = db.Column(db.Date)
	
	comments = db.relationship('Comments', backref='comments', lazy='dynamic', cascade='all, delete')
	
	def __init__(self, post_title, post_body, post_date):
		self.post_title = post_title
		self.post_body = post_body
		self.post_date = post_date
		

class Comments (db.Model):
	__tablename__ = 'comments'
	
	comment_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	post_id = db.Column(db.Integer, db.ForeignKey('posts.post_id', ondelete='CASCADE'))
	comment_body = db.Column(db.String(1000))
	comment_date = db.Column(db.Date)
	
	def __init__(self, post_id, comment_body, comment_date):
		self.post_id = post_id
		self.comment_body = comment_body
		self.comment_date = comment_date
