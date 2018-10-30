//e - event событие 	main:ready
//data - json данные, преобразованные в jQuery объект
$(window).on('main:ready', function( e, data ) {
	
	var $element = $('.menu-inner__list');
	if( !$element.length ) return;


	var defaultLanguage = data.defaultLanguage;
	// console.log('menu', $element, data);

	// $('.menu-inner__list').append('<li>').addClass("menu-inner__item ");
	// console.log(data.menu);
	
	var $menu_items = $('.menu-inner__items', $element);
	var menu_item_elements = [];

	data.menu.forEach(function(e,i){

		if( e.is_separator ){
			$('<li class="menu-inner__item menu-inner__item-line"></li>')
				.appendTo( $menu_items )
			;
		}else{
			menu_item_elements.push(
				$('<li class="menu-inner__item" data-page="' +e.page+ '"><a href="#">' + e.text[defaultLanguage] + '</a></li>')
					.data( 'text', e.text )
					.appendTo( $menu_items )
			);			
		}
	});

	$('.menu-inner__item', $element).click(function(){
		var page = $(this).data('page');
		// $(this).addClass('menu-inner__item_choosed');
		$(window).trigger( 'menu:change-page', page );
	});
	
	// console.log(MenuTexts.length);

	$(window).on('language:changed', function( e, lang ) {
		

		menu_item_elements.forEach(function( $e, index ){
			
			var txt = $e.data( 'text' );
			txt = txt[lang] || txt[defaultLanguage];

			$e.fadeOut(200, function(){
				$('a', $e )
					.empty()
					.text(txt)
				;				
				$e.fadeIn(200);
			});
		});
	});

	$(window).on('main:pageChanged', function( e, new_page ) {
		$('.menu-inner__item', $element).removeClass('menu-inner__item_choosed');
		$('.menu-inner__item[data-page="'+new_page+'"]', $element).addClass('menu-inner__item_choosed');
	});

});