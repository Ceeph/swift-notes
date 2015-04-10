var iframe  = document.createElement ("iframe");
iframe.src  = chrome.extension.getURL ("../sidebar.html");
(document.head||document.documentElement).append(iframe);