// popup.js
document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get("behavior", ({ behavior }) => {
    if (behavior === "direct") {
      chrome.tabs.create({url: "https://safe.fdai.earth/app/public/#/app/reminders-inbox"});
    } else {
      // Assuming you have a button setup as previously described
      document.getElementById('recordButton').addEventListener('click', function() {
        var redirectUrl = "https://safe.fdai.earth/app/public/#/app/reminders-inbox";
        chrome.tabs.create({url: redirectUrl}, function() {
          window.close(); // Close the popup window
        });
      });
    }
  });
  document.getElementById('amazonBtn').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        function: extractAndSaveAmazon
      });
    });
  });

});

