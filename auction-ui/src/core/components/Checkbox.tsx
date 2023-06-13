import { useState } from 'react'

export default function Checkbox({
  name,
  defaultValue,
  onChange,
}: {
  name: string
  defaultValue: boolean
  onChange?: (val: boolean) => void
}) {
  const [checked, setChecked] = useState<boolean>(defaultValue)

  const handleChange = (e: any) => {
    setChecked(e.target.checked)
    if (typeof onChange === 'function') {
      onChange(e.target.checked)
    }
  }

  return <input className="outline-none" type="checkbox" id={name} name={name} checked={checked} onChange={handleChange} />
}
