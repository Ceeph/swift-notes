/**
 * Background script: used to manage the app, here to set listeners and
 * opening and closing the side panel
 */

console.log("extension loaded");

//Listener for a browser action click or keybind
chrome.browserAction.onClicked.addListener(function(tab) {

  //Gets the panel status, open:true | closed: false, and calls for the toggle
  sendMessage("get_panel", function(response) {
    panel.togglePanel(response);
  });  
});