console.log("content.js");

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
   if (msg.text && (msg.text == "get_panel")) {
      sendResponse({panel:document.getElementById('sidebarPanel')});
   }
   else if (msg.text && (msg.text == "open_panel")) {
   	var newdiv = document.createElement('div'); 
		newdiv.setAttribute('id','stefanvd');
		document.body.appendChild(newdiv);
		alert("new div created");
		sendResponse(newdiv);
   }
});