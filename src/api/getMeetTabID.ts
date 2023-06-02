const getMeetTabID = () =>
  new Promise<number | undefined>((resolve) => {
    chrome.tabs.query({ url: '*://meet.google.com/*' }, (result) => {
      return resolve(result?.[0]?.id)
    })
  })

export default getMeetTabID
