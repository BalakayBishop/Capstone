from project import db

class Posts (db.Model):
	__tablename__ = 'posts'
	id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	post_title = db.Column(db.String(255))
	post_body = db.Column(db.String(1000))
	post_date = db.Column(db.Date)
	
	def __int__(self, id, post_title, post_body, post_date):
		self.id = id
		self.post_title = post_title
		self.post_body = post_body
		self.post_date = post_date