(function (window){
	var cart = {
	    promoCode: "BIGSALE",
	    cartItems: {},
	    numberOfItems: function() {
	    	var num = 0;
	    	for (var key in this.cartItems) {
				    if (!this.cartItems.hasOwnProperty(key)) 
				    	continue;
				    var length = this.cartItems[key];
				    num += length;
			}
	        return num;
	    },
	    totalAmount: 0,
	    cartTotal: 0,
	    cartList: []
	};
	
	
	var displayCart = document.getElementById('display_cart');
	var cartSection = document.getElementById('cart_section');
	var addButtons = document.getElementsByClassName("add-to-cart");
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
	
	function getProductByID(id){
		for(var i=0;i<productList.length;i++){
			var temp = productList[i];
			if(id === temp.id){
				return temp;
			}
		}
	}
	window.visibleCart = visibleCart;
	
	function changeProductNumber(id, number){
		
	}
	
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
	}
	
	for(i = 0; i < addButtons.length; i++) {
	    addButtons[i].addEventListener("click", function(event) {
	        var productID = this.parentNode.getAttribute("id");
		    if(product!=undefined && cart.cartItems[productID]!=undefined){
		    	for (var key in cart.cartItems) {
				    // skip loop if the property is from prototype
				    if (!cart.cartItems.hasOwnProperty(key)) 
				    	continue;
				    if(productID == key){
				    	cart.cartItems[productID] +=1;
				    	break;
					}
				}
		   }else{
		   	   cart.cartItems[productID] = 1;
		   }
		   
		   document.getElementById('share_box_number').innerHTML = cart.numberOfItems();
	    });
	}
	
})(window)