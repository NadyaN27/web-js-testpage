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


	// #!
	// var MAIN = window.MAIN = {};
	// MAIN._id = 123;

	// #2
	var MAIN = {};
	MAIN._id = 123;
    $(window).data('MAIN', MAIN );

	MAIN.currentPage;
	MAIN.currentLang;	

	MAIN.makeUrl = function(){
		// var url = "";

		var url = this.currentLang + '/' + this.currentPage;

		// console.log('url', url);
		return url;
	}

	// console.log( $(window).data( $.proxy( MAIN.makeUrl(), MAIN) )  );




	//подмена ссылокв пунках меню
	function setLinkMenu(lang){
		var lang = lang || $(window).data('MAIN.currentLang');

		var $links = $( '[data-navigo]' );

		$links.each( function(i,e){
			var $e = $(e);

			var href = $e.attr( 'href' );
			var arrHref = href.split( '/' );

			$e.attr('href', lang+ '/' +arrHref[arrHref.length - 1] );
		} );
	}


	$.getJSON('assets/data.json', function(data) {
		$(window).data('MAIN.currentLang', data.defaultLanguage );
		$(window).data('MAIN.currentPage', data.defaultPage );

		$(window).trigger( 'main:ready', data );


		setLinkMenu();

		router.updatePageLinks();
	});


	$(window).on('main:ready', function(event, data){
		
		SetTitle();

		var currentLang;
		var currentPage;

		router
			.on({
				
				':lang/:id': function(params) {

					var new_page = params.id || data.defaultPage;
					currentPage = new_page;

					var lang = params.lang;

					var arrLangs = [];
					
					data.langs.forEach(function(item, i, arr) {
						arrLangs.push(item.data);
					});
					

					if( arrLangs.indexOf( lang ) != -1 ){

						$(window).trigger( 'language:changed', lang  );
						$(window).trigger( 'main:langChanged', lang  )
					} else {

						router.navigate('404');
						$(window).trigger( 'main:pageChanged', '404' );
					}
					
					if( data.pages[new_page] ){
						$(window).trigger( 'main:pageChanged', new_page );

					} else {
						router.navigate('404');
						$(window).trigger( 'main:pageChanged', '404' );
					}
				},

				':id': function(params) {					

					
					// console.log('id:', params.id);

					var new_page = params.id || data.defaultPage;
					
					if( data.pages[new_page] ){
						router.navigate( currentLang+'/'+params.id);
						// $(window).trigger( 'main:pageChanged', new_page );

					} else {
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

			$(window).data('MAIN.currentLang', lang );

			setLinkMenu();

			// console.log( $(window).data( )  );


			if( !lang ) return;
			var texts = data.texts;

			currentPage = currentPage || data.defaultPage;
			SetTitle( currentPage, currentLang);


			router.navigate('/' +currentLang+'/'+currentPage+'');





			$("[data-trnslt]").each(function(i,e){
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
			currentPage = page;
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
