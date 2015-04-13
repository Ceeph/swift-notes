chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
   if (msg.text && (msg.text == "get_panel")) {
      isPanel = ( document.getElementById('sidebarPanel') ? true : false );
      sendResponse({ text: isPanel});
   }
   else if (msg.text && (msg.text == "open_panel")) {

   	//TODO: better variables name & converto to jQuery
		var newPanel = document.createElement('iframe');
		newPanel.setAttribute('id','sidebarPanel');
		newPanel.setAttribute('src',  chrome.extension.getURL('../sidebar.html'));
		newPanel.setAttribute("style", 
			"z-index: 9999;" +
			"overflow-x: hidden;" +
			"position:fixed;" +
			"top:0;" +
			"right:-20%;" +
			"width:20%;" +
			"border: none;" +
			"-webkit-box-shadow: -4px 0px 7px 0px rgba(0,0,0,0.33);" +
			"-moz-box-shadow: -4px 0px 7px 0px rgba(0,0,0,0.33);" +
			"box-shadow: -4px 0px 7px 0px rgba(0,0,0,0.33);" +
			"height:100%;");
      newPanel.setAttribute("allowtransparency", "false");
      newPanel.setAttribute("scrolling", "no");
		document.body.appendChild(newPanel);
		$('#sidebarPanel').animate({right: 0},50);
   }
   else if (msg.text && (msg.text == "close_panel")) {
   	$('#sidebarPanel').animate({right: "-20%"},50,function(){
   		$('#sidebarPanel').remove();
   	});
   	//document.getElementById("sidebarPanel").remove();
   }
});