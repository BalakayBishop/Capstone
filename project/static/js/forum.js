// ----- ON DOCUMENT READY -----
$(function() {
	// ----- GET LIST OF POSTS -----
	ajax_get('/get_all_posts',
		function(response) {
			for (let i = 0; i < response.length; i++) {
				let date = convert_date(response[i]['post_date'])
				let li = create_li(response[i]['post_id'], response[i]['post_title'], response[i]['post_body'], date)
				$('#post-list').append(li)
			}
		},
		function(jqXHR) {
		
		}
	);
	
	// ----- CREATE POST -----
	$('#new-post-button').on('click', function() {
		let content =
			"<div class='modalHeader'>" +
				"<h2 class='modal-h2'>Create a New Post!</h2>" +
				"<p><i class='bi bi-x-lg modal-x'></i></p>" +
			"</div>" +
			"<div id='modal-body' class='mt-3'>" +
				"<div class='mb-2'>" +
					"<label class='modal-label' for='create-title-input'>Title</label>" +
					"<input type='text' class='form-control' id='create-title-input' placeholder='Title'>" +
				"</div>" +
				"<div class=''>" +
					"<label class='modal-label' for='create-body-ta'>Body</label>" +
					"<textarea class='form-control' placeholder='Write your post!' id='create-body-ta'></textarea>" +
				"</div>" +
				"<div id='counter-div' class='mb-2'>" +
					"<p id='counter'>0/999</p>" +
				"</div>" +
				"<div id='create-button-div' class='mb-2'>" +
					"<button id='create-button' class='btn btn-primary' disabled>Create Post</button>" +
				"</div>" +
			"</div>"
		modal('show', content)
	});
	
	// ----- CHAR COUNTER NEW POST -----
	$('#popup-content').on('keyup','#create-body-ta', function() {
		let count = $(this).val().length
		counter('#counter', count)
	});
	
	// ----- NEW POST VALIDATIONS -----
	$('#popup-content').on('input','#create-title-input', function() {
		let title_content = $('#create-title-input').val()
		let body_content = $('#create-body-ta').val()
		new_post_validation(title_content, body_content)
	});
	
	$('#popup-content').on('input','#create-body-ta', function() {
		let title_content = $('#create-title-input').val()
		let body_content = $('#create-body-ta').val()
		new_post_validation(title_content, body_content)
	});
	
	// ----- SUBMIT NEW POST -----
	$('#popup-content').on('click','#create-button', function() {
		if ($('#create-title-input').val() !== '' && $('#create-body-ta').val() !== ''){
			let post_title = $('#create-title-input').val()
			let post_body = $('#create-body-ta').val()
			ajax('/post_forum', 'POST', JSON.stringify({post_title: post_title, post_body: post_body}),
				function(response) {
					modal()
					let date = convert_date(response[0]['post_date'])
					let li = create_li(response[0]['post_id'], response[0]['post_title'], response[0]['post_body'], date)
					$('#post-list').prepend(li)
					alert_func('Post created successfully', '#D1E7DD', '#badbcc', '#0f5132')
				},
				function() {
					modal()
					alert_func('Error - post submission failed!', '#f8d7da', '#f5c2c7', '#842029')
				}
			)
		}
		else {
			if ($('#create-title-input').val() === '') {
				one_class('#create-title-input', 'fail', 'success')
			}
			if ($('#create-body-ta').val() === '') {
				one_class('#create-body-ta', 'fail', 'success-ta')
			}
		}
		
	});
	
	// ----- VIEW POST -----
	$('#post-list').on('click', '.view-post', function() {
		let post_id = $(this).closest('li').attr('id')
		ajax_get('/get_post?post_id='+post_id,
			function(response) {
				let content =
					"<div class='modalHeader'>" +
						"<h2 class='modal-h2'>"+ response[0]['post_title'] +"</h2>" +
						"<p><i class='bi bi-x-lg modal-x'></i></p>" +
					"</div>" +
					"<div class='view-post-body-modal mt-3'>" +
						"<p>"+ response[0]['post_body'] +"</p>" +
					"</div>" +
					"<hr>" +
					"<div class='comment-div mb-2'>" +
						"<p><i class='bi bi-chat-right-text'></i> Comment</p>" +
					"</div>" +
					"<div class='hidden mb-2'>" +
						"<textarea id='comment-input' class='form-control comment-ta' placeholder='Leave a comment here'></textarea>" +
						"<div id='comment-counter-div'>" +
							"<p id='comment-counter'>0/999</p>" +
						"</div>" +
						"<div id='comment-buttons'>" +
							"<button id='cancel-comment' class='btn btn-secondary'>Cancel</button>" +
							"<button id='post-comment' class='btn btn-primary' disabled>Post</button>" +
						"</div>" +
					"</div>"+
					"<h4>Comments</h4>" +
					"<ul id='comment-list' class='list-group list-group-flush mt-2'>" +
					"</ul>"
				modal('show', content)
				for (let i = 0; i < response[0]['comments'].length; i++) {
					let date = new Date(response[0]['comments'][i]['comment_date'])
					let comment_date = date.toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' });
					let li =
					"<li id='"+ response[0]['comments'][i]['comment_id'] +"' class='list-group-item comment-list-item'>" +
						"<p class='comment-p'>" + response[0]['comments'][i]['comment_body'] + "</p>" +
						"<p class='comment-date'>" + comment_date + "</p>" +
					"</li>"
					$('#comment-list').append(li)
				}
			},
			function(jqXHR) {
				if (jqXHR === 404) {
					alert_func('Error - post not found!', '#f8d7da', '#f5c2c7', '#842029')
				}
			}
		)
	});
	
	// ----- COMMENT VALIDATION -----
	$('#popup-content').on('input', '#comment-input', function() {
		let comment_val = $('#comment-input').val()
		comment_changed(comment_val)
	});
	
	// ----- COMMENT SUBMISSION -----
	$('#popup-content').on('click', '#post-comment', function() {
		ajax('/post_comment', 'POST', JSON.stringify({}),
			function() {
				alert_func('Comment submission successful!', '#f8d7da', '#f5c2c7', '#842029')
			},
			function() {
				alert_func('Error - comment submission failed!', '#f8d7da', '#f5c2c7', '#842029')
			}
		)
	});
	
	// ----- SHOW COMMENT INPUT -----
	$('#popup-content').on('click', '.comment-div', function(){
		$('.hidden').show(500)
	});
	
	// ----- HIDE COMMENT INPUT -----
	$('#popup-content').on('click', '#cancel-comment', function(){
		$('.hidden').hide(500)
		setTimeout(function() {
			$('.comment-ta').val('')
		}, 501)
		
	});
	
	// ----- CHAR COUNTER COMMENT -----
	$('#popup-content').on('keyup', '.comment-ta', function() {
		let count = $(this).val().length
		counter('#comment-counter', count)
	});
	
	// ----- CLOSE ALERT -----
	$('.alert-close').on('click', function() {
		$('.forum-alert').hide(250)
	});
	
	// ----- CLOSE FORUM MODAL -----
	$("#popup-content").on('click','.modal-x', function() {
		modal()
	});
	
	// ----- AJAX FUNCTIONS -----
	function ajax(url, type, data, success, fail) {
		$.ajax({
			url: url,
			type: type,
			contentType: 'application/json',
			data: data,
			success: success,
			error: fail
		});
	}
	
	function ajax_get(url,  success, fail) {
		$.ajax({
			url: url,
			type: 'GET',
			success: success,
			error: fail
		});
	}
	
	// ----- ALERT FUNCTION -----
	function alert_func(text, bg_color, b_color, color) {
		$('.forum-alert-text').text(text)
		$('.forum-alert-text, .alert-close').css({'color': color})
		$('.forum-alert').css({'background-color': bg_color, 'border-color': b_color})
		$('.forum-alert').show(250)
		setTimeout(function() {
				$('.forum-alert').hide(250)
		}, 3000);
	}
	
	// ----- VALIDATIONS FUNCTION -----
	function remove_both(id, classes) {
		$(id).removeClass(classes)
	}
	
	function one_class(id, add, remove) {
		$(id).addClass(add)
		$(id).removeClass(remove)
	}
	
	// ----- CHAR COUNTER -----
	function counter(counter_id, count) {
		if (count > 999) {
			$(counter_id).text(count + '/999')
			$(counter_id).css({'color': '#842029'})
		}
		else {
			$(counter_id).text(count + '/999')
			$(counter_id).css({'color': '#333333'})
		}
	}
	
	// ----- MODAL FUNCTION -----
	function modal(visibility = 'hide', content = '') {
		let time = 300
		if (visibility === 'hide') {
			$("#popup-overlay, #popup-content").fadeOut(time)
			setTimeout(function(){
				$('#popup-content').html(content)
			}, time++)
		}
		else if (visibility === 'show') {
			$("#popup-overlay, #popup-content").fadeIn(time)
			$('#popup-content').html(content)
		}
		let height = $('#popup-content').height()
		if (height >= 800) {
			$('#popup-content').css({'overflow-y': 'scroll'})
		}
	}
	
	// ----- CREATE LI -----
	function create_li(id, title, body, date) {
		return "<li id='"+ id +"' class='list-group-item'>" +
					"<div class='inner-li'>" +
						"<div class='left-li'>" +
							"<h4 class='h4-m0'>"+ title +"</h4>" +
							"<p class='post-date p-m0'> Posted on: "+ date +"</p>" +
							"<div class='post-body mt-2'>" +
								"<p class='p-m0 truncate'>"+ body +"</p>" +
							"</div>" +
						"</div>" +
						"<div class='right-li'>" +
							"<button class='btn view-post'>View More</button>" +
						"</div>" +
					"</div>" +
				"</li>"
	}
	
	// ----- CONVERT DATE -----
	function convert_date(arg) {
		let date = new Date(arg)
		return date.toLocaleDateString("en-US", {year: 'numeric', month: '2-digit', day: '2-digit'})
	}
	
	// ----- NEW POST FORM VALIDATION -----
	function new_post_validation(title_content, body_content) {
		if (title_content !== '') {
			one_class('#create-title-input', 'success', 'fail')
		}
		if (body_content !== '') {
			one_class('#create-body-ta', 'success-ta', 'fail')
		}
		
		if (title_content !== '' && body_content !== '') {
			$('#create-button').prop('disabled', false)
		}
		else {
			$('#create-button').prop('disabled', true)
			if (title_content === '') {
				remove_both('#create-title-input', 'success fail')
			}
			if (body_content === '') {
				remove_both('#create-body-ta', 'success-ta fail')
			}
		}
	}
	
	// ----- COMMENT INPUT VALIDATION -----
	function comment_changed(comment_val) {
		if (comment_val !== '') {
			$('#post-comment').prop('disabled', false)
			one_class('#comment-input', 'success-ta', 'fail')
		}
		else {
			$('#post-comment').prop('disabled', true)
			remove_both('#comment-input', 'success-ta fail')
		}
	}
});