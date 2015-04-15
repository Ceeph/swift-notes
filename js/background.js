console.log("extension loaded");


//$(document).ready( function() {
	chrome.browserAction.onClicked.addListener(function(tab) {
      var response = sendMessage("get_panel", function(response) {
         panel.togglePanel(response);
      });  
	});
//});