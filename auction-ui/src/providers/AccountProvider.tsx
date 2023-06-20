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
  const [account, setAccount] = useState<Account | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const login = async (email: string, returnUrl?: string, code?: string) => {
    return doLogin(email, returnUrl, code)
  }

  const logout = () => {
    window.localStorage.removeItem('rigly_token')

    setAccount(undefined)
    setToken(undefined)

    redirect('/')
  }

  const refresh = async () => {
    const token = window.localStorage.getItem('rigly_token')
    if (token) {
      const account = await getAccount(token)
      setAccount(account)
    }
  }

  useEffect(() => {
    if (pathName === '/login/callback') {
      const authorize = async () => {
        try {
          setIsLoading(true)

          const params: any = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop: string) => searchParams.get(prop),
          })

          const token = await getToken(params.email, params.code)
          window.localStorage.setItem('rigly_token', token)
          setToken(token)

          const account = await getAccount(token)
          account.type = account.email === 'seller@rigly.io' ? AccountType.Seller : AccountType.Buyer
          setAccount(account)
          localStorage.setItem(LocalStorageKeys.Account.accountType, JSON.stringify(account.is_demo))

          if (params.return_url) {
            const returnUrl = decodeURIComponent(params.return_url)

            return router.replace(returnUrl)
          }

          // window.history.pushState({}, document.title, window.location.pathname)
          router.replace('/')
        } catch (ex) {
          console.error(ex)
          window.localStorage.removeItem('rigly_token')
          router.replace('/login')
        } finally {
          setIsLoading(false)
        }
      }

      authorize()
    } else {
      const authorize = async () => {
        try {
          setIsLoading(true)

          const token = window.localStorage.getItem('rigly_token')
          if (token) {
            setToken(token)

            const account = await getAccount(token)
            account.type = account.email === 'seller@rigly.io' ? AccountType.Seller : AccountType.Buyer
            setAccount(account)
          }
        } catch (ex) {
          console.error(ex)
          window.localStorage.removeItem('rigly_token')
        } finally {
          setIsLoading(false)
        }
      }
      authorize()
    }
  }, [pathName, router])

  return <AccountContext.Provider value={{ account, token, isLoading, login, logout, refresh }}>{children}</AccountContext.Provider>
}
