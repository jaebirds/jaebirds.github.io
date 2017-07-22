$(document).ready(function() {

	$('.farmers-main-carousel').owlCarousel({
		items: 1,
		loop: true,
		nav: false,
		autoplay: true,
		autoplayTimeout: 5000,
		//autoplayHoverPause: true
	});
	
	$('.farmers-indiv-bottom-carousel').owlCarousel({
		center: true,
		items: 3,
		margin: 0,
		nav: false,
		loop: true,
		autoplay: true,
		autoplayTimeout: 5000,
		responsiveClass: true,
		responsive: {
			0: {
				items: 1
			},
			778: {
				items: 3
			},
		}
	});

});