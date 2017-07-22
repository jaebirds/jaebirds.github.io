//update inventory and empty cart

if (shoppingCart.length > 0) {
	
	parseShoppingCart();

	parsedShoppingCart.forEach(function(element, i) {
		
		var cartQuantity = element;
		var cartID = i;
		
		$.getJSON("https://hf-foods.firebaseio.com/store.json", function(storeItemData) {
		
			var newQuantity = storeItemData[storeItemData["ids"][cartID]["food"]][storeItemData["ids"][cartID]["type"]][storeItemData["ids"][cartID]["num"]]["quantity"] - cartQuantity;
			
			var item = firebase.database().ref('/store/' + storeItemData["ids"][cartID]["food"] + '/' + storeItemData["ids"][cartID]["type"] + '/' + storeItemData["ids"][cartID]["num"]);
			
			item.update({quantity: newQuantity});
	  
		});
	});
	
	shoppingCart = [];
	saveCart();
}