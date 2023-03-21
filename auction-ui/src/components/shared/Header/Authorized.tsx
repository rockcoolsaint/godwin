/* eslint-disable react/jsx-no-bind */
'use client'

import { useAuth0 } from '@auth0/auth0-react'
import { useAccount } from 'src/hooks'

export default function Authorized() {
  const { account } = useAccount()
  const { logout } = useAuth0()

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: process.env.NEXT_PUBLIC_AUTH0_LOGOUT_REDIRECT_URL } })
  }

  return (
    <div className="ml-4 flex flex-col items-end">
      {account && (
        <>
          <span className="text-sm">
            Logged in as <b className="text-blue-400">{account.nickname}</b>
          </span>

          <span onClick={handleLogout} className="cursor-pointer text-xs hover:text-blue-500">
            Sign out
          </span>
        </>
      )}
    </div>
  )
}
