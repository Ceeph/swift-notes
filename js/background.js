chrome.runtime.onInstalled.addListener(function(details){
	alert("hi");
	chrome.commands.onCommand.addListener(function(command) {
	   alert(command);
	});
});

