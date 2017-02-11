$(function() {
	
	$('.popup_close, #overlay').on('click', function(event) {
		$('.popup, #overlay').removeClass('visible');
	});

	$(".callPopup").on('click', function(event) {
		event.preventDefault();
		var popup = $(this).attr('data-popupBlock');
		if ($('.'+popup).hasClass('popup--notfixed')) {
			$('.'+popup).css('top', $(window).scrollTop() + $(window).height()/2);
		};
		$('#overlay').addClass('visible');
		setTimeout(function () {
			$('.'+popup).addClass('visible')
		},300);
		setTimeout(function () {
			$('.'+popup).find('input').eq(0).focus();
		},1000)
	});

});