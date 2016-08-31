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
				    num += Number(length);
			}
	        return num;
	    },
	    totalAmount: 0,
	    cartTotal: function() {
	    	var total = 0;
	    	for (var key in this.cartItems) {
				    if (!this.cartItems.hasOwnProperty(key)) 
				    	continue;
				    var number = this.cartItems[key];
				    var pro = getProductByID(key);
				    total += Number(number) * parseFloat(pro.price);
			}
	        return total;
	    }
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
	
	function updateUI(){
		document.getElementById('share_box_number').innerHTML = cart.numberOfItems();
		document.getElementById('share_box_number2').innerHTML = cart.numberOfItems();
		document.getElementById('cart_subtotal').innerHTML = cart.cartTotal();
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
	
	function isExistCart(objID){
		var iList = document.querySelectorAll('td i');
		for(var i=0;i<iList.length;i++){
			var id = iList[i].getAttribute("id");
			if(objID == id){
				return true;	
			}
		}
		return false;
	}

	function insertTable(obj){
		var tbody = table.getElementsByTagName('tbody');
    	var row = tbody[0].insertRow(0);
		var cell0=row.insertCell(0);
		var cell1=row.insertCell(1);
		var cell2=row.insertCell(2);
		var cell3=row.insertCell(3);
		var cell4=row.insertCell(4);

		cell0.innerHTML = '<button class="close" title="Remove from shopping cart"><i id='+ obj.id +' class="fa fa-trash" aria-hidden="true"></i></button>';
		cell1.innerHTML = '<img src="http://placehold.it/50x50">';
		cell2.innerHTML = obj.desc;
		cell3.innerHTML = '<input type="number" min="1" max="5" objId='+obj.id+' value="'+getProductNumberByID(obj.id)+'">';
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
			//check if this product exist in cart 
			if(isExistCart(productID)){
				return;
			}
			
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
		   //add product in cart 
	       insertTable(getProductByID(productID));
	       updateUI();
	    });
	}

	table.onclick = function(event) {
		if (event.target.nodeName == 'I') {
		    var i = event.target;
		    var id = i.getAttribute("id");
		    var rowIndex = i.parentNode.parentNode.parentNode.rowIndex;
		    table.deleteRow(rowIndex);
		    delete cart.cartItems[id]; 
		    updateUI();
		}
	};
	
	table.onkeyup = function(event) {
		if (event.target.nodeName == 'INPUT') {
		    var inputNode = event.target;
		    var id = inputNode.getAttribute("objId");
		    cart.cartItems[id]=inputNode.value;
		    var pro = getProductByID(id);
		    var priceTd = inputNode.parentNode.parentNode.lastElementChild;
		    console.log(priceTd);
		    priceTd.innerHTML='$'+(Number(inputNode.value) * parseFloat(pro.price));
		    updateUI();
		}
	};
	
})(window)