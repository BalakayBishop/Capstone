$(document).ready(function(){
	// HOME PAGE BUTTONS
	$('#about-button').on('click', function() {
		window.location.href = '/about'
	})
	$('#contact-button').on('click', function() {
		window.location.href = '/contact_me'
	})
	$('#appointment-button').on('click', function() {
		window.location.href = '/appointment'
	})
	
	// CONTACT FORM VALIDATIONS
	$('#contact-name').on('input', function() {
		if ($('#contact-name').val() === '') {
			$('#contact-name').removeClass('success fail')
		}
		else {
			$('#contact-name').removeClass('fail')
			$('#contact-name').addClass('success')
		}
	});
	
	$('#contact-email').on('input', function() {
		if ($('#contact-email').val() === '') {
			$('#contact-email').removeClass('success fail')
		}
		else {
			$('#contact-email').removeClass('fail')
			$('#contact-email').addClass('success')
		}
	});
	
	$('#message').on('input', function() {
		if ($('#message').val() === '') {
			$('#message').removeClass('success-ta fail')
		}
		else {
			$('#message').removeClass('fail')
			$('#message').addClass('success-ta')
		}
	});
	
	// CONTACT FORM SUBMISSION
	$('#form-button').on('click', function(e1) {
		e1.preventDefault()
		let name = $('#contact-name').val()
		let email = $('#contact-email').val()
		let message = $('#message').val()
		
		if (name === '' || email === '' || message === '') {
			if (name === '') {
				$('#contact-name').addClass('fail')
			}
			
			if (email === '') {
				$('#contact-email').addClass('fail')
			}
			
			if (message === '') {
				$('#message').addClass('fail')
			}
		}
		else {
			$('#contact-form')[0].reset()
			$('#contact-name, #contact-email').removeClass('success fail')
			$('#message').removeClass('success-ta fail')
			
			$.ajax({
				url: '/contact_email',
				type: 'POST',
				contentType: 'application/JSON',
				data: JSON.stringify({
					name: name,
					email: email,
					message: message
				}),
				success: function() {
					$('#alert-text').text('Email sent successfully!')
					$('#alert').css('display', 'flex')
					$('#alert').addClass('success')
					setTimeout(function() {
							$('#alert').fadeOut(125)
					}, 5000);
				},
				fail: function() {
					$('#alert-text').text('Email sent unsuccessfully!')
					$('#alert').css('display', 'flex')
					$('#alert').addClass('fail')
					setTimeout(function() {
							$('#alert').fadeOut(125)
					}, 5000);
				}
			})
		}
		
		// INPUT VALIDATIONS
		$('#contact-name').on('input', function() {
			if ($('#contact-name').val() === '') {
				$('#contact-name').removeClass('success fail')
			}
			else {
				$('#contact-name').removeClass('fail')
				$('#contact-name').addClass('success')
			}
		});
		
		$('#contact-email').on('input', function() {
			$('#contact-email').removeClass('fail')
			$('#contact-email').addClass('success')
		});
		
		$('#message').on('input', function() {
			$('#message').removeClass('fail')
			$('#message').addClass('success-ta')
		});
	});
	
	// APPOINTMENT FOR VALIDATIONS
	$('#appointment-name').on('input', function() {
		if ($('#appointment-name').val() === '') {
			$('#appointment-name').removeClass('success fail')
		}
		else {
			$('#appointment-name').removeClass('fail')
			$('#appointment-name').addClass('success')
		}
	});
	$('#appointment-email').on('input', function() {
		if ($('#appointment-email').val() === '') {
			$('#appointment-email').removeClass('success fail')
		}
		else {
			$('#appointment-email').removeClass('fail')
			$('#appointment-email').addClass('success')
		}
	});
	$('#appointment-age').on('input', function() {
		if ($('#appointment-age').val() === '') {
			$('#appointment-age').removeClass('success fail')
		}
		else {
			$('#appointment-age').removeClass('fail')
			$('#appointment-age').addClass('success')
		}
	});
	$('#location-select').on('input', function() {
		if ($('#location-select').val() === '-- Select --') {
			$('#location-select').removeClass('success fail')
		}
		else {
			$('#location-select').removeClass('fail')
			$('#location-select').addClass('success')
		}
		if ($('#location-select').val() === '-- Select --' || $('#location-select').val() === 'virtual') {
			$('#appointment-location').prop('disabled', true)
			$('#appointment-location').val('')
			$('#appointment-location').removeClass('success fail')
			$('#appointment-location').attr('placeholder', 'Disabled')
		}
		else {
			$('#appointment-location').prop('disabled', false)
			$('#appointment-location').attr('placeholder', 'Garage')
		}
	});
	$('#appointment-location').on('input', function() {
		if ($('#appointment-location').val() === '-- Select --') {
			$('#appointment-location').removeClass('success fail')
		}
		else {
			$('#appointment-location').removeClass('fail')
			$('#appointment-location').addClass('success')
		}
	});
	$('#appt-message').on('input', function() {
		if ($('#appt-message').val() === '') {
			$('#appt-message').removeClass('success-ta fail')
		}
		else {
			$('#appt-message').removeClass('fail')
			$('#appt-message').addClass('success-ta')
		}
	});
	
	// APPOINTMENT FORM SUBMISSION
	$('#appt-form-button').on('click', function(e2) {
		e2.preventDefault()
		let name = $('#appointment-name')
		let email = $('#appointment-email')
		let age = $('#appointment-age')
		let type = $('#location-select')
		let location = $('#appointment-location')
		let message = $('#appt-message')
		
		if (name.val() === '' || email.val() === '' || age.val() === '' || type.val() === '-- Select --' || message.val() === '') {
			if (name.val() === '') {
				name.addClass('fail')
			}
			
			if (email.val() === '') {
				email.addClass('fail')
			}
			
			if (age.val() === '') {
				age.addClass('fail')
			}
			
			if (type.val() === '-- Select --') {
				type.addClass('fail')
			}
			
			if (!location.is(':disabled') && location.val() === '') {
				location.addClass('fail')
			}
			
			if (message.val() === '') {
				$('#appt-message').addClass('fail')
			}
		}
		else {
			$('#appointment-form')[0].reset()
			$('#appointment-name, #appointment-email, #appointment-age, #location-select, #appointment-location')
				.removeClass('success fail')
			$('#appt-message').removeClass('success-ta fail')
			
			// $.ajax({
			// 	url: '/contact_email',
			// 	type: 'POST',
			// 	contentType: 'application/JSON',
			// 	data: JSON.stringify({
			// 		name: name,
			// 		email: email,
			// 		message: message
			// 	}),
			// 	success: function() {
			// 		$('#alert-text').text('Email sent successfully!')
			// 		$('#alert').css('display', 'flex')
			// 		$('#alert').addClass('success')
			// 		setTimeout(function() {
			// 				$('#alert').fadeOut(125)
			// 		}, 5000);
			// 	},
			// 	fail: function() {
			// 		$('#alert-text').text('Email sent unsuccessfully!')
			// 		$('#alert').css('display', 'flex')
			// 		$('#alert').addClass('fail')
			// 		setTimeout(function() {
			// 				$('#alert').fadeOut(125)
			// 		}, 5000);
			// 	}
			// })
		}
	})
});



























