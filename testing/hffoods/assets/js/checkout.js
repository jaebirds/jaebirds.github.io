var total = 0;

/*function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}
	
if (getQueryVariable("checkout") == "done") {
	
	//update inventory and empty cart
	
	$(document).ready(function() {
		$(".on-complete").show();
	}
} else {
	$(document).ready(function() {
		$(".not-on-complete").show();
	}
}*/

var stripe = Stripe('pk_test_5jydlLqHz8ShyPZ6oeAhTyRt');
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
		
		//check data
		if (total <= 0) {
			var errorElement = document.getElementById('card-errors');
			errorElement.textContent = "Invalid total.";
			return;
		}
		if (document.forms["payment-form"]["name"].value.trim() == ""
			|| document.forms["payment-form"]["email"].value.trim() == ""
			|| document.forms["payment-form"]["address"].value.trim() == "") {
			var errorElement = document.getElementById('card-errors');
			errorElement.textContent = "Please fill in required inputs.";
			return;
		}
		
		$('#payment-form').append('<input type="hidden" name="amount" value="'+ total +'"/>');
		
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


$(document).ready(function() {
	
	$.getJSON("https://hf-foods.firebaseio.com/store.json", function(storeData) {
		
		if (shoppingCart.length > 0) {
			$("#order-container").append("<h4>Items:</h4>");
			$("#order-container").append("<ul id='items-list'></ul>");
			
			parseShoppingCart();
					
			parsedShoppingCart.forEach(function(element, i) {
			//for (var i = 0; i < shoppingCart.length; i++) {
				$("#items-list").append("<li><div><b>" + element + "</b> " + storeData[storeData["ids"][i]["food"]][storeData["ids"][i]["type"]][storeData["ids"][i]["num"]]["name"] + " @ $" + (storeData[storeData["ids"][i]["food"]][storeData["ids"][i]["type"]][storeData["ids"][i]["num"]]["price"]/100).toFixed(2) + "</div></li>");
					
				total += element * storeData[storeData["ids"][i]["food"]][storeData["ids"][i]["type"]][storeData["ids"][i]["num"]]["price"];
			});
			$("#order-container").append("<b><i>Total: $" + (total/100).toFixed(2) + "</i></b>");
			
			checkInventory(function() {
				if (inventoryError >= 0) {
					$("#order-container").append("<div class='error'>Error: Keep " + storeData[storeData["ids"][inventoryError]["food"]][storeData["ids"][inventoryError]["type"]][storeData["ids"][inventoryError]["num"]]["name"] + " at " + storeData[storeData["ids"][inventoryError]["food"]][storeData["ids"][inventoryError]["type"]][storeData["ids"][inventoryError]["num"]]["quantity"] + " units or below. Please edit your shopping cart and refresh the page.</div>");
					$.notify({
						message: 'Please fix your shopping cart error before proceeding.' 
					},{
						type: 'danger',
						z_index: '9999'
					});
				}
			});
			
		} else {
			$("#order-container").append("There is nothing in the shopping cart.");
			
			// disable forms
			$(".ready-for-checkout").hide();
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