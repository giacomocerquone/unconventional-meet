import { chromeStorageKey, joinButtonClass } from '../constants'
import { SettingsFormValues } from '../popup/Popup'

const getJoinButton = () => document.getElementsByClassName(joinButtonClass)[0] as HTMLElement

const getCameraButton = (): HTMLElement | undefined => {
  const elements = document.querySelectorAll('[aria-label]')
  let cameraElement: HTMLElement | undefined = undefined
  elements.forEach((element) => {
    if (element.ariaLabel?.includes('camera') && element.ariaLabel.startsWith('Turn')) {
      cameraElement = element as HTMLElement
    }
  })

  return cameraElement
}

const getMicrophoneButton = (): HTMLElement | undefined => {
  const elements = document.querySelectorAll('[aria-label]')
  let micElement: HTMLElement | undefined = undefined
  elements.forEach((element) => {
    if (element.ariaLabel?.includes('microphone') && element.ariaLabel.startsWith('Turn')) {
      micElement = element as HTMLElement
    }
  })

  return micElement
}

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

const turnOffCamera = () => {
  const cameraBtn = getCameraButton()
  if (cameraBtn && cameraBtn.ariaLabel?.includes('off')) {
    cameraBtn.click()
    // return if the button was clicked or not
    return cameraBtn.ariaLabel.includes('on')
  }
  return false
}

const turnOffMic = () => {
  const micBtn = getMicrophoneButton()
  if (micBtn && micBtn.ariaLabel?.includes('off')) {
    micBtn.click()
    // return if the button was clicked or not
    return micBtn.ariaLabel.includes('on')
  }
  return false
}

type JoinOptions = {
  blind: boolean
  muted: boolean
}

const clickJoinbutton = ({ blind, muted }: JoinOptions) => {
  let counter = 0
  let isMuted = false
  let isCameraOff = false

  // After clicking we don't clear the interval
  // because sometimes clicking the button the first time, doesn't work
  const intervalID = setInterval(() => {
    if (blind && !isCameraOff) {
      isCameraOff = turnOffCamera()
    }
    if (muted && !isMuted) {
      isMuted = turnOffMic()
    }

    const canJoin = blind === isCameraOff && muted === isMuted

    if (canJoin) {
      const joinButton = getJoinButton()
      if (joinButton) {
        joinButton.click()
      }
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
    clickJoinbutton({
      blind: settings?.joinBlind,
      muted: settings?.joinMuted,
    })
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
