// var a = 5;
$(function(){


	console.log("i'm ready!!");

	/*
	var o = {};
	console.log( "$(o)'", $(o) );
	console.log( "$('<canvas>')", $('<canvas>') );
	console.log( "$('div')", $('div') );
	*/

	$.getJSON('assets/data.json', function(data) {
		// console.log(data);
		$(window).trigger( 'main:ready', data );
	});

	$(window).on('menu:change-page', function(e, new_page) {
		// $( 'title').text(new_page);
		$(window).trigger( 'main:pageChanged', new_page );

	});

});