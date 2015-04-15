$(document).ready(function(){
  $('#save-note').on("click", function() {
    alert($('textarea').val());
  });
});