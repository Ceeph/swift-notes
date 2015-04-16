console.log("extension loaded");
chrome.browserAction.onClicked.addListener(function(tab) {
  sendMessage("get_panel", function(response) {
    panel.togglePanel(response);
  });  
});