/* eslint-disable react/jsx-no-bind */
'use client'

import { useState } from 'react'
import Icon from 'src/core/components/Icon'
import Dropdown from 'src/core/components/Dropdown'
import { useAccountContext } from 'src/providers/AccountProvider'

export default function Authorized() {
  const { account, isLoading, logout } = useAccountContext()

  const [dropdownActive, setDropdownActive] = useState<boolean>(false)

  return (
    <div className="ml-4 flex items-center justify-end">
      {!isLoading && account && (
        <>
          <span
            className="cursor-pointer text-sm font-bold text-blue-500 hover:text-blue-700"
            id="accountDropdown"
            onClick={() => setDropdownActive(true)}
          >
            {account.email}
          </span>

          <Dropdown
            target="accountDropdown"
            active={dropdownActive}
            onClose={() => setDropdownActive(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Dropdown.Item className="h-8 px-3" href="/account">
              <Icon icon="user" className="h-3 w-3 text-gray-600" />
              <span className="text-sm text-gray-600">Account</span>
            </Dropdown.Item>

            <Dropdown.Item className="h-8 px-3" href="/account/preferences">
              <Icon icon="cog" className="h-3 w-3 text-gray-600" />
              <span className="text-sm text-gray-600">Preferences</span>
            </Dropdown.Item>

            {/* <Dropdown.Item className='h-8 px-3' href="/account/hashrate">
              <Icon icon="helmetSafety" className="h-3 w-3 text-gray-600" />
              <span className="text-sm text-gray-600">Hashrate</span>
            </Dropdown.Item> */}

            <Dropdown.Item className="h-8 px-3" href="/account/orders">
              <Icon icon="cart" className="h-3 w-3 text-gray-600" />
              <span className="text-sm text-gray-600">Orders</span>
            </Dropdown.Item>

            <Dropdown.Seperator />

            <Dropdown.Item className="h-8 px-3" onClick={logout}>
              <Icon icon="arrowRightFromBracket" className="h-3 w-3 text-gray-600" />
              <span className="text-sm text-gray-600">Sign out</span>
            </Dropdown.Item>
          </Dropdown>
        </>
      )}
    </div>
  )
}
