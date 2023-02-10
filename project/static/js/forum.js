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
	// ----- GET LIST OF USERS -----
	ajax_get('/get_posts',
		function(response) {
			for (let i = 0; i < response.length; i++) {
				let date = new Date(response[i]['post_date'])
				let new_date = date.toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' });
				let li =
					"<li id='"+ response[i]['post_id'] +"' class='list-group-item'>" +
						"<h4 class='h4-m0'>"+ response[i]['post_title'] +"</h4>" +
						"<p class='post-date p-m0'> Posted on: "+ new_date +"</p>" +
						"<div class='post-body mt-2'>" +
							"<p class='p-m0'>"+ response[i]['post_body'] +"</p>" +
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
			"<div id='modalHeader'>" +
				"<h2 id='modal-h2'>Create a New Post!</h2>" +
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
					"" +
					"<button id='create-button' class='btn btn-primary'>Create Post</button>" +
				"</div>" +
			"</div>"
		modal('visible', content)
	});
	
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
	
	// ----- CLOSE FORUM MODAL -----
	$("#popup-content").on('click','.modal-x', function() {
		modal()
	})
	
	// ----- MODAL FUNCTION -----
	function modal(visibility = 'hidden', content = '') {
		$("#popup-overlay, #popup-content").css({'visibility':visibility})
		$('#popup-content').html(content)
	}
})