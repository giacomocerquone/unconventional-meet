import React from 'react'
import { set } from '../api/storage'
import Row from './Row'
import { SettingsFormValues } from '../popup/Popup'
import { chromeStorageKey } from '../constants'

const styles = {
  root: { flex: 1, maxWidth: '20rem', margin: 'auto' },
} as const

const SettingsForm = ({ settingsState: [settings, setSettings] }: Props) => {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    setSettings((state) => {
      try {
        const newState = { ...state, [evt.target.name]: evt.target.checked }
        set(chromeStorageKey, newState)

        return newState
      } catch (e) {
        return state
      }
    })
  }

  return (
    <div style={styles.root}>
      <Row
        label="Auto join meetings"
        name="autoJoin"
        value={settings.autoJoin}
        onChange={onChange}
      />
      {settings.autoJoin && (
        <>
          <Row
            label=""
            description="Turn off Camera while auto joining"
            name="joinBlind"
            value={settings.joinBlind}
            onChange={onChange}
          />
          <Row
            label=""
            description="Mute while auto joining"
            name="joinMuted"
            value={settings.joinMuted}
            onChange={onChange}
          />
        </>
      )}
      <Row
        label="Ask for confirmation before exit"
        description="Restart chrome after enabling this setting"
        name="confirmExit"
        value={settings.confirmExit}
        onChange={onChange}
      />
      {/* <Row
        label="Improve performance hiding your video"
        name="disableVideo"
        value={settings.disableVideo}
        onChange={onChange}
      /> */}
      <Row
        label="Focus meet tab on extension click"
        name="focusTab"
        value={settings.focusTab}
        onChange={onChange}
      />
    </div>
  )
}

export default SettingsForm

interface Props {
  settingsState: [SettingsFormValues, React.Dispatch<React.SetStateAction<SettingsFormValues>>]
}
