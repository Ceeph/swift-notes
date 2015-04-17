/**
 * This script is linked by the HTML page that gets injected by the content script.
 * Used to CRUD on the notes stored
 */

$(document).ready(function(){

  function insertLi(text, location, date, index, anchor){
    var toAppend = '<li value="' + index + '">' + 
        text + ' <a href="http://' + location + '" target="_blank">' + location + '</a> ' + date + 
      //'<button class="waves-effect waves-teal btn-flati" id="delete-note">Delete</button>';
      '<i id="delete-note" class="tiny mdi-action-delete" style="cursor:pointer;"></i>';
    anchor.append(toAppend);
  }

  function getActualDate(){
    var d = new Date();
    var month = d.getMonth() + 1;
    var date = d.getDate() + '/' + 
      month + '/' + d.getFullYear();

    return date;
  }

  // Displays notes stored
  chrome.storage.sync.get('notes', function (result) {
    var notes = result.notes;
    var newNote = $('<ul/>', {
      class: 'list-notes'
    });
    $.each(notes, function(key, value){
      insertLi(value.text, value.location, value.date, key, newNote);
    });
    $('#all-notes').append(newNote);
  });

  // Save textarea to storage, adding the source domain
  // TODO: add check for undefined array
  $('#save-note').on("click", function() {
    chrome.storage.sync.get({notes: []}, function(result){
      var matches = window.location.href.match(/#([^ ]*)/);
      var domain = matches && matches[1];
      var notes = result.notes;
      var index = notes.length;
      var textVal = $('textarea').val();
      var newKey = { 
        text: textVal, 
        location: domain,
        date: getActualDate()
      }
      notes.push(newKey);

      chrome.storage.sync.set({notes: notes}, function(){
        $('textarea').val("");
        insertLi(newKey.text, newKey.location, newKey.date, index, $('.list-notes'));
        //alert("Note added");
        Materialize.toast('Note added', 2000);
      });
    });
  });

  //$('#see-notes').on("click", function(){
  //});

  // Erases all the notes saved
  $('#clear-notes').on("click", function(){
    chrome.storage.sync.clear(function(){
      //alert("Notes cleared");
      Materialize.toast('I am a toast!', 4000) // 4000 is the duration of the toast
    });
  });

  // Deletes the note from the page and storage
  $('#all-notes').on('click', '#delete-note', function(){
    var toRemove = this.closest('li');
    chrome.storage.sync.get({notes: []}, function(items){
      items.notes.splice(toRemove.value, 1);
      console.log(items.notes);
      toRemove.remove();
      chrome.storage.sync.set(items, function(){
        //alert("Item deleted");
        Materialize.toast('Note deleted', 2000);
      });
    });
  });
});