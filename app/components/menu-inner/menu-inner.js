//e - event событие 	main:ready
//data - json данные, преобразованные в jQuery объект
$(window).on('main:ready', function( e, data ) {
	
	var $element = $('.menu-inner__list');
	if( !$element.length ) return;

	
	var MAIN = $(window).data('MAIN');
	// var defaultLanguage = MAIN.currentLang;
	var defaultLanguage =  data.defaultLanguage;

	
	var $menu_items = $('.menu-inner__items', $element);
	var menu_item_elements = [];

	data.menu.forEach(function(e,i){

		if( e.is_separator ){
			$('<li class="menu-inner__item menu-inner__item-line"></li>')
				.appendTo( $menu_items )
			;
		}else{
			menu_item_elements.push(
				$('<li class="menu-inner__item" data-page="' +e.page+ '"><a  href="'+e.page+'" data-navigo>' + e.text[ $.cookie('language') || defaultLanguage] + '</a></li>')
					.data( 'text', e.text )
					.appendTo( $menu_items )
			);			
		}
	});

	$('.menu-inner__item', $element).click(function(){
		var page = $(this).data('page');
	});
	

	$(window).on('language:changed', function( e, lang ) {
		


		menu_item_elements.forEach(function( $e, index ){
			


			var txt = $e.data( 'text' );
			txt = txt[lang] || txt[defaultLanguage];

			TweenMax.fromTo($e, .2,
				{
					y: 0,
					opacity: 1
				},
				{
					y: 5,
					opacity: 0,
					delay: (0.05 * index),
					onComplete: function(argument) {

						$('a', $e )
							.empty()
							.text(txt)
						;


						TweenMax.fromTo($e, .2,
							{
								y: -5,
								opacity: 0
							},
							{
								y: 0,
								opacity: 1,
								delay: (0.05 * index),
							}
						);
					}
				}
			);
		});
	});

	$(window).on('main:pageChanged', function( e, new_page ) {
		$('.menu-inner__item', $element).removeClass('menu-inner__item_choosed');
		$('.menu-inner__item[data-page="'+new_page+'"]', $element).addClass('menu-inner__item_choosed');
	});

});