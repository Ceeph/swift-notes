chrome.runtime.onInstalled.addListener(function(object details){

	alert("hi");
	chrome.commands.onCommand.addListener(function(string command) {
	   console.log('Command:', command);
	   alert(command);
	});
});

