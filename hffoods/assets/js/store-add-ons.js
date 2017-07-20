$(document).ready(function() {

	$.getJSON("https://hf-foods.firebaseio.com/store.json", function(storeData) {
		
		function getItems(type) {
			$("#add-ons-item-container").empty();
			for (var i = 0; i < storeData[type]["add-ons"].length; i++) {
				var price = storeData[type]["add-ons"][i]["price"] / 100;
				$("#add-ons-item-container").append("<div class='item'><h3>" + storeData[type]["add-ons"][i]["name"] + "</h3><h2>$" + price + "<sub>/lb.</sub></h2><form><input type='number' placeholder='QTY' data-id='" + storeData[type]["add-ons"][i]["id"] + "' min='0' max='" + storeData[type]["add-ons"][i]["quantity"] + "'><button type='button' class='add' id='add-id-" + storeData[type]["add-ons"][i]["id"] + "'>Add</button></form></div>");
			}
			
			if (storeData[type]["add-ons"].length < 1)
				$("#add-ons-item-container").append("<p>No add-ons for this category at this time.</p>");
		}
		
		getItems("grass-fed-beef");
		
		/*function gatherData() {
			$("input[type='number']").each(function() {
				if ($(this).val() > 0) {

					addToCart([$(this).data("id"), $(this).val()]);
					saveCart();
				}
			});
		}*/
		
		function gatherData(itemID) {
			var val = $("#" + itemID).parent().find("input[type='number']").val();
			
			if (val > 0) {
				addToCart([$("#" + itemID).parent().find("input[type='number']").data("id"), val]);
				saveCart();
				$.notify({
					message: 'Added item to cart.' 
				},{
					type: 'success',
					z_index: '9999'
				});
			}
		}
		
		$("#store-add-ons-tabs .tab").click(function() {
			//gatherData();
			getItems($(this).data("id"));
		});
		
		$(".add").click(function() {
			gatherData($(this).attr('id'));
		});
		
	});

});