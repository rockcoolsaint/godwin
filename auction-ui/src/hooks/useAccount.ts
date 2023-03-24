'use client'

import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import { getAccount } from 'src/api/auth/getAccount'
import { Account } from 'src/types'

export default function useAccount() {
  const { isAuthenticated, getIdTokenClaims } = useAuth0()
  const [token, setToken] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)
  const [account, setAccount] = useState<Account | undefined>(undefined)

  useEffect(() => {
    const authorize = async () => {
      setLoading(true)

      try {
        const claims = await getIdTokenClaims()
        if (claims) {
          setToken(claims.__raw)

          const account = await getAccount(claims.__raw)
          setAccount(account)
        } else {
          // console.warn('no claims')
        }
      } catch (ex) {
        console.error(ex)
      } finally {
        setLoading(false)
      }
    }
    authorize()
  }, [getIdTokenClaims])

  return {
    loading: loading,
    authenticated: isAuthenticated,
    account: account,
    isOnboardingComplete: account ? account.onboarding_complete : false,
    token,
  }
}
