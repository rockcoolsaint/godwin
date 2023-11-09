/* eslint-disable react/jsx-no-bind */
'use client'

import { useState } from 'react'
import Icon from 'src/core/components/Icon'
import Dropdown from 'src/core/components/Dropdown'
import { useAccountContext } from 'src/providers/AccountProvider'
import Link from 'src/components/shared/Link'
import { UserCircleIcon } from '@heroicons/react/24/outline'

export default function Authorized() {
  const { account, authCode, isLoading, logout } = useAccountContext()

  const [dropdownActive, setDropdownActive] = useState<boolean>(false)

  return (
    <div className="ml-4 flex items-center justify-end">
      {!isLoading && account && (
        <div className="flex items-center ">
          <Link href="/account/general" className="mr-4 text-sm font-normal text-dark-300 hover:text-primary">
            View my account
          </Link>
          <span className="cursor-pointer text-sm text-dark-300" id="accountDropdown" onClick={() => setDropdownActive(true)}>
            <UserCircleIcon className="h-8 w-8" />
          </span>
          <Dropdown
            target="accountDropdown"
            active={dropdownActive}
            onClose={() => setDropdownActive(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Dropdown.Item href="/account/general" className="px-6">
              <span className="py-4 text-sm text-blue-500">{account.email}</span>
            </Dropdown.Item>
            {(account.type === 'seller' || account.is_staff) && (
              <Dropdown.Item
                className="px-6"
                onClick={() => window.open(`https://portal.rigly.io/login/callback?email=${account.email}&code=${authCode}`, '_blank')}
              >
                <Icon icon="hardDrive" className="h-3 w-3 text-gray-600" />
                <span className="py-4 text-sm text-gray-600">Seller Portal</span>
              </Dropdown.Item>
            )}
            <Dropdown.Item className="px-6" onClick={logout}>
              <Icon icon="arrowRightFromBracket" className="h-3 w-3 text-gray-600" />
              <span className="py-4 text-sm text-gray-600">Sign out</span>
            </Dropdown.Item>
          </Dropdown>
        </div>
      )}
    </div>
  )
}
