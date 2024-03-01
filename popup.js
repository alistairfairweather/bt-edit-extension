document.getElementById('getLink').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const currentTabId = tabs[0].id;

    // Optionally inject your content script if it's not already injected
    chrome.scripting.executeScript({
      target: {tabId: currentTabId},
      files: ['content.js']
    }, () => {
      // After ensuring the content script is loaded, send the message
      chrome.tabs.sendMessage(currentTabId, 'getLink', (link) => {
        document.getElementById('link').textContent = link || 'No link found.';
      });
    });
  });
});