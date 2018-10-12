$(window).on('main:ready', function( e, data ) {
	
	var $element = $('.inner-part');	
	if( !$element.length ) return;

	var defaultPage = data.defaultPage;
	var defaultLanguage = data.defaultLanguage;
	var current_page = defaultPage;
	var current_lang = defaultLanguage;

	var $title = $('.inner-part__title', $element);
	var $image = $('.inner-part__image > img', $element);
	var $innerPartColumn = $('.inner-part-column ', $element);

	showContent();

	$(window).on('menu:pageChanged', function( e, page ) {
		showContent( page );
	});

	$(window).on('main:pageChanged', function( e, _page ) {
		current_page = _page;
		showContent( current_page, current_lang );
	});

	$(window).on('language:changed', function( e, _lang ) {
		current_lang = _lang;
		showContent( current_page, current_lang );
	});

	//
	function showContent( page, lang ){

		var page_content = data.pages[ page || defaultPage];
		var lang = lang || defaultLanguage;

		$title.text( page_content.title[lang] );

		if(page_content.image){
			$image.attr('src', page_content.image[lang] || page_content.image[defaultLanguage] );		
		}

		if( page_content.text ){
			$innerPartColumn.text( page_content.text[lang] );		
		}

		if( page_content.ulTexts ){

			$innerPartColumn.append('<ul></ul>');
			page_content.ulTexts[lang].forEach( function(e, i){
				$('ul', $innerPartColumn).append('<li>' +e+ '</li>');	
			}); 
		}
	}


});