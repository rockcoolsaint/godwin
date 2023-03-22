/* eslint-disable react/jsx-no-bind */
'use client'

import { useAuth0 } from '@auth0/auth0-react'
import { useAccountContext } from 'src/providers/AccountProvider'

export default function Authorized() {
  const { account, loading } = useAccountContext()
  const { logout } = useAuth0()

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: process.env.NEXT_PUBLIC_AUTH0_LOGOUT_REDIRECT_URL } })
  }

  return (
    <div className="ml-4 flex flex-col items-end">
      {!loading && account && (
        <>
          <span className="text-sm">
            <b className="text-blue-400">{account.email}</b>
          </span>

          <span onClick={handleLogout} className="cursor-pointer whitespace-nowrap text-xs hover:text-blue-500">
            Sign out
          </span>
        </>
      )}
    </div>
  )
}
