//TODO: create sendMessage(msg) as function

var panel =  {
  togglePanel: function(panel){
		var openPanel = function(){
      console.log("open panel");
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { text: "open_panel" }/*, 
          function(response){
            alert("ciaone");
          }*/
        );
      });
		};

		var closePanel = function(){
      console.log("close panel");
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { text: "close_panel" }/*, 
          function(response){
            alert("ciaone");
          }*/
        );
      });
		};

		if (panel) {			
      closePanel();
		} else {
			openPanel();
		}
	}
}