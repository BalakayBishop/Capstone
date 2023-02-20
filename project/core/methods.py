def convert(query):
	lst = list()
	i = 0
	if len(query) is not 0:
		for obj in query:
			lst.append({"post_id": obj.post_id, "post_title": obj.post_title, "post_body": obj.post_body,
						"post_date": obj.post_date, "comments": []})
			for comment in obj.comments:
				lst[i]['comments'].append({
					"comment_id": comment.comment_id,
					"comment_body": comment.comment_body,
					"comment_date": comment.comment_date
				})
			i += 1
		# for i in lst:
		# 	print(i)
		return lst
	return None

def convert_comment(query):
	lst = list()
	if query is not None:
		lst.append({
			"comment_id": query.comment_id,
			"comment_body": query.comment_body,
			"comment_date": query.comment_date
		})
		return lst
	for i in lst:
		print(i)
	return None
