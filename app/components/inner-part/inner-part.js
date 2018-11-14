$(window).on('main:ready', function( e, data ) {
	
	// init
	var $element = $('.inner-part');	
	if( !$element.length ) return;

	var defaultPage = data.defaultPage;
	var defaultLanguage = data.defaultLanguage;
	var current_page = defaultPage;
	var current_lang = defaultLanguage;

	var $title;
	var $image;
	var $innerPartColumn;

	var MAIN = $(window).data('MAIN');
	
	//
	var template = Handlebars.compile($("#inner-part-template").html());



	// events
	$(window)
		/*.on('menu:pageChanged', function( e, page ) {
			showContent( page );
		})*/

		.on('main:pageChanged', function( e, _page ) {
			current_page = _page;
			showContent( current_page, current_lang );
		})

		.on('language:changed', function( e, _lang ) {
			current_lang = _lang;
			showContent( current_page, current_lang );
		})
	;

	


	// start
	showContent( MAIN.currentPage, MAIN.currentLang );




	// functions
	function showContent( page, lang ){

		if( page=='404'){
			// var page_content = data.pages[ page || defaultPage];
			// var lang = lang || defaultLanguage;

			var context = {
				imgUrl: "",
				title: "404",
				text: "",
				ulText: ""
			};
			
		} else {

			var page_content = data.pages[ page || defaultPage];
			var lang = lang || defaultLanguage;

			var context = {
				imgUrl: false || page_content.image[lang] || page_content.image[defaultLanguage],
				title: page_content.title[lang] || page_content.title[defaultLanguage],
				text: page_content.text[lang] || page_content.text[defaultLanguage],
				ulText: page_content.ulTexts[lang] || page_content.ulTexts[defaultLanguage]
			};
		}

		
		// $element.html( template( context ) );

		/*$element.fadeOut(300, function() {
			
			$element.html( template( context ) );
			$element.fadeIn(300);
		});*/
		
		// TweenMax.set( $title, {top: '10'} );



		// title
		if($title){

			TweenMax.killTweensOf( $image );
			TweenMax.fromTo( $image, .2,
				{
					scale: 1,
					opacity: 1
				},
				{
					delay: 0,
					scale: 1.2,
					opacity: 0,
					ease: Sine.easeIn,
				}
			);

			TweenMax.killTweensOf( $title );
			TweenMax.fromTo( $title, .2,
				{
					x: 0,
					opacity: 1
				},
				{
					delay: 0.15,
					x: 10,
					opacity: 0,
					ease: Sine.easeIn,
				}
			);

			TweenMax.killTweensOf( $innerPartColumn );
			TweenMax.fromTo( $innerPartColumn, .2,
				{
					// x: 0,
					opacity: 1
				},
				{
					delay: 0.3,
					// x: 30,
					opacity: 0,
					ease: Sine.easeIn,
					onComplete: function(argument) {

						_showContent();
					}
				}
			);

		}else{
			_showContent();
		}



		function _showContent(){

			$element.html( template( context ) );
					
			$title = $('.inner-part__title', $element);
			$image = $('.inner-part__image > img', $element);
			$innerPartColumn = $('.inner-part-column ', $element);



			TweenMax.fromTo( $image, .2,
				{
					scale: 1.2,
					opacity: 0
				},
				{
					scale: 1,
					opacity: 1,
					ease: Sine.easeOut,
					delay: 0
					
				}
			);

			TweenMax.fromTo( $title, .2,
				{
					x: -10,
					opacity: 0
				},
				{
					x: 0,
					opacity: 1,
					ease: Sine.easeOut,
					delay: 0.15

				}
			);

			TweenMax.fromTo( $innerPartColumn, .5,
				{
					// x: -10,
					opacity: 0
				},
				{
					// x: 0,
					opacity: 1,
					ease: Sine.easeOut,
					delay: 0.3
					
				}
			);
		}
	}
});