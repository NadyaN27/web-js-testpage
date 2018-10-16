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


	$(window).on('main:ready', function(event, data){
		// console.log(data);

		$(window).on('language:changed', function(e, lang){
			if( !lang ) return;
			var texts = data.texts;

			// console.log(texts);
			/*
			$.each(texts, function(key, value){

				$("[data-trnslt="+key+"]").html(value[lang]);

			});
			*/

			$("[data-trnslt]").each(function(i,e){
				// console.log('>', i, e );
				e = $(e);
				var translate = texts[ e.data('trnslt') ];
				if( !translate ) return;
				e.html( translate[lang] || translate[data.defaultLanguage] );
			});

		});
		
	});

});
