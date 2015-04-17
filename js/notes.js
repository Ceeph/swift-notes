(function() {
  var app = angular.module('notes', ['ngMaterial']);

  app.config( function ($compileProvider) {
     $compileProvider.aHrefSanitizationWhitelist (/^\s*(https?|ftp|mailto|file|tel|chrome-extension):/);
  });

  app.controller('SwiftController', function($scope, $mdToast){
    var swift = this;
    swift.notes = [];
    swift.newNote = {};

    chrome.storage.sync.get('notes', function (result) {
      if (result.notes) {
        swift.notes = result.notes;
      }
    });

    swift.addNote = function(){
      var matches = window.location.href.match(/#([^ ]*)/);
      var domain = matches && matches[1];
      swift.newNote.location = domain;
      swift.newNote.date = Date.now();
      swift.notes.push(swift.newNote);

      chrome.storage.sync.set({notes: swift.notes}, function(){
        $mdToast.show(
              $mdToast.simple()
                .content('Note added!')
                .hideDelay(1000)
            );
        swift.newNote = {};
      });
    };

    swift.deleteNote = function(index) {
      swift.notes.splice(index,1);
      chrome.storage.sync.set({notes: swift.notes}, function(){
        $mdToast.show(
              $mdToast.simple()
                .content('Note deleted')
                .hideDelay(1000)
            );
      });
    };
  });
})();