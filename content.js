function findShortlink() {
  const shortlinkElement = document.querySelector('link[rel="shortlink"]');
  if (shortlinkElement) {
    const url = new URL(shortlinkElement.href);
    const id = url.searchParams.get('p');
    return `https://bodytec.co.za/wp-admin/post.php?post=${id}&action=edit`;
  }
  return null;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'getLink') {
    const link = findShortlink();
    sendResponse(link);
  }
});