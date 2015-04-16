/* Function used to call Chrome API to send messages to the Content script
 * contained in the active page
 * @message: Text of the message to send
 * @callback: Function to be executed after the sending 
 */
var sendMessage = function sendMessage(message, callback) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { text: message, tab: tabs[0] }, function(response) {
      if (response) {
        callback(response.text);
      }
    });
  });
}

// Object used to manage the status of the panel

var panel =  {
  togglePanel: function(panel) {
		var openPanel = function() {
      console.log("open panel");
      sendMessage("open_panel"); 
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