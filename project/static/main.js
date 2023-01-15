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
	
	$('#contact-button').on('click', function() {
		let name = $('#contact-name').val()
		let email = $('#contact-email').val()
		let message = $('#message').val()
		$.ajax({
			url: '',
			type: '',
			contentType: '',
			data: JSON.stringify({
				name: name,
				email: email,
				message: message
			}),
			success: function(response) {
			
			},
			fail: function(response) {
			
			}
		})
	})
});
