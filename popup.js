document.getElementById('getLink').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const currentTabId = tabs[0].id;

    chrome.scripting.executeScript({
      target: {tabId: currentTabId},
      files: ['content.js']
    }, () => {
      // After ensuring the content script is loaded, send the message
      chrome.tabs.sendMessage(currentTabId, 'getLink', (link) => {
        // Check if the link is received
        if (link) {
          // Create an anchor element
          var a = document.createElement('a');
          // Set the href attribute to the received link
          a.href = link;
          // Set the link text
          a.textContent = "Click Here to Edit";
          // Optionally, open the link in a new tab when clicked
          a.target = "_blank";

          // Get the paragraph element where the link should be displayed
          var p = document.getElementById('link');
          // Clear previous content
          p.innerHTML = '';
          // Append the anchor element to the paragraph
          p.appendChild(a);
        } else {
          // If no link is found, display a message
          document.getElementById('link').textContent = 'No link found.';
        }
      });
    });
  });
});
