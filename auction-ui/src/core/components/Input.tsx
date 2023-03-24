/* eslint-disable react/jsx-no-bind */
import clsx from 'clsx'

interface InputProps {
  className?: string
  type: string
  name: string
  placeholder?: string
  required?: boolean
  onChange?: (val: string | number) => void
  onInput?: (val: string | number) => void
  value?: string | number
  defaultValue?: string
}

function Input(props: InputProps) {
  const { onChange, onInput, className, name } = props

  const handleChange = (e: any) => {
    if (typeof onChange === 'function') {
      onChange(e.target.value)
    }
  }

  const handleInput = (e: any) => {
    if (typeof onInput === 'function') {
      onInput(e.target.value)
    }
  }

  return (
    <input
      {...props}
      id={name}
      className={clsx(className, 'mb-0 flex h-12 items-center justify-center rounded-lg border border-gray-300 px-5 outline-none')}
      onChange={handleChange}
      onInput={handleInput}
    />
  )
}

export default Input
