// var a = 5;
$(function(){

	var $body = $('body');

	var windowWidth = window.innerWidth;
	var tabletMin = 768;
	var tabletMax = 1024;

	var arrLangs = [];
	var defaultLanguage;

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

	MAIN.currentPage = null;
	MAIN.currentLang = null;	
    $(window).data('MAIN', MAIN );

	MAIN.getUrl = function(){

		var url = '/' +this.currentLang + '/' + this.currentPage;

		return url;
	}

	var MAIN = $(window).data('MAIN');



	//подмена ссылокв пунках меню
	function setLinkMenu(lang){
		var lang = lang || MAIN.currentLang;

		var $links = $( '[data-navigo]' );

		$links.each( function(i,e){
			var $e = $(e);

			var href = $e.attr( 'href' );
			var arrHref = href.split( '/' );

			$e.attr('href', lang+ '/' +arrHref[arrHref.length - 1] );
		} );
	}


	$.getJSON('assets/data.json', function(data) {

		// var MAIN = $(window).data('MAIN');
		
		data.langs.forEach(function(item, i, arr) {
			arrLangs.push(item.data);
		});

		MAIN.currentPage = data.defaultPage;
		MAIN.currentLang = $.cookie('language') || data.defaultLanguage;

		defaultLanguage = data.defaultLanguage;

		$(window).trigger( 'main:ready', data );

		setLinkMenu();


		router.updatePageLinks();
	});


	$(window).on('main:ready', function(event, data){
		
		SetTitle();


		// var MAIN = $(window).data('MAIN');

		router
			.on({
				
				':lang/:id': function(params) {

					var new_page = params.id || data.defaultPage;
					var lang = params.lang;

					MAIN.currentPage = new_page;
					MAIN.currentLang = lang;


					

					if( arrLangs.indexOf( lang ) != -1 ){
						$.cookie('language', lang)

						$(window)
							//cмена языка контента
							.trigger( 'language:changed', lang  )

							//cмена в языковой менюшке
							.trigger( 'main:langChanged', lang  )
						;

					} else {
						$.cookie('language', defaultLanguage)
						MAIN.currentLang = defaultLanguage;
					}
					
					if( data.pages[new_page] ){
						$(window).trigger( 'main:pageChanged', new_page );

					} else {
						router.navigate('404');
						$(window).trigger( 'main:pageChanged', '404' );
					}
				},

				':id': function(params) {								

					var new_page = params.id || data.defaultPage;
					
					if( data.pages[new_page] ){
						router.navigate( MAIN.currentLang+'/'+params.id);

						console.log('cath id ');

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

			MAIN.currentLang = lang;

			console.log( 'кука', $.cookie('language') );
			console.log( 'текущий язык', MAIN.currentLang );

			setLinkMenu();

			$.cookie('language', lang , { expires: 7, path: '/' });




			if( !lang ) return;
			var texts = data.texts;


			SetTitle( MAIN.currentPage, MAIN.currentLang);


			router.navigate( MAIN.getUrl() );


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

			MAIN.currentPage  = page;
			console.log( 'кука', $.cookie('language') );
			console.log( 'текущий язык', MAIN.currentLang );
// 
// 
			SetTitle( MAIN.currentPage, MAIN.currentLang);
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
