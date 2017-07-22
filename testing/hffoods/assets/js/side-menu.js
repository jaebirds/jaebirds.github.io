function openSideMenu() {
	$(document).ready(function() {
		
		//create side menu
		$("html").append("<div id='side-menu'><a href='javascript:void(0)' class='closebtn' onclick='closeSideMenu()'>&times;</a><a href=''>Link 1</a></div>");
		document.getElementById("side-menu").style.width = "250px";
	});
}

function closeSideMenu() {
	$(document).ready(function() {
		
		document.getElementById("side-menu").style.width = "0px";
		$("#side-menu").remove();
		
	});
}

$(document).ready(function() {
	$("#side-menu-button").click(function() {
		openSideMenu();
	});
});