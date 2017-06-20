var shoppingCart = [];

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

loadCart();