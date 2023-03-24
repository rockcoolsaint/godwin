'use client'

import React, { useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Account } from 'src/types'
import { getAccount } from 'src/api/auth/getAccount'
import { usePathname, useRouter } from 'next/navigation'

interface AccountContextType {
  account?: Account
  token?: string
  loading: boolean
}

const AccountContext = React.createContext<AccountContextType>({ loading: true })

export const useAccountContext = () => useContext(AccountContext)

export default function AccountProvider({ children }: { children: React.ReactNode }) {
  const { getIdTokenClaims } = useAuth0()
  const pathName = usePathname()
  const router = useRouter()

  const [token, setToken] = useState<string | undefined>(undefined)
  const [account, setAccount] = useState<Account | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const authorize = async () => {
      try {
        const claims = await getIdTokenClaims()
        if (claims) {
          const token = claims.__raw
          try {
            const account = await getAccount(token)
            setToken(token)
            setAccount(account)

            setLoading(false)
          } catch (ex: any) {
            throw ex
          }
        } else {
          throw new Error(`Couldn't get account claims`)
        }
      } catch (ex) {
        // console.error(ex)
        setLoading(false)
      }
    }

    authorize()
  }, [getIdTokenClaims, pathName, router])

  return <AccountContext.Provider value={{ account, token, loading }}>{children}</AccountContext.Provider>
}
