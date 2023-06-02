import React from 'react'

const styles = {
  rowLabel: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    margin: '.5rem 0',
  },
  checkbox: { height: '1rem', width: '1rem' },
  label: { fontWeight: 'normal', margin: 0, fontSize: '1rem' },
  description: { fontWeight: 'normal', margin: 0, fontSize: '.7rem', padding: 0 },
} as const

const Row = ({ label, value, name, onChange, description }: Props) => {
  return (
    <label style={styles.rowLabel}>
      <p style={styles.label}>
        {label}
        {description && <p style={styles.description}>{description}</p>}
      </p>
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

export default Row

interface Props {
  label: string
  value?: boolean
  name: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  description?: string
}
