var shoppingCart = [];
var parsedShoppingCart = [];
var inventoryError = -1;

function addToCart(entry) {
	shoppingCart.push(entry);
}

function updateCartIcon() {
	if (shoppingCart.length > 0) {
		document.getElementById("shopping-cart-notification").innerHTML = shoppingCart.length;
		document.getElementById("shopping-cart-notification").style.display = "block";
	}
}
	
function loadCart() {
	var jsonTemp = Cookies.get('shoppingCart');
	shoppingCart = JSON.parse(jsonTemp);
	updateCartIcon();
}
	
function saveCart() {
	var jsonTemp = JSON.stringify(shoppingCart);
	Cookies.set('shoppingCart', jsonTemp);
	updateCartIcon();
}

function parseShoppingCart() {
	parsedShoppingCart = [];
	
	for (var i=0; i<shoppingCart.length; i++) {
		if (parsedShoppingCart.hasOwnProperty(shoppingCart[i][0]))
			parsedShoppingCart[shoppingCart[i][0]] += shoppingCart[i][1];
		else
			parsedShoppingCart[shoppingCart[i][0]] = shoppingCart[i][1];
			//parsedShoppingCart.push({shoppingCart[i][0] : shoppingCart[i][1]});
	}
}

function checkInventory(func) {
	$(document).ready(function() {
		$.getJSON("https://hf-foods.firebaseio.com/store.json", function(storeData) {
			parsedShoppingCart.forEach(function(element, i) {
				if (storeData[storeData["ids"][i]["food"]][storeData["ids"][i]["type"]][storeData["ids"][i]["num"]]["quantity"] < element) {
					inventoryError = i;
					console.log("inventoryError = " + i);
				}
			});
			func();
		});
	});
}

loadCart();