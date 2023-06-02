import { useEffect, useState } from 'react'
import { get } from '../api/storage'
import { SettingsFormValues } from '../popup/Popup'
import { chromeStorageKey } from '../constants'

const useSettings = () => {
  const [storedSettingsLoadingStatus, setStoredSettingsLoadingStatus] = useState<
    'idle' | 'loading' | 'loaded' | 'errored'
  >('idle')
  const settingsState = useState(settingsFormInitialValues)
  const [, setSettings] = settingsState

  useEffect(() => {
    const start = async () => {
      try {
        setStoredSettingsLoadingStatus('loading')
        const res = (await get(chromeStorageKey)) as { settingsForm: SettingsFormValues }
        if (res?.settingsForm) {
          setSettings(res.settingsForm)
        }
        setStoredSettingsLoadingStatus('loaded')
      } catch (e) {
        setStoredSettingsLoadingStatus('errored')
      }
    }

    start()
  }, [])

  return {
    settingsState,
    storedSettingsLoadingStatus,
  }
}

export default useSettings

const settingsFormInitialValues = {
  autoJoin: false,
  confirmExit: false,
  disableVideo: false,
  focusTab: false,
}
