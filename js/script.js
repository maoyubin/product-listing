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
	var table = document.getElementById("cart_table");
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

	function getProductNumberByID(id){
		for(var key in cart.cartItems){
			if(id === key){
				return cart.cartItems[key];
				break;
			}
		}
		return 0;
	}

	window.visibleCart = visibleCart;
	
	function changeProductNumber(id, number){
		
	}

	function insertTable(obj){
		var row = table.insertRow(1);

		var cell0=row.insertCell(0);
		var cell1=row.insertCell(1);
		var cell2=row.insertCell(2);
		var cell3=row.insertCell(3);
		var cell4=row.insertCell(4);

		cell0.innerHTML = '<button class="close" title="Remove from shopping cart"><i class="fa fa-trash" aria-hidden="true"></i></button>';
		cell1.innerHTML = '<img src="http://placehold.it/50x50">';
		cell2.innerHTML = obj.desc;
		cell3.innerHTML = '<input type="number" value="'+getProductNumberByID(obj.id)+'">';
		cell4.innerHTML = '$'+obj.price;
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

		   insertTable(getProductByID(productID));
	    });
	}

	table.onclick = function(event) {
		if (event.target.nodeName == 'I') {
		    var i = event.target;
		    var rowIndex = i.parentNode.parentNode.parentNode.rowIndex;
		    table.deleteRow(rowIndex);
		}
	};
	
})(window)