// ----- ALERT FUNCTION -----
function alert_func(alert, alert_text, text, type) {
	$(alert_text).text(text)
	$(alert).css('display', 'flex')
	$(alert).addClass(type)
	setTimeout(function() {
			$(alert).fadeOut(125)
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

// ----- AJAX FUNCTION -----
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
$(function() {
// ----- CONTACT FORM VALIDATIONS -----
	$('#contact-name').on('input', function() {
		if ($('#contact-name').val() === '') {
			remove_both('#contact-name', 'success fail')
		}
		else {
			one_class('#contact-name', 'success', 'fail')
		}
	});
	
	$('#contact-email').on('input', function() {
		if ($('#contact-email').val() === '') {
			remove_both('#contact-email', 'success fail')
		}
		else {
			one_class('#contact-email', 'success', 'fail')
		}
	});
	
	$('#message').on('input', function() {
		if ($('#message').val() === '') {
			remove_both('#message', 'success-ta fail')
		}
		else {
			one_class('#message', 'success-ta', 'fail')
		}
	});
	
	// ----- CONTACT FORM SUBMISSION -----
	$('#form-button').on('click', function(e1) {
		e1.preventDefault()
		let name = $('#contact-name').val()
		let email = $('#contact-email').val()
		let message = $('#message').val()
		
		if (name === '' || email === '' || message === '') {
			if (name === '') {
				one_class('#contact-name', 'fail', '')
			}
			
			if (email === '') {
				one_class('#contact-email', 'fail', '')
			}
			
			if (message === '') {
				one_class('#message', 'fail', '')
			}
		}
		else {
			$('#contact-form')[0].reset()
			remove_both('#contact-name, #contact-email', 'success fail')
			remove_both('#message', 'success-ta fail')
			ajax('/contact_email', 'POST',
					JSON.stringify({name: name, email: email, message: message}),
				function() {
					alert_func('#contact-alert', '#contact-alert-text',
							'Email sent successfully!', 'success')
				},
				function() {
					alert_func('#contact-alert', '#contact-alert-text',
							'Email unsuccessful!', 'fail')
				}
			);
		}
	});
})