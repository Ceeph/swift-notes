// T0D0: crete 'addli' function: DRY

$(document).ready(function(){
  chrome.storage.local.get('notes', function (result) {
    var notes = result.notes;
    var newNote = $('<ul/>', {
      class: 'list-notes'
    });
    $.each(notes, function(key, value){
      /*$('<li/>', {
        value: key,
        text: value.text + ' ' + value.location + '<span id="delete-note">delete</span>'
      }).appendTo(newNote);*/
      var toDisplay = '<li value="' + key + '">' + 
          value.text + ' ' + value.location + 
        '<button id="delete-note">Delete</button>';
      newNote.append(toDisplay);
    });
    $('#all-notes').append(newNote);
  });

  $('#save-note').on("click", function() {
    chrome.storage.local.get({notes: []}, function(result){
      var matches = window.location.href.match(/#([^ ]*)/);
      var domain = matches && matches[1];
      var notes = result.notes;
      var textVal = $('textarea').val();
      notes.push({ text: textVal, location: domain });
      chrome.storage.local.set({notes: notes}, function(){
        $('textarea').val("");
        $('<li/>', {
          value: null,
          text: textVal + ' ' + domain + '<button>Delete</button>'
        }).appendTo($('.list-notes'));
        alert("Note added");
      });
    });
  });

  //$('#see-notes').on("click", function(){
  //});

  $('#clear-notes').on("click", function(){
    chrome.storage.local.clear(function(){
      alert("Notes cleared");
    })
  });

  $('#all-notes').on('click', '#delete-note', function(){
    var toRemove = this.closest('li');
    chrome.storage.local.get({notes: []}, function(items){
      items.notes.splice(toRemove.value, 1);
      console.log(items.notes);
      toRemove.remove();
      chrome.storage.local.set(items, function(){
        alert("Item deleted");
      })
    });
  });
});