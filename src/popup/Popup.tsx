import { useEffect } from 'react'
import getMeetTabID from '../api/getMeetTabID'
import SettingsList from '../components/SettingsList'
import './Popup.css'
import useSettings from '../hooks/useSettings'

const styles = {
  title: { marginBottom: '0.5rem' },
  settingsContainer: { display: 'flex' },
} as const

function App() {
  const { settingsState, storedSettingsLoadingStatus } = useSettings()

  const [settings] = settingsState

  useEffect(() => {
    const start = async () => {
      if (settings.focusTab) {
        const tabId = await getMeetTabID()

        if (tabId) {
          chrome.tabs.update(tabId, {
            active: true,
          })
        }
      }
    }

    if (storedSettingsLoadingStatus === 'loaded') {
      start()
    }
  }, [storedSettingsLoadingStatus])

  return (
    <main>
      <h3 style={styles.title}>Beyond Meet</h3>
      <a href="https://giacomocerquone.com" target="_blank" rel="noopener noreferrer">
        Made in 🇮🇹 with ❤️ by g.cerquone
      </a>

      <div style={styles.settingsContainer}>
        <SettingsList settingsState={settingsState} />
      </div>

      <h6>v 0.0.1</h6>
    </main>
  )
}

export default App

export interface SettingsFormValues {
  focusTab: boolean
  confirmExit: boolean
  disableVideo: boolean
  autoJoin: boolean
}
