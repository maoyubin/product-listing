(function (window){
	
	var displayCart = document.getElementById('display_cart');
	var cartSection = document.getElementById('cart_section');
	var productList = [];
	

	function visibleCart(){
		let displayStyle = cartSection.style.display;

		if(displayStyle != 'none'){
			cartSection.style.display = 'none';
		}else{
			cartSection.style.display = 'block';
			cartSection.focus();
			cartSection.scrollIntoView();
		}
	}
	window.visibleCart = visibleCart;
	
	var products = document.getElementsByClassName("product-details");
	for(var i=0;i<products.length;i++){
		var product = {};
		product.id = products[i].getAttribute("id");
		var firstNode = products[i].firstElementChild;
		var lastNode = products[i].lastElementChild;
		var mon = lastNode.previousElementSibling.innerHTML;
		mon = mon.substr(1, mon.length);

		product.name = firstNode.innerHTML;
		product.desc = lastNode.innerHTML;
		product.price = mon;
		productList.push(product);
		console.log(product);
	}
	
})(window)