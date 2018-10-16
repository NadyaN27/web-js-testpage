$(window).on('main:ready', function( e, data ) {
	
	// init
	var $element = $('.inner-part');	
	if( !$element.length ) return;

	var defaultPage = data.defaultPage;
	var defaultLanguage = data.defaultLanguage;
	var current_page = defaultPage;
	var current_lang = defaultLanguage;

	var $title = $('.inner-part__title', $element);
	var $image = $('.inner-part__image > img', $element);
	var $innerPartContent = $('.inner-part-content ', $element);
	var $innerPartColumn = $('.inner-part-column ', $element);
	
	//
	var template_source  = $("#inner-part-template").html();
	var template = Handlebars.compile( template_source );



	// events
	$(window)
		.on('menu:pageChanged', function( e, page ) {
			showContent( page );
		})

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
	showContent();




	// functions
	function showContent( page, lang ){

		var page_content = data.pages[ page || defaultPage];
		var lang = lang || defaultLanguage;

		var context = {
			imgUrl: false || page_content.image[lang],
			title: page_content.title[lang],
			text: page_content.text[lang],
			ulText: page_content.ulTexts[lang]
		};
		
		$element.html( template( context ) );




		/*var sourceContent = ''+
		'<div class="inner-part-content">'+
			'<h2 class="inner-part__title"> {{ title }} </h2>'+
		'</div>' ;

		var contextContent = {title: page_content.title[lang]};
		var template = Handlebars.compile(sourceContent);
		var htmlContent = template(contextContent);
		$element.html(htmlContent);


		if(page_content.image){
			var source = ''+
				'<div class="inner-part__image">' + 
					'<img src={{imgUrl}}>' +
				'</div>';

			var template = Handlebars.compile(source);
			var context = {imgUrl: page_content.image[lang] };
			var html = template(context);
			
			$element.prepend(html);
		}


		if( page_content.text ){
			var sourceText = ''+
				'<div class="inner-part-column">' + 
					'{{text}}' +
				'</div>';

			var template = Handlebars.compile( sourceText );
			var contextText = {text: page_content.text[lang]};
			var htmlText = template( contextText );

			$('.inner-part-content', $element).append( htmlText );
		}


		if( page_content.ulTexts ){
			var sourceUl = ''+
				'<div class="inner-part-column">' + 
					'<ul>' +
						'{{#each ulText}}' +
							'<li> {{text}} </li>' +
						'{{/each}}'	+
					'</ul>' +
				'</div>';

			var template = Handlebars.compile( sourceUl );
			var contextUl = { ulText: page_content.ulTexts[lang] };
			var htmlUl = template( contextUl );

			$('.inner-part-content', $element).append( htmlUl );
		}*/


		// $title.text( page_content.title[lang] );

		/*if(page_content.image){
			$image.attr('src', page_content.image[lang] || page_content.image[defaultLanguage] );		
		}*/
		
		/*if( page_content.text ){
			$innerPartColumn.text( page_content.text[lang] );		
		}*/

		/*if( page_content.ulTexts ){
			$innerPartColumn.append('<ul></ul>');

			page_content.ulTexts[lang].forEach( function(e, i){
				$('ul', $innerPartColumn).append('<li>' +e+ '</li>');	
			}); 
		}*/
	}


});