$(document).ready(function(){
  $('#save-note').on("click", function() {
    chrome.storage.local.get({notes: []}, function(result){
      //alert(typeof(window.location));
      var matches = window.location.href.match(/#([^ ]*)/);
      var domain = matches && matches[1];
      var notes = result.notes;
      var textVal = $('textarea').val();
      notes.push({ text: textVal, location: domain });
      chrome.storage.local.set({notes: notes}, function(){
        /*chrome.storage.local.get('notes', function (result) {
            console.log(result.notes)
        });*/
      });
    });
  });

  $('#see-notes').on("click", function(){
    chrome.storage.local.get('notes', function (result) {
      console.log(result.notes);
    });
  });
});