chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
   if (msg.text && (msg.text == "get_panel")) {
      isPanel = ( document.getElementById('sidebarPanel') ? true : false );
      sendResponse({ text: isPanel});
   }
   else if (msg.text && (msg.text == "open_panel")) {

   	//TODO: change variables name
		var newPanel = document.createElement('iframe');
		newPanel.setAttribute('id','sidebarPanel');
		newPanel.setAttribute('src',  chrome.extension.getURL('../sidebar.html'));
		newPanel.setAttribute("style", 
			"z-index: 9999;" +
			"overflow-x: hidden;" +
			"position:fixed;" +
			"top:0;" +
			"right:0;" +
			"width:20%;" +
			"border: 2px solid black;" +
			"height:100%;");
      newPanel.setAttribute("allowtransparency", "false");
      newPanel.setAttribute("scrolling", "no");
		document.body.appendChild(newPanel);
   }
   else if (msg.text && (msg.text == "close_panel")) {
   	document.getElementById("sidebarPanel").remove();
   }
});