function listCartItems() {
	
	$("#shopping-cart-modal-body").empty();
	
	if (shoppingCart.length > 0) {
		$("#shopping-cart-modal-body").append("Items:");
		$("#shopping-cart-modal-body").append("<ul id='shopping-cart-list'></ul>");
	
		$.getJSON("https://hf-foods.firebaseio.com/store.json", function(storeDataForCart) {
			
			var total = 0;
				
			$("#shopping-cart-list").empty();
			
			for (var i = 0; i < shoppingCart.length; i++) {
				$("#shopping-cart-list").append("<li><div><b>" + shoppingCart[i][1] + "</b> " + storeDataForCart[storeDataForCart["ids"][shoppingCart[i][0]]["food"]][storeDataForCart["ids"][shoppingCart[i][0]]["type"]][storeDataForCart["ids"][shoppingCart[i][0]]["num"]]["name"] + " @ $" + (storeDataForCart[storeDataForCart["ids"][shoppingCart[i][0]]["food"]][storeDataForCart["ids"][shoppingCart[i][0]]["type"]][storeDataForCart["ids"][shoppingCart[i][0]]["num"]]["price"]/100).toFixed(2) + "</div><button type='button' class='button button-gray-border delete-item-button' data-id='" + i + "'>Remove</button></li>");
				
				total += shoppingCart[i][1] * storeDataForCart[storeDataForCart["ids"][shoppingCart[i][0]]["food"]][storeDataForCart["ids"][shoppingCart[i][0]]["type"]][storeDataForCart["ids"][shoppingCart[i][0]]["num"]]["price"];
			}
			$("#shopping-cart-modal-body").append("Total: $" + (total/100).toFixed(2));
		});
	} else {
		$("#shopping-cart-modal-body").append("There is nothing in the shopping cart.");
	}
}

function openShoppingCartModal() {
	$(document).ready(function() {

		$("html").append("<div class='modal fade' id='shoppingCartModal' tabindex='-1' role='dialog' aria-labelledby='shoppingCartLabel'><div class='modal-dialog' role='document'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidded='true'>&times;</span></button><h1 class='modal-title'>Shopping Cart</h1></div><div class='modal-body' id='shopping-cart-modal-body'></div><div class='modal-footer'><button type='button' class='button button-gray-border' data-dismiss='modal'>Close</button><a href='checkout.html'><button type='button' class='button button-green'>Checkout</button></a></div></div></div></div>");
		
		/*$.getJSON("https://hf-foods.firebaseio.com/store.json", function(storeDataForCart) {
		
			var total = 0;
			
			$("#shopping-cart-list").empty();
		
			for (var i = 0; i < shoppingCart.length; i++) {
				$("#shopping-cart-list").append("<li>" + shoppingCart[i][1] + " " + storeDataForCart[storeDataForCart["ids"][shoppingCart[i][0]]["food"]][storeDataForCart["ids"][shoppingCart[i][0]]["type"]][storeDataForCart["ids"][shoppingCart[i][0]]["num"]]["name"] + " @ $" + storeDataForCart[storeDataForCart["ids"][shoppingCart[i][0]]["food"]][storeDataForCart["ids"][shoppingCart[i][0]]["type"]][storeDataForCart["ids"][shoppingCart[i][0]]["num"]]["price"]/100 + "<button type='button' class='delete-item-button' data-id='" + i + "'>Remove</button></li>");
				total += shoppingCart[i][1] * storeDataForCart[storeDataForCart["ids"][shoppingCart[i][0]]["food"]][storeDataForCart["ids"][shoppingCart[i][0]]["type"]][storeDataForCart["ids"][shoppingCart[i][0]]["num"]]["price"];
			}
			$("#shopping-cart-list").append("Total: $" + total/100);
			$('#shoppingCartModal').modal();
			
		});*/
		
		listCartItems();
		
		$('#shoppingCartModal').modal();
	});
}

//openShoppingCartModal();

$(document).ready(function() {
	$("#shopping-cart").click(function() {
		openShoppingCartModal();
	});
	
	$(document).on("click", ".delete-item-button", function(event){
		shoppingCart.splice($(this).data("id"), 1);
		saveCart();
		listCartItems();
		$.notify({
			message: 'Deleted item from cart.' 
		},{
			type: 'danger',
			z_index: '9999'
		});
	});
});