import { chromeStorageKey, joinButtonClass } from '../constants'
import { SettingsFormValues } from '../popup/Popup'

const getJoinButton = () => document.getElementsByClassName(joinButtonClass)[0] as HTMLElement

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

const clickJoinbutton = () => {
  let counter = 0

  // After clicking we don't clear the interval
  // because sometimes clicking the button the first time, doesn't work
  const intervalID = setInterval(() => {
    const joinButton = getJoinButton()
    if (joinButton) {
      joinButton.click()
    }
    counter++
    if (counter >= 5) {
      clearInterval(intervalID)
    }
  }, 1000)
}

const settingsManager = (settings: SettingsFormValues | undefined) => {
  if (settings?.confirmExit) {
    window.addEventListener('beforeunload', unloadHandler, true)
  } else {
    window.removeEventListener('beforeunload', unloadHandler, true)
  }

  if (settings?.autoJoin) {
    clickJoinbutton()
  }
}

chrome.storage.onChanged.addListener((changes) => {
  const newSettings = changes[chromeStorageKey]?.newValue as SettingsFormValues | undefined
  settingsManager(newSettings)
})

chrome.storage.sync.get(chromeStorageKey, (data) => {
  const settings = data[chromeStorageKey] as SettingsFormValues
  settingsManager(settings)
})

export {}
