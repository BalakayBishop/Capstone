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
	$('.forum-alert').show(250, 'linear')
	setTimeout(function() {
			$('.forum-alert').hide(250, 'linear')
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

let input_title = false
let input_body = false
function all_changed() {
	if (input_title || input_body) {
		$('').prop({'disabled': 'false'})
	}
	else {
		$('').prop({'disabled': 'true'})
	}
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
function modal(visibility = 'hidden', content = '') {
	$("#popup-overlay, #popup-content").css({'visibility':visibility})
	$('#popup-content').html(content)
	let height = $('#popup-content').height()
	if (height >= 800) {
		$('#popup-content').css({'overflow-y': 'scroll'})
	}
}

$(function() {
	// ----- GET LIST OF POSTS -----
	ajax_get('/get_all_posts',
		function(response) {
			for (let i = 0; i < response.length; i++) {
				let date = new Date(response[i]['post_date'])
				let new_date = date.toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' });
				let li =
					"<li id='"+ response[i]['post_id'] +"' class='list-group-item'>" +
						"<div class='inner-li'>" +
							"<div class='left-li'>" +
								"<h4 class='h4-m0'>"+ response[i]['post_title'] +"</h4>" +
								"<p class='post-date p-m0'> Posted on: "+ new_date +"</p>" +
								"<div class='post-body mt-2'>" +
									"<p class='p-m0 truncate'>"+ response[i]['post_body'] +"</p>" +
								"</div>" +
							"</div>" +
							"<div class='right-li'>" +
								"<button class='btn view-post'>View Post</button>" +
							"</div>" +
						"</div>" +
					"</li>"
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
					"<button id='create-button' class='btn btn-primary'>Create Post</button>" +
				"</div>" +
			"</div>"
		modal('visible', content)
	});
	
	// ----- CHAR COUNTER NEW POST -----
	$('#popup-content').on('keyup','#create-body-ta', function() {
		let count = $(this).val().length
		counter('#counter', count)
	})
	
	// ----- NEW POST VALIDATIONS -----
	$('#popup-content').on('input','#create-title-input', function() {
		if ($('#create-title-input').val() === '') {
			remove_both('#create-title-input', 'success fail')
			input_title = false
			all_changed()
		}
		else {
			one_class('#create-title-input', 'success', 'fail')
			input_title = true
			all_changed()
		}
	})
	
	$('#popup-content').on('input','#create-body-ta', function() {
		if ($('#create-body-ta').val() === '') {
			remove_both('#create-body-ta', 'success-ta fail')
			input_title = false
			all_changed()
		}
		else {
			one_class('#create-body-ta', 'success-ta', 'fail')
			input_title = true
			all_changed()
		}
	})
	
	// ----- SUBMIT NEW POST -----
	$('#popup-content').on('click','#create-button', function() {
		if ($('#create-title-input').val() !== '' && $('#create-body-ta').val() !== ''){
			ajax('/post_forum', 'POST', JSON.stringify({}),
				function(response) {
					modal()
					alert_func('Post created successfully', '#D1E7DD', '#badbcc', '#0f5132')
				},
				function(jqXHR) {
					if (jqXHR === 400) {
						alert_func('Post created unsuccessfully', '#f8d7da', '#f5c2c7', '#842029')
					}
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
		
	})
	
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
						"<textarea class='form-control comment-ta' placeholder='Leave a comment here'></textarea>" +
						"<div id='comment-counter-div'>" +
							"<p id='comment-counter'>0/999</p>" +
						"</div>" +
						"<div id='comment-buttons'>" +
							"<button id='cancel-comment' class='btn btn-secondary'>Cancel</button>" +
							"<button id='post-comment' class='btn btn-primary'>Post</button>" +
						"</div>" +
					"</div>"+
					"<h4>Comments</h4>" +
					"<ul id='comment-list' class='list-group list-group-flush mt-2'>" +
					"</ul>"
				modal('visible', content)
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
					alert_func()
				}
			}
		)
	})
	
	// ----- SHOW COMMENT INPUT -----
	$('#popup-content').on('click', '.comment-div', function(){
		$('.hidden').show(500)
	})
	
	// ----- HIDE COMMENT INPUT -----
	$('#popup-content').on('click', '#cancel-comment', function(){
		$('.hidden').hide(500)
		$('.comment-ta').val('')
	})
	
	// ----- CHAR COUNTER COMMENT -----
	$('#popup-content').on('keyup', '.comment-ta', function() {
		let count = $(this).val().length
		counter('#comment-counter', count)
	})
	
	// ----- CLOSE ALERT -----
	$('.alert-close').on('click', function() {
		$('.forum-alert').hide(250)
	})
	
	// ----- CLOSE FORUM MODAL -----
	$("#popup-content").on('click','.modal-x', function() {
		modal()
	})
})