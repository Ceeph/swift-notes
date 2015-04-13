console.log("extension loaded");


//$(document).ready( function() {
	chrome.browserAction.onClicked.addListener(function(tab) {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { text: "get_panel" }, 
         function(response){
            console.log(response.text);
            panel.togglePanel(response.text);
         });
      });
	});
//});