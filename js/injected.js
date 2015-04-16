$(document).ready(function(){
  $('#save-note').on("click", function() {
    chrome.storage.local.get({notes: []}, function(result){
      var matches = window.location.href.match(/#([^ ]*)/);
      var domain = matches && matches[1];
      var notes = result.notes;
      var textVal = $('textarea').val();
      notes.push({ text: textVal, location: domain });
      chrome.storage.local.set({notes: notes}, function(){
        alert("Note added");
        /*chrome.storage.local.get('notes', function (result) {
            console.log(result.notes)
        });*/
      });
    });
  });

  $('#see-notes').on("click", function(){
    chrome.storage.local.get('notes', function (result) {
      //TODO: add display function
      console.log(result.notes);
      var notes = result.notes;
      var newNote = $('<ul/>', {
        class: 'list-notes'
      });
      $.each(notes, function(key, value){
        $('<li/>', {
          value: key,
          text: value.text + ' ' + value.location
        }).appendTo(newNote);
      });
      $('#all-notes').append(newNote);
    });
  });

  $('#clear-notes').on("click", function(){
    chrome.storage.local.clear(function(){
      alert("Notes cleared");
    })
  });
});