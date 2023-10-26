/* eslint-disable react/jsx-no-bind */
'use client'

import clsx from 'clsx'
import { useState } from 'react'
import Dropdown from './Dropdown'
import Icon from './Icon'

interface SelectOption {
  value: string
  icon?: string
  label: string
}

export default function Select({
  className,
  options,
  value,
  onChange,
}: {
  className?: string
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
}) {
  const [dropdownActive, setDropdownActive] = useState<boolean>(false)
  const [_value, setValue] = useState<SelectOption | undefined>(() => {
    return options.find(option => option.value === value)
  })

  const handleSelect = (option: SelectOption) => {
    setValue(option)

    if (typeof onChange === 'function') {
      onChange(option.value)
    }
  }

  return (
    <div className={clsx('w-full', className)}>
      <div
        className="flex h-12 w-full cursor-pointer items-center justify-between rounded-lg border border-gray-300 px-4 text-sm font-bold"
        id="accountSettingsDropdown"
        onClick={() => setDropdownActive(true)}
      >
        {_value && (
          <div className="flex items-center justify-start gap-4">
            {_value.icon && <Icon icon={_value.icon} className="h-3 w-3 text-gray-600" />}
            <span className="text-sm text-gray-600">{_value.label}</span>
          </div>
        )}

        <Icon
          icon="chevronDown"
          className={clsx('h-3 w-3 text-gray-600 transition-transform', {
            'rotate-180': dropdownActive,
          })}
        />
      </div>

      <Dropdown
        className="w-full"
        target="accountSettingsDropdown"
        active={dropdownActive}
        onClose={() => setDropdownActive(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        matchWidth
      >
        {options.map((option, i) => {
          return (
            <Dropdown.Item key={i} onClick={() => handleSelect(option)} className="h-12 px-4">
              {option.icon && <Icon icon={option.icon} className="h-3 w-3 text-gray-600" />}
              <span className="text-sm text-gray-600">{option.label}</span>
            </Dropdown.Item>
          )
        })}
      </Dropdown>
    </div>
  )
}
