$(window).on('main:ready', function( e, data ) {
	
	var $element = $('.menu-inner__list');
	if( !$element.length ) return;

	console.log('menu', $element, data);

	// $('.menu-inner__list').append('<li>').addClass("menu-inner__item ");
	// console.log(data.menu);
	
	var $menu_items = $('.menu-inner__items');

	data.menu.forEach(function(e,i){

		if( e.is_separator ){
			$('<li class="menu-inner__item menu-inner__item-line"></li>')
				.appendTo($menu_items)
			;
		}else{
			$('<li class="menu-inner__item"><a href="#">'+e.text+'</a></li>')
				.appendTo($menu_items)
			;
		}
	});

	/*for(var i = 0; i < menuArray.length; i++){		

		$('.menu-inner__list').prepend('<li>');
		if(!text){

		}		
	}

	$('.menu-inner__list > li').addClass("menu-inner__item").prepend('<a>');

	for(var i = 0; i < menuArray.length; i++){
		var obj = menuArray[i];
		$('.menu-inner__item > a').eq(i).attr('href', obj.href).html(obj.text);
	}
*/

});