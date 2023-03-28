/* eslint-disable react/jsx-no-bind */
'use client'

import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import { useAccountContext } from 'src/providers/AccountProvider'
import Icon from 'src/core/components/Icon'
import Dropdown from 'src/core/components/Dropdown'

export default function Authorized() {
  const { account, loading } = useAccountContext()
  const { logout } = useAuth0()

  const [dropdownActive, setDropdownActive] = useState<boolean>(false)

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: process.env.NEXT_PUBLIC_AUTH0_LOGOUT_REDIRECT_URL } })
  }

  return (
    <div className="ml-4 flex items-center justify-end">
      {!loading && account && (
        <>
          <span
            className="cursor-pointer text-sm font-bold text-blue-500 hover:text-blue-700"
            id="accountDropdown"
            onClick={() => setDropdownActive(true)}
          >
            {account.email}
          </span>

          <Dropdown target="accountDropdown" active={dropdownActive} onClose={() => setDropdownActive(false)}>
            <Dropdown.Item href="/account">
              <Icon icon="user" className="h-3 w-3 text-gray-600" />
              <span className="text-sm text-gray-600">Account</span>
            </Dropdown.Item>

            <Dropdown.Item href="/account/orders">
              <Icon icon="cart" className="h-3 w-3 text-gray-600" />
              <span className="text-sm text-gray-600">Orders</span>
            </Dropdown.Item>

            <Dropdown.Seperator />

            <Dropdown.Item onClick={handleLogout}>
              <Icon icon="arrowRightFromBracket" className="h-3 w-3 text-gray-600" />
              <span className="text-sm text-gray-600">Sign out</span>
            </Dropdown.Item>
          </Dropdown>
        </>
      )}
    </div>
  )
}
