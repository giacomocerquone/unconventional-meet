import React, { FunctionComponent, useEffect, useState } from 'react'
import { get, set } from '../api/storage'

const styles = {
  root: { flex: 1, maxWidth: '20rem' },
  rowLabel: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
  },
  checkbox: { height: '1rem', width: '1rem' },
  name: { fontWeight: 'normal', marginBottom: '.5rem', marginTop: '.5rem', fontSize: '1rem' },
} as const

const Row: FunctionComponent<RowProps> = ({ label, value, name, onChange }) => {
  return (
    <label style={styles.rowLabel}>
      <p style={styles.name}>{label}</p>
      <input
        name={name}
        type="checkbox"
        style={styles.checkbox}
        onChange={onChange}
        checked={value}
      />
    </label>
  )
}

const SettingsList = () => {
  const [form, setForm] = useState(initialForm)

  useEffect(() => {
    const start = async () => {
      const res = (await get('form')) as { form: Form }
      if (res.form) {
        setForm(res.form)
      }
    }

    start()
  }, [])

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    setForm((state) => {
      const newState = { ...state, [evt.target.name]: evt.target.checked }
      set('form', newState)

      return newState
    })
  }

  return (
    <div style={styles.root}>
      <Row label="Auto join meetings" name="autoJoin" value={form.autoJoin} onChange={onChange} />
      <Row
        label="Ask for confirmation before exit"
        name="confirmExit"
        value={form.confirmExit}
        onChange={onChange}
      />
      <Row
        label="Disable your video for performance"
        name="disableVideo"
        value={form.disableVideo}
        onChange={onChange}
      />
      <Row
        label="Focus meet tab on extension click"
        name="focusTab"
        value={form.focusTab}
        onChange={onChange}
      />
    </div>
  )
}

export default SettingsList

const initialForm = {
  autoJoin: false,
  confirmExit: false,
  disableVideo: false,
  focusTab: false,
}

interface RowProps {
  label: string
  value?: boolean
  name: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

interface Form {
  focusTab: boolean
  confirmExit: boolean
  disableVideo: boolean
  autoJoin: boolean
}
