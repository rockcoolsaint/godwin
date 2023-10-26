/* eslint-disable react/jsx-no-bind */
'use client'
import clsx from 'clsx'
import React, { useState } from 'react'

function Tabs({
  className,
  children,
  value,
  onChange,
}: {
  className?: string
  children?: React.ReactNode
  value: any
  onChange: (val: any) => void
}) {
  const [_value, _setValue] = useState(value)

  const handleChange = (val: any) => {
    _setValue(val)
    onChange(val)
  }

  return (
    <div className={clsx(className, 'flex h-10 w-full overflow-hidden rounded-lg border border-gray-300')}>
      {React.Children.map(children, (Child: any) => {
        return React.cloneElement(Child, { tabContext: { currentValue: _value, setValue: handleChange } })
      })}
    </div>
  )
}

Tabs.Tab = function Tab({
  className,
  children,
  tabContext,
  value,
}: {
  className?: string
  children?: React.ReactNode
  tabContext?: { currentValue: any; setValue: (val: any) => void }
  value: any
}) {
  const handleClick = () => {
    tabContext?.setValue(value)
  }

  return (
    <button
      type="button"
      className={clsx(className, 'w-full border-r border-gray-300 last-of-type:border-r-0', {
        'bg-gradient text-white': tabContext?.currentValue === value,
      })}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}

export default Tabs
