$(window).on('main:ready', function( e, data ) {
	
	var $element = $('.langs');	
	if( !$element.length ) return;

	var $currentLang = $('p', $element);	
	var $langs__items =	$('.langs__items', $element);


	//генерация элементов
	data.langs.forEach( function(e, i) {
		$('<li class="langs__item" data-lang=' +e.data+'>' +e.text+ '</li>')
			.appendTo($langs__items)
		;
	});
	var $langs__item =	$('.langs__item', $element);


	//переключение выпадашки
	$currentLang.click(function() {
		$element.addClass("langs_active");
	});

	$(window).on('main:langChanged', function(e, lang){
		setLang(lang);
	});
	
		//генерация события
	$('.langs__item').click(function() {
		$element.removeClass("langs_active");

		var lang = $(this).data('lang');
		setLang(lang);
		$(window).trigger( 'language:changed', lang  );
	});
	

	//запись языка в шапку
	function setLang(lang){
		$currentLang
			.empty()
			.html(lang)
		;
	}


/*	//___________________________________
	$(window).on('language:changed', function( e, lang ) {
		console.log(lang);
	});
*/
});