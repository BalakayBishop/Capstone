// ----- AJAX FUNCTIONS -----
// function ajax(url, type, data, success, fail) {
// 	$.ajax({
// 		url: url,
// 		type: type,
// 		contentType: 'application/json',
// 		data: data,
// 		success: success,
// 		error: fail
// 	});
// }
//
// function ajax_get(url,  success, fail) {
// 	$.ajax({
// 		url: url,
// 		type: 'GET',
// 		success: success,
// 		error: fail
// 	});
// }
//
// // ----- ALERT FUNCTION -----
// function alert_func(alert, alert_text, text, type) {
// 	$(alert_text).text(text)
// 	$(alert).css('display', 'flex')
// 	$(alert).addClass(type)
// 	setTimeout(function() {
// 			$(alert).fadeOut(125)
// 	}, 5000);
// }
//
// // ----- VALIDATIONS FUNCTION -----
// function remove_both(id, classes) {
// 	$(id).removeClass(classes)
// }
//
// function one_class(id, add, remove) {
// 	$(id).addClass(add)
// 	$(id).removeClass(remove)
// }

$(document).ready(function() {
	// ----- OPEN FORUM MODAL -----
	$('#new-post-button').on('click', function() {
		let content =
			"<div class='modalHeader'>" +
				"<h2>Create a New Post!</h2>" +
				"<p><i class='fa-solid fa-xmark modal-x'></i></p>" +
			"</div>"
		modal('visible', content)
	});
	
	// ----- CLOSE FORUM MODAL -----
	$(".modal-x").on('click', function() {
		modal()
	})
	
	// ----- MODAL FUNCTION -----
	function modal(visibility = 'hidden', content = '') {
		$("#popup-overlay, #popup-content").css({'visibility':visibility})
		$('#popup-content').html(content)
	}
})