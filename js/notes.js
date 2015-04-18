(function() {
  var app = angular.module('notes', ['ngMaterial'])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('light-blue')
      .accentPalette('amber');
  });

  app.config( function ($compileProvider) {
     $compileProvider.aHrefSanitizationWhitelist (/^\s*(https?|ftp|mailto|file|tel|chrome-extension):/);
  });

  app.controller('SwiftController', function($scope, $mdToast){
    var swift = this;

    swift.notes = [];
    swift.newNote = {};
    swift.shownew = true;

    chrome.storage.sync.get('notes', function (result) {
      if (result.notes) {
        swift.notes = result.notes;
      }
    });

    document.addEventListener("keydown", function(e) {
      if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        e.preventDefault();
        swift.addNote();
      }
    }, false);

    swift.showToast = function (text) {
      $mdToast.show(
        $mdToast.simple()
          .content(text)
          .hideDelay(1000)
      );
    };

    swift.getRandomColor = function() {
      colors = [
        '#F44336',
        '#E91E63',
        '#9C27B0',
        //'#673AB7',
        '#3F51B5',
        '#2196F3',
        //'#03A9F4',
        '#00BCD4',
        '#009688',
        '#4CAF50',
        //'#8BC34A',
        '#CDDC39',
        //'#FFEB3B',
        '#FFC107',
        '#FF9800',
        '#FF5722',
        '#9E9E9E'
      ];
      return colors[Math.floor(Math.random()*colors.length)];
    }

    swift.addNote = function(){
      var matches = window.location.href.match(/#([^ ]*)/);
      var domain = matches && matches[1];
      swift.newNote.location = domain;
      swift.newNote.date = Date.now();
      swift.newNote.color = swift.getRandomColor();
      swift.notes.push(swift.newNote);

      chrome.storage.sync.set({notes: swift.notes}, function(){
        swift.showToast('Note added');
        swift.newNote = {};
        swift.shownew = false;
      });
    };

    swift.deleteNote = function(index) {
      swift.notes.splice(index,1);
      chrome.storage.sync.set({notes: swift.notes}, function(){
        swift.showToast('Note deleted');
      });
    };
  });
})();