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
  onBlur?: (val: string | number) => void
  value?: string | number
  min?: string
  step?: string
  max?: string
  defaultValue?: string
  errors?: string[]
}

function Input(props: InputProps) {
  const { onChange, onInput, onBlur, className, name, errors } = props

  const handleChange = (e: any) => {
    if (typeof onChange === 'function') {
      onChange(e.target.value)
    }
  }

  const handleBlur = (e: any) => {
    if (typeof onBlur === 'function') {
      onBlur(e.target.value)
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
      className={clsx(className, 'mb-0 flex h-12 items-center justify-center rounded-lg border border-gray-300 px-5 outline-none', {
        'border border-red-500': errors && errors.length > 0,
      })}
      onChange={handleChange}
      onInput={handleInput}
      onBlur={handleBlur}
    />
  )
}

export default Input
