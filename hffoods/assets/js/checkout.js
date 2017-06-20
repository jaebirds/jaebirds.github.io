/*window.onerror = function(){
   return true;
}*/

var stripe = Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
var elements = stripe.elements();

// Custom styling can be passed to options when creating an Element.
var style = {
  base: {
    // Add your base input styles here. For example:
    fontSize: '16px',
    lineHeight: '24px'
  }
};

// Create an instance of the card Element
var card = elements.create('card', {style: style});

// Add an instance of the card Element into the `card-element` <div>
card.mount('#card-element');

card.addEventListener('change', function(event) {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

// Create a token or display an error when the form is submitted.
var form = document.getElementById('payment-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  stripe.createToken(card).then(function(result) {
    if (result.error) {
      // Inform the user if there was an error
      var errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;
    } else {
      // Send the token to your server
      stripeTokenHandler(result.token);
    }
  });
});


function stripeTokenHandler(token) {
  // Insert the token ID into the form so it gets submitted to the server
  var form = document.getElementById('payment-form');
  var hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeToken');
  hiddenInput.setAttribute('value', token.id);
  form.appendChild(hiddenInput);

  // Submit the form
  form.submit();
}


var total = 0;


$(document).ready(function() {
	
	$.getJSON("https://hf-foods.firebaseio.com/store.json", function(storeData) {
		
		if (shoppingCart.length > 0) {
			$("#order-container").append("Items:");
			$("#order-container").append("<ul id='items-list'></ul>");
					
			for (var i = 0; i < shoppingCart.length; i++) {
				$("#items-list").append("<li><div><b>" + shoppingCart[i][1] + "</b> " + storeData[storeData["ids"][shoppingCart[i][0]]["food"]][storeData["ids"][shoppingCart[i][0]]["type"]][storeData["ids"][shoppingCart[i][0]]["num"]]["name"] + " @ $" + (storeData[storeData["ids"][shoppingCart[i][0]]["food"]][storeData["ids"][shoppingCart[i][0]]["type"]][storeData["ids"][shoppingCart[i][0]]["num"]]["price"]/100).toFixed(2) + "</div></li>");
					
				total += shoppingCart[i][1] * storeData[storeData["ids"][shoppingCart[i][0]]["food"]][storeData["ids"][shoppingCart[i][0]]["type"]][storeData["ids"][shoppingCart[i][0]]["num"]]["price"];
			}
			$("#order-container").append("Total: $" + (total/100).toFixed(2));
		} else {
			$("#order-container").append("There is nothing in the shopping cart.");
		}
		
		
		
	
		$("#discount-code-button").click(function() {
			if (document.getElementById("discountCode").disabled != true) {
				if (!storeData["discounts"][$("#discountCode").val()]["type"]) {
					
					//calculate new total
					if (storeData["discounts"][$("#discountCode").val()]["type"] == "percent") {
						total = (total * (100 - storeData["discounts"][$("#discountCode").val()]["num"]))/100;
					}
					
					$("#discount-code-form-result").html("Congrats, this is a valid discount code. Your new total is $" + (total/100).toFixed(2));
					
					document.getElementById("discountCode").disabled = true;
					document.getElementById("discount-code-button").disabled = true;
				} else {
					$("#discount-code-form-result").html("Sorry, this is not a valid discount code.");
				}
			}
		});
		
	});
	
});