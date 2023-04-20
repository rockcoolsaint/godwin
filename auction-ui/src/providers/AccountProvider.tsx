/* eslint-disable @typescript-eslint/no-empty-function */
'use client'

import React, { useContext, useEffect, useState } from 'react'
import { getAccount } from 'src/api/auth/getAccount'
import { redirect, usePathname, useRouter } from 'next/navigation'
import { getToken } from 'src/api/auth/getToken'
import { Account } from 'src/api/auction/types'
import { login as doLogin } from 'src/api/auth/login'

interface AccountContextType {
  account?: Account
  token?: string
  isLoading: boolean
  login: (email: string, returnUrl?: string) => Promise<[boolean, string | undefined]>
  logout: () => void
}

const AccountContext = React.createContext<AccountContextType>({
  isLoading: true,
  login: (_email: string, _returnUrl?: string) => Promise.resolve([false, undefined]),
  logout: () => {},
})

export const useAccountContext = () => useContext(AccountContext)

export default function AccountProvider({ children }: { children: React.ReactNode }) {
  const pathName = usePathname()
  const router = useRouter()

  const [token, setToken] = useState<string | undefined>(undefined)
  const [account, setAccount] = useState<Account | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const login = async (email: string, returnUrl?: string) => {
    return doLogin(email, returnUrl)
  }

  const logout = () => {
    window.localStorage.removeItem('rigly_token')

    setAccount(undefined)
    setToken(undefined)

    redirect('/')
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
          setAccount(account)

          if (params.return_url) {
            return router.replace(`/${params.return_url}`)
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

  return <AccountContext.Provider value={{ account, token, isLoading, login, logout }}>{children}</AccountContext.Provider>
}
