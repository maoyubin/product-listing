(function (window){
	
	var displayCart = document.getElementById('display_cart');
	var cartSection = document.getElementById('cart_section');

	function visibleCart(){
		let displayStyle = cartSection.style.display;

		console.log(displayStyle);
		console.log(displayStyle === 'none');
		if(displayStyle != 'none'){
			cartSection.style.display = 'none';
		}else{
			cartSection.style.display = 'block';
		}
		
	}
	window.visibleCart = visibleCart;

	
})(window)