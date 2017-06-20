$(document).ready(function() {
    'use strict';
	
	$('.carousel').carousel({interval: 5000})
	
	//Scrolldown buttons
	$(".scroll-down-button-white").click(function() {
		var ele = $(this).closest("section").next("section");
		$("body").animate({
         scrollTop: $(ele).offset().top
                    }, 500);
		return false;
	});
	$(".scroll-down-button-red").click(function() {
		var ele = $(this).closest("section").parent().next("section");
		$("body").animate({
         scrollTop: $(ele).offset().top
                    }, 500);
		return false;
	});

    // Initialize Search
    /*$('[data-pages="search"]').search({
        // Bind elements that are included inside search overlay
        searchField: '#overlay-search',
        closeButton: '.overlay-close',
        suggestions: '#overlay-suggestions',
        brand: '.brand',
        // Callback that will be run when you hit ENTER button on search box
        onSearchSubmit: function(searchString) {
            console.log("Search for: " + searchString);
        },
        // Callback that will be run whenever you enter a key into search box. 
        // Perform any live search here.  
        onKeyEnter: function(searchString) {
            console.log("Live search for: " + searchString);
            var searchField = $('#overlay-search');
            var searchResults = $('.search-results');

            /* 
                Do AJAX call here to get search results
                and update DOM and use the following block 
                'searchResults.find('.result-name').each(function() {...}'
                inside the AJAX callback to update the DOM
            */

            // Timeout is used for DEMO purpose only to simulate an AJAX call
            /*clearTimeout($.data(this, 'timer'));
            searchResults.fadeOut("fast"); // hide previously returned results until server returns new results
            var wait = setTimeout(function() {

                searchResults.find('.result-name').each(function() {
                    if (searchField.val().length != 0) {
                        $(this).html(searchField.val());
                        searchResults.fadeIn("fast"); // reveal updated results
                    }
                });
            }, 500);
            $(this).data('timer', wait);

        }
    });*/
});