/* eslint-disable react/jsx-no-bind */
import clsx from 'clsx'

interface InputProps {
  className?: string
  type: string
  name: string
  placeholder?: string
  required?: boolean
  onChange?: (val: string) => void
  value?: string
  defaultValue?: string
}

function Input(props: InputProps) {
  const { onChange, className, name } = props

  const handleChange = (e: any) => {
    if (typeof onChange === 'function') {
      onChange(e.target.value)
    }
  }

  return (
    <input
      {...props}
      id={name}
      className={clsx(className, 'mb-0 flex h-12 items-center justify-center rounded-lg border border-gray-300 px-5 outline-none')}
      onChange={handleChange}
    />
  )
}

export default Input
