chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
   if (msg.text && (msg.text == "get_panel")) {
      isPanel = ( document.getElementById('sidebarPanel') ? true : false );
      sendResponse({ text: isPanel});
   }
   else if (msg.text && (msg.text == "open_panel")) {

   	//TODO: change variables name
   	var newdiv = document.createElement('div'); 
		newdiv.setAttribute('id','sidebarPanel');
		newdiv.innerHTML = "ciao";
		document.body.appendChild(newdiv);
   }
   else if (msg.text && (msg.text == "close_panel")) {
   	document.getElementById("sidebarPanel").remove();
   }
});