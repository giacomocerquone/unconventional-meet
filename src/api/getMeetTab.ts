const getMeetTab = () =>
  new Promise<chrome.tabs.Tab[]>((resolve) => {
    chrome.tabs.query({ url: '*://meet.google.com/*' }, (result) => resolve(result))
  })

export default getMeetTab
