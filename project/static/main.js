$(document).ready(function(){
	$('#about-button').on('click', function() {
		window.location.href = '/about'
	})
	$('#contact-button').on('click', function() {
		window.location.href = '/contact_me'
	})
	$('#appointment-button').on('click', function() {
		window.location.href = '/appointment'
	})
	
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
				url: '/email',
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
});
