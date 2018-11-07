// var a = 5;
$(function(){
	var $body = $('body');

	var windowWidth = window.innerWidth;
	var tabletMin = 768;
	var tabletMax = 1024;

	// >>> ROUTER >>>
	var root = null;
	var useHash = true; // Defaults to: false
	var hash = '#!'; 
	var router = new Navigo(root, useHash, hash);	

	// <<< ROUTER <<<

	

	$(window)
		.resize(function(){
			var winWidth = window.innerWidth;

			$body.toggleClass('is_phone', winWidth <= tabletMin );
			$body.toggleClass('is_tablet', winWidth > tabletMin && winWidth <= tabletMax );
			$body.toggleClass('is_desktop', winWidth > tabletMax );

		})
		.trigger('resize')
	;


	

	$.getJSON('assets/data.json', function(data) {
		// console.log(data);
		$(window).trigger( 'main:ready', data );

		router.updatePageLinks();
	});




	/*$(window).on('menu:change-page', function(e, new_page) {
		// $( 'title').text(new_page);
		$(window).trigger( 'main:pageChanged', new_page );

		router
			.navigate('/' +new_page);

	});*/


	$(window).on('main:ready', function(event, data){
		
		SetTitle();

		var currentLang;
		var currentPage;

		router
			.on({
				

				':id': function(params) {

					console.log('id:', params.id);

					var new_page = params.id || data.defaultPage;
					// console.log( data.defaultPage );
					
					if( data.pages[new_page] ){
						$(window).trigger( 'main:pageChanged', new_page );

					} else {
						// console.log('404');
						router.navigate('404');
						$(window).trigger( 'main:pageChanged', '404' );
					}
				},

				'': function(a,b) {
					console.log('HOME',a,b);
				},
				
				'*': function(a,b) {
					console.log('errUrl',a,b);
				}
			})
			.resolve();



		$(window).on('language:changed', function(e, lang){
			currentLang = lang;

			if( !lang ) return;
			var texts = data.texts;

			SetTitle( currentPage, currentLang);


			$("[data-trnslt]").each(function(i,e){
				// console.log('>', i, e );
				$e = $(e);
				var translate = texts[ $e.data('trnslt') ];
				if( !translate ) return;

				//texts animation
				$e.fadeOut(300, function(){
					$(this).html( translate[lang] || translate[data.defaultLanguage] );
					$(this).fadeIn(300);				
					
				} );

			});

		});


		$(window).on( 'main:pageChanged', function(event, page){
			var currentPage = page;
			SetTitle( currentPage, currentLang);
		});

		function SetTitle( pageName, lang ){
			var page = pageName || data.defaultPage;
			var lang = lang || data.defaultLanguage;

			if( page == "404") {
				var title = "Error:404";

			} else {

				var title = data.pages[page].title[lang] || data.pages[page].title[data.defaultLanguage];
			}
			$('head > title').text( title );
		}

	});

});
