//var boxDeals = [];
//boxDeals["grass-fed-beef"] = ["small", "medium", "large"];
	
$(document).ready(function() {
	
	$.getJSON("https://hf-foods.firebaseio.com/store.json", function(storeData) {
		
		function showBoxDeals(boxType) {
			
			/*for (var i = 0; i < boxDeals[boxType].length; i++) {
				$("#boxes-container").append("<div class='box-deal-container'><div class='box-deal-img'></div><h4>" + boxDeals[boxType][i] + "</h4><span class='box-deal-price'>$" + storeData + "</span><span class='box-deal-includes-text'>Includes:</span><ul class='box-deal-includes' id=''></ul><button type='button' class='button button-green' data-id=''>Add</button></div>");
				
				for (var j = 0; j < storeData[boxDeals[boxType][i]].length; j++) {
					$("#ul-" + ).append("<li></li>");
				}
				
			}*/
			
			switch(boxType) {
				case 'grass-fed-beef':
					$("#category-name").html("<h3>Grass-fed</h3><h1>Beef</h1><hr><p>Our beef is 100% non-GMO grass-fed heritage beef cattle; guaranteed to be raised without the use of antibiotics, hormones, or pesticides. Smaller cuts packed with a purer, juicy taste.</p>");
					break;
				case 'certified-organic-beef':
					$("#category-name").html("<h3>Certified Organic</h3><h1>Beef</h1><hr><p>Our certified organic beef is fed certified organic non-GMO grain and corn; guaranteed to be raised without the use of antibiotics, hormones, or pesticides.</p>");
					break;
				case 'poultry':
					$("#category-name").html("<h1>Poultry</h1><hr><p>A selection of heritage breeds known for their savory taste.</p>");
					break;
				case 'lamb':
					$("#category-name").html("<h1>Lamb</h1><hr><p>Our lamb is 100% Canadian Arcott sheep and is certified organic.</p>");
					break;
				default:
					$("#category-name").html("<h3>Grass-fed</h3><h1>Beef</h1><hr><p>Our beef is 100% non-GMO grass-fed heritage beef cattle; guaranteed to be raised without the use of antibiotics, hormones, or pesticides. Smaller cuts packed with a purer, juicy taste.</p>");
					break;
			}
			
			$("#boxes-container").empty();
			
			//storeData[boxType]["box-deals"].each(function(index) {
			for (var index in storeData[boxType]["box-deals"]) {
				
				$("#boxes-container").append("<div class='box-deal-container'><div class='box-deal-img' id='img-" + storeData[boxType]["box-deals"][index]["id"] + "' style='background-image: url(\"assets/images/store/" + storeData[boxType]["box-deals"][index]["img"]+ "\");'></div><h4>" + index + "</h4><span class='box-deal-price'>$" + (storeData[boxType]["box-deals"][index]["price"]/100).toFixed(2) + "</span><span class='box-deal-includes-text'>Includes:</span><ul class='box-deal-includes' id='ul-" + storeData[boxType]["box-deals"][index]["id"] + "'></ul><button type='button' class='button button-green add-box-button' data-id='" + storeData[boxType]["box-deals"][index]["id"] + "'>Add</button></div>");
				
				for (var j = 0; j < storeData[boxType]["box-deals"][index]["includes"].length; j++) {
					$("#ul-" + storeData[boxType]["box-deals"][index]["id"]).append("<li>" + storeData[boxType]["box-deals"][index]["includes"][j]["quantity"] + " " + storeData[boxType]["box-deals"][index]["includes"][j]["name"] + "</li>");
				}
				
			}
			
			//reverse elements
			

			var boxItems = $("#boxes-container").children('.box-deal-container');
			$("#boxes-container").append(boxItems.get().reverse());


			
		}
		
		$(document).on("click", ".add-box-button", function(event){
			addToCart([$(this).data("id"), 1]);
			saveCart();
			$.notify({
				message: 'Added box to cart.' 
			},{
				type: 'success',
				z_index: '9999'
			});
		});
		
		showBoxDeals("grass-fed-beef");
		
		$(".tab").click(function() {
			showBoxDeals($(this).data('id'));
		});
	});
});