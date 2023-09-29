/* eslint-disable react/jsx-no-bind */
'use client'

import { useState } from 'react'
import Icon from 'src/core/components/Icon'
import Dropdown from 'src/core/components/Dropdown'
import { useAccountContext } from 'src/providers/AccountProvider'
import Link from 'src/components/shared/Link'

export default function Authorized() {
  const { account, isLoading, logout } = useAccountContext()

  const [dropdownActive, setDropdownActive] = useState<boolean>(false)

  return (
    <div className="ml-4 flex items-center justify-end">
      {!isLoading && account && (
        <div className="flex items-center ">
          <Link href="/account/general" className="mr-4 text-sm font-normal text-dark-300 hover:text-primary">
            Account
          </Link>
          <Link href="/account/orders" className="mr-4 text-sm font-normal text-dark-300 hover:text-primary">
            Orders
          </Link>
          <Link href="/account/hashrate" className="mr-4 text-sm font-normal text-dark-300 hover:text-primary">
            Hashrate
          </Link>
          <Link href="/account/preferences" className="mr-4 text-sm font-normal text-dark-300 hover:text-primary">
            Notifications
          </Link>
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
            <Dropdown.Item className="h-8 px-3" onClick={logout}>
              <Icon icon="arrowRightFromBracket" className="h-3 w-3 text-gray-600" />
              <span className="text-sm text-gray-600">Sign out</span>
            </Dropdown.Item>
          </Dropdown>
        </div>
      )}
    </div>
  )
}
