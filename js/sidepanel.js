//TODO: CRUD on local storage

var sendMessage = function sendMessage(message, callback) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { text: message }, function(response) {
      if (response) {
        callback(response.text);
      }
    });
  });
}

var panel =  {
  togglePanel: function(panel) {
		var openPanel = function() {
      console.log("open panel");
      sendMessage("open_panel"/*, function(response) {
        //chrome.tabs.executeScript(null, {file: "js/injected.js"});
      }*/); 
		};

		var closePanel = function() {
      console.log("close panel");
      sendMessage("close_panel");
		};

		if (panel) {			
      closePanel();
		} else {
			openPanel();
		}
	}
}