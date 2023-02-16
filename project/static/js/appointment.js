// ----- ALERT FUNCTION -----
function alert_func(alert, alert_text, text, type) {
	$(alert_text).text(text)
	$(alert).addClass(type)
	$(alert).show(250)
	setTimeout(function() {
			$(alert).hide(250)
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

$(function() {
	// ----- APPOINTMENT FOR VALIDATIONS -----
	$('#appointment-name').on('input', function() {
		if ($('#appointment-name').val() === '') {
			remove_both('#appointment-name', 'success fail')
		}
		else {
			one_class('#appointment-name', 'success', 'fail')
		}
	});
	$('#appointment-email').on('input', function() {
		if ($('#appointment-email').val() === '') {
			remove_both('#appointment-email', 'success fail')
		}
		else {
			one_class('#appointment-email', 'success', 'fail')
		}
	});
	$('#appointment-age').on('input', function() {
		if ($('#appointment-age').val() === '') {
			remove_both('#appointment-age', 'success fail')
		}
		else {
			one_class('#appointment-age', 'success', 'fail')
		}
	});
	$('#location-select').on('input', function() {
		if ($('#location-select').val() === '-- Select --') {
			remove_both('#location-select', 'success fail')
		}
		else {
			one_class('#location-select', 'success', 'fail')
		}
		if ($('#location-select').val() === '-- Select --' || $('#location-select').val() === 'virtual') {
			$('#appointment-location').prop('disabled', true)
			$('#appointment-location').val('')
			$().attr('placeholder', 'Disabled')
			remove_both('#appointment-location', 'success fail')
		}
		else {
			$('#appointment-location').prop('disabled', false)
			$('#appointment-location').attr('placeholder', 'Garage')
		}
	});
	$('#appointment-location').on('input', function() {
		if ($('#appointment-location').val() === '-- Select --') {
			remove_both('#appointment-location', 'success fail')
		}
		else {
			one_class('#appointment-location', 'success', 'fail')
		}
	});
	$('#appt-message').on('input', function() {
		if ($('#appt-message').val() === '') {
			remove_both('#appt-message', 'success-ta fail')
		}
		else {
			one_class('#appt-message', 'success-ta', 'fail')
		}
	});
	
	// ----- APPOINTMENT FORM SUBMISSION -----
	$('#appt-form-button').on('click', function(e2) {
		e2.preventDefault()
		let name = $('#appointment-name').val()
		let email = $('#appointment-email').val()
		let age = $('#appointment-age').val()
		let type = $('#location-select').val()
		let location = $('#appointment-location').val()
		let message = $('#appt-message').val()
		
		if (name === '' || email === '' || age === '' || type === '-- Select --' || message === '') {
			if (name === '') {
				one_class('#appointment-name', 'fail', '')
			}
			
			if (email === '') {
				one_class('#appointment-email', 'fail', '')
			}
			
			if (age === '') {
				one_class('#appointment-age', 'fail', '')
			}
			
			if (type === '-- Select --') {
				one_class('#location-select', 'fail', '')
			}
			
			if (!$('#appointment-location').is(':disabled') && $('#appointment-location').val() === '') {
				one_class('#appointment-location', 'fail', '')
			}
			
			if (message === '') {
				one_class('#appt-message', 'fail', '')
			}
		}
		else {
			$('#appointment-form')[0].reset()
			remove_both('#appointment-name, #appointment-email, #appointment-age, #location-select, #appointment-location', 'success fail')
			remove_both('#appt-message', 'success-ta fail')
			
			if ($('#appointment-location').is(':disabled')) {
				ajax('/appointment_email', 'POST',
					JSON.stringify({name: name, email: email, age: age, type: type, location: 'Virtual', message: message}),
					function() {
						alert_func('#appt-alert', '#appt-alert-text','Email sent successfully!', 'success')
					},
					function() {
						alert_func('#appt-alert', '#appt-alert-text','Email unsuccessful!', 'fail')
					}
				);
			}
			else {
				ajax('/appointment_email', 'POST',
					JSON.stringify({name: name, email: email, age: age, type: type, location: location, message: message}),
					function() {
						alert_func('#appt-alert', '#appt-alert-text','Email sent successfully!', 'success')
					},
					function() {
						alert_func('#appt-alert', '#appt-alert-text','Email unsuccessful!', 'fail')
					}
				);
			}
		}
	});
})