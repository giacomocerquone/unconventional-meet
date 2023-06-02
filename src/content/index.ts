import { chromeStorageKey } from '../constants'

const unloadHandler = (event: BeforeUnloadEvent) => {
  if (document.querySelector('video')) {
    // event.preventDefault() unsupported on chrome
    event.stopImmediatePropagation()
    event.stopPropagation()
    event.returnValue = 'Are you sure you want to leave?'
  } else {
    return
  }
}

chrome.storage.onChanged.addListener((changes) => {
  if (changes[chromeStorageKey]?.newValue?.confirmExit) {
    window.addEventListener('beforeunload', unloadHandler, true)
  } else {
    window.removeEventListener('beforeunload', unloadHandler, true)
  }
})

chrome.storage.sync.get(chromeStorageKey, (data) => {
  if (data[chromeStorageKey].confirmExit) {
    window.addEventListener('beforeunload', unloadHandler, true)
  }
})

export {}
