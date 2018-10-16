// var a = 5;
$(function(){


	// console.log("i'm ready!!");

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
		
		SetTitle();

		var currentLang;
		var currentPage;

		$(window).on('language:changed', function(e, lang){
			currentLang = lang;

			if( !lang ) return;
			var texts = data.texts;

			SetTitle( currentPage, currentLang);


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


		$(window).on( 'main:pageChanged', function(event, page){
			var currentPage = page;
			SetTitle( currentPage, currentLang);
		});

		function SetTitle( pageName, lang ){
			var page = pageName || data.defaultPage;
			var lang = lang || data.defaultLanguage;

			var title = data.pages[page].title[lang] || data.pages[page].title[data.defaultLanguage];
			$('head > title').text( title );
		}

	});

});
