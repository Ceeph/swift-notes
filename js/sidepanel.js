var panel =  {
	/*loadHtml: function(){
		$.get("../sidebar.html", function(data){
			return data;
		});
	},*/

	togglePanel: function(panel){
		console.log("toggle");
		var openPanel = function(){
			//chrome.tabs.executeScript(null, {file: "js/content.js"});
      alert("open panel");
      //$('body').append("<div>CIAONE</div>");
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { text: "open_panel" }, 
         function(response){
            alert(response);
         });
      });
		};

		var closePanel = function(){
      alert("close panel");
      panel.remove();
		};

		if (panel) {			
      closePanel();
		} else {
			openPanel();
		}
	}
}