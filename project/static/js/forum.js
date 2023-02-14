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
	$('#alert-text').text(text)
	$('#alert-text, #alert-close').css({'color': color})
	$('#alert').css({'display': 'flex', 'background-color': bg_color, 'border-color': b_color})
	setTimeout(function() {
			$('#alert').fadeOut(125)
	}, 5000);
}

// ----- VALIDATIONS FUNCTION -----
function remove_both(id, classes) {
	$(id).removeClass(classes)
}

function one_class(id, add, remove) {
	$(id).addClass(add)
	$(id).removeClass(remove)
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
	
	// ----- OPEN FORUM MODAL -----
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
	
	// ----- OPEN POST MODAL -----
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
	
	// ----- CHAR COUNTER NEW POST -----
	$('#popup-content').on('keyup','#create-body-ta', function() {
		let count = $(this).val().length
		if (count > 999) {
			$('#counter').text(count + '/999')
			$('#counter').css({'color': '#842029'})
		}
		else {
			$('#counter').text(count + '/999')
			$('#counter').css({'color': '#333333'})
		}
	})
	
	// ----- CHAR COUNTER COMMENT -----
	$('#popup-content').on('keyup', '.comment-ta', function() {
		let count = $(this).val().length
		if (count > 999) {
			$('#comment-counter').text(count + '/999')
			$('#comment-counter').css({'color': '#842029'})
		}
		else {
			$('#comment-counter').text(count + '/999')
			$('#comment-counter').css({'color': '#333333'})
		}
	})
	
	// ----- CLOSE FORUM MODAL -----
	$("#popup-content").on('click','.modal-x', function() {
		modal()
	})
	
	// ----- MODAL FUNCTION -----
	function modal(visibility = 'hidden', content = '') {
		$("#popup-overlay, #popup-content").css({'visibility':visibility})
		$('#popup-content').html(content)
		let height = $('#popup-content').height()
		if (height >= 800) {
			$('#popup-content').css({'overflow-y': 'scroll'})
		}
	}
})