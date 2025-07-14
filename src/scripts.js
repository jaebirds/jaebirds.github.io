$.lazyLoadXT.updateEvent += ' layoutComplete';

$(document).ready(function() {

	function getQueryVariable(variable) {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
	}
	
	var urlPage = getQueryVariable("page");

	//var urlSort = $(location).prop('hash').substr(1);
	
	(function($) {
		$.fn.hasScrollBar = function() {
			return this.get(0).scrollHeight > this.height();
		}
	})(jQuery);

	var isotopeSettings = {
		itemSelector: '.item',
		layoutMode: 'masonry',
		filter: '.featured',
		percentPosition: true,
		fitWidth: true,
		masonry: {
			columnWidth: '.item',
			gutter: 8
		}
	};

	var $isotope = $('#content').isotope(isotopeSettings);

	$isotope.on('layoutComplete', function(){
		$(window).trigger('layoutComplete');
    });
	  
	function onLoadeddata(event) {
		console.log("onLoadeddata called");
		$isotope.isotope('layout');
	}
	
	$isotope.find('video').each( function(i, video) {
		$(video).on('loadeddata', onLoadeddata);
	});
	
	// on scroll, update isotope
	$(window).scroll(function() {
		$isotope.isotope('layout');
	});

	$(document).tooltip({
		track: true,
		tooltipClass: "tooltiptheme",
		items: "*[title]:not(.fancybox-button)",
		show: 100
	});
	
	var $selectedSort = $('#default-sort');
	
	if (urlPage) {
		urlPage = "." + urlPage;
		$isotope.isotope({ filter: urlPage });
	}

	if ($isotope.isotope('getFilteredItemElements').length) {
		if (urlPage) {
			$selectedSort.removeClass("selected");
			$selectedSort = $(".sort-menu li[data-id='"+urlPage+"']");
			$selectedSort.addClass("selected");
		}
	} 
	else { //if hash tag has no items, go to featured
		$isotope.isotope({ filter: ".featured" });
	}
	
	var sortMenuOpen = false;
	var popupOpen = 0;
	
	$(".sort-menu li").click(function() {
		window.scrollTo(0, 0);
		$selectedSort.removeClass("selected");
		$isotope.isotope({ filter: $(this).data("id") });
		setTimeout(function() {
			$isotope.isotope('layout');
		}, 300);
		setTimeout(function() {
			$isotope.isotope('layout');
		}, 1000);
		$selectedSort = $(this);
		$selectedSort.addClass("selected");
		if ($(window).width() < 1280) {
			$("#sidebarbg").animate({marginLeft:"-300"}, 500);
			sortMenuOpen = false;
		}
	});
	
	$(".menubutton").click(function() {
		if ($(this).attr('id') == "work-button") {
			if (!sortMenuOpen) {
				$(".content-popup").fadeOut(500, function() {
					$(this).css('pointer-events','none');
					popupOpen = 0;
				});
			
				//open menu
				$("#sidebarbg").animate({marginLeft: "0"}, 500);
				$("#topbarmask").animate({marginLeft: "0"}, 500);
				$("#website-logo").removeClass("mini", 600);
				//$("#content").animate({marginLeft: "320", opacity: "1"}, 500, function() {
				$("#content").animate({opacity: "1"}, 500, function() {
					$(this).css('pointer-events','');
				});
				
				sortMenuOpen = true;
				
			}
			if ($(window).width() < 1280) {
				$("#sidebarbg").animate({marginLeft: "0"}, 500);
				sortMenuOpen = true;
			}
		} else {
			if (sortMenuOpen) {
				//close menu
				$("#sidebarbg").animate({marginLeft:"-300"}, 500);
				$("#topbarmask").animate({marginLeft:"-300"}, 500);
				$("#website-logo").addClass("mini", 600);
				
				sortMenuOpen = false;
			}

			//$("#content").animate({marginLeft: "0", opacity: "0"}, 500, function() {
			$("#content").animate({opacity: "0"}, 500, function() {
				$(this).css('pointer-events','none');
			});
				
			if ($(this).attr('id') == "about-button") {
				if (popupOpen == 1) {
				} else if (popupOpen > 0) {
					$(".content-popup").fadeOut(500, function() {
						$(this).css('pointer-events','none');
					});
				}
				$("#about-popup").fadeIn(600, function() {
					$(this).css('pointer-events','');
					popupOpen = 1;
				});
			} else if ($(this).attr('id') == "contact-button") {
				if (popupOpen == 2) {
				} else if (popupOpen > 0) {
					$(".content-popup").fadeOut(500, function() {
						$(this).css('pointer-events','none');
					});
				}
				$("#contact-popup").fadeIn(600, function() {
					$(this).css('pointer-events','');
					popupOpen = 2;
				});
			}
		}
	});
	
	if (urlPage == "about")
		$("#about-button").click();
	else if (urlPage == "contact")
		$("#contact-button").click();
	
	/*$("#contactFormError").hide();
	$("#contactForm").submit(function(event) {
		event.preventDefault();
		
		if ($("input[name=name]").val() == ""
			|| $("input[name=email]").val() == ""
			|| $("textarea[name=message]").val() == "")
			$("#contactFormError").show("blind", 500);
		else {
			$.ajax({
				url: "",
				method: "post",
				dataType: "json",
				accepts: "application/json",
				data: $("#contactForm").serialize(),
				success: function(){
					$("#contactForm").fadeOut(500);
					$("#contactFormSubmitted").fadeIn(700);
				},
				error: function(){
					alert("Error");
				}
			});
		}
	});*/

	$(window).resize(function() {
		if ($(window).width() > 1280) {
			$("#sidebarbg").animate({marginLeft: "0"}, 0);
			$("#website-logo").removeClass("mini", 0);
		} else {
			if (!sortMenuOpen)
				$("#sidebarbg").animate({marginLeft: "-300"}, 0);
		}
	});

	$("img, video").lazyLoadXT();
	$("img").on("lazyload", function() {
		$isotope.isotope('layout');
	});

	$('[data-fancybox]').fancybox({
		buttons: [
			"thumbs",
			"close"
		  ],

		video: {
			tpl:
			  '<video class="fancybox-video" controls controlsList="nodownload" poster="{{poster}}" preload="none" muted loop>' +
			  '<source src="{{src}}" type="{{format}}" />' +
			  'Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!' +
			  "</video>",
			autoStart: true
		},
	});
	
	$('html').fadeIn(0);
});