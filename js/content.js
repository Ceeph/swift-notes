/** 
 * Content script: runs in a sandbox and is the only one to interact with the page and its DOM
 * Used to get and set content
 */

/* Listens for any messages incoming from background script or popup page
 * @msg: incoming message
 * @sender: tab who sent the message, in case the sender was another content script
 * @sendResponse: function to send a response back
 */
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.text && (msg.text == "get_panel")) {

    // Gets the status of the panel and sends it back
    isPanel = ( document.getElementById('sidebarPanel') ? true : false );
    sendResponse({ text: isPanel});
  }
  else if (msg.text && (msg.text == "open_panel")) {
    /*TODO:
     * - Rename variables
     * - convert to jQuery
     * - reorder CSS
     * - module it
     */

    // Gets the url of the active page and gets the domain from it
    var matches = msg.tab.url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    var domain = matches && matches[1];

    // Create the iFrame element and appends it to the body of the page
    var newPanel = document.createElement('iframe');
    newPanel.setAttribute('id','sidebarPanel');
    newPanel.setAttribute('src',  chrome.extension.getURL('../sidebar-angular.html') + '#' + domain);
    newPanel.setAttribute("style", 
     "z-index: 9999;" +
     "overflow-x: hidden;" +
     "position:fixed;" +
     "top:0;" +
     "right:-20%;" +
     "width:25%;" +
     "border: none;" +
     "-webkit-box-shadow: -4px 0px 7px 0px rgba(0,0,0,0.33);" +
     "-moz-box-shadow: -4px 0px 7px 0px rgba(0,0,0,0.33);" +
     "box-shadow: -4px 0px 7px 0px rgba(0,0,0,0.33);" +
     "height:100%;");
    newPanel.setAttribute("allowtransparency", "false");
    //newPanel.setAttribute("scrolling", "no");

    /*document.body.appendChild(newPanel);
    sidebarElement = $('#sidebarPanel');
    sidebarElement.animate({right: 0},50);*/
    $('body').append(newPanel);
    sidebarElement = $('#sidebarPanel');
    sidebarElement.animate({right: 0},50);

  }

  else if (msg.text && (msg.text == "close_panel")) {

    // Closes the panel
    sidebarElement.animate({right: "-20%"},50,function(){
     sidebarElement.remove();
   });
  }
});