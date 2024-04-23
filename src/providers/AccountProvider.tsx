/* eslint-disable @typescript-eslint/no-empty-function */
'use client'

import React, { useContext, useEffect, useState } from 'react'
import { getAccount } from 'src/api/auth/getAccount'
import { redirect, usePathname, useRouter } from 'next/navigation'
import { getToken } from 'src/api/auth/getToken'
import { Account, AccountType } from 'src/api/auction/types'
import { login as doLogin } from 'src/api/auth/login'
import { LocalStorageKeys } from 'src/constants/localStorage'

interface AccountContextType {
  account?: Account
  token?: string
  authCode?: string
  isLoading: boolean
  login: (email: string, returnUrl?: string, code?: string) => Promise<[boolean, string | undefined]>
  logout: () => void
  refresh: () => void
}

const AccountContext = React.createContext<AccountContextType>({
  isLoading: true,
  login: (_email: string, _returnUrl?: string, _code?: string) => Promise.resolve([false, undefined]),
  logout: () => {},
  refresh: () => {},
})

export const useAccountContext = () => useContext(AccountContext)

export default function AccountProvider({ children }: { children: React.ReactNode }) {
  const pathName = usePathname()
  const router = useRouter()

  const [token, setToken] = useState<string | undefined>(undefined)
  const [authCode, setAuthCode] = useState<string | undefined>(undefined)
  const [account, setAccount] = useState<Account | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const login = async (email: string, returnUrl?: string, code?: string) => {
    return doLogin(email, returnUrl, code)
  }

  const logout = () => {
    localStorage.removeItem(LocalStorageKeys.Auth.riglyToken)
    localStorage.removeItem(LocalStorageKeys.Account.accountType)
    setAccount(undefined)
    setToken(undefined)
    redirect('/')
  }

  const refresh = async () => {
    const token = localStorage.getItem(LocalStorageKeys.Auth.riglyToken)
    if (token) {
      const account = await getAccount(token)
      setAccount(account)
    }
  }

  useEffect(() => {
    if (pathName === '/login/callback') {
      const authorizeAfterCallback = async () => {
        try {
          setIsLoading(true)

          const params: any = new Proxy(new URLSearchParams(location.search), {
            get: (searchParams, prop: string) => searchParams.get(prop),
          })

          const token = await getToken(params.email, params.code)
          localStorage.setItem(LocalStorageKeys.Auth.riglyToken, token)
          const account = await getAccount(token)
          account.type = account.email === 'seller@rigly.io' ? AccountType.Seller : AccountType.Buyer
          setToken(token)
          setAuthCode(params.code)
          setAccount(account)
          localStorage.setItem(LocalStorageKeys.Account.accountType, JSON.stringify(account.is_demo))

          if (params.return_url) {
            const returnUrl = decodeURIComponent(params.return_url)

            return router.replace(returnUrl)
          }

          router.replace('/')
        } catch (ex) {
          console.error(ex)
          localStorage.removeItem(LocalStorageKeys.Auth.riglyToken)
          router.replace('/login')
        } finally {
          setIsLoading(false)
        }
      }
      authorizeAfterCallback()
    } else {
      const authorize = async () => {
        // TODO: Implement refresh token logic instead of just accepting the account if it exists in state.

        // TODO: The code below interferes with some of our token logic according to @Jeezman so for now we disable it.
        if (account) {
          return
        }

        try {
          setIsLoading(true)

          const token = window.localStorage.getItem(LocalStorageKeys.Auth.riglyToken)

          if (token) {
            const account = await getAccount(token)
            account.type = account.email === 'seller@rigly.io' ? AccountType.Seller : AccountType.Buyer
            setAccount(account)
            setToken(token)
            setAuthCode(account.auth_code)
          }
        } catch (ex) {
          console.error(ex)
          window.localStorage.removeItem(LocalStorageKeys.Auth.riglyToken)
        } finally {
          setIsLoading(false)
        }
      }
      authorize()
    }
  }, [pathName, router, account])

  return (
    <AccountContext.Provider value={{ account, token, authCode, isLoading, login, logout, refresh }}>{children}</AccountContext.Provider>
  )
}
