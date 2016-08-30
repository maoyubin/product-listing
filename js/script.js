(function (window){
	
	var displayCart = document.getElementById('display_cart');
	var cartSection = document.getElementById('cart_section');

	function visibleCart(){
		let displayStyle = cartSection.style.display;

		if(displayStyle != 'none'){
			cartSection.style.display = 'none';
		}else{
			cartSection.style.display = 'block';
			cartSection.focus();
			cartSection.scrollIntoView();
			//window.location.hash='#!cart_section';
			//console.log(window.location.hash);
		}
	}
	window.visibleCart = visibleCart;

	
})(window)