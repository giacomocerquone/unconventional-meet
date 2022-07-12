import { useEffect } from 'react'
import getMeetTab from '../api/getMeetTab'
import SettingsList from '../components/SettingsList'
import './Popup.css'

function App() {
  useEffect(() => {
    const start = async () => {
      const res = await getMeetTab()

      if (res?.[0]?.id) {
        chrome.tabs.update(res[0].id, {
          active: true,
        })
      }
    }

    start()
  }, [])

  return (
    <main>
      <h3 style={{ marginBottom: '0.5rem' }}>Better meet</h3>
      <a href="https://giacomocerquone.com" target="_blank" rel="noopener noreferrer">
        Made in 🇮🇹 with ❤️ by g.cerquone
      </a>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '.5rem' }}>
        <SettingsList />
      </div>

      <h6>v 0.0.1</h6>
    </main>
  )
}

export default App
