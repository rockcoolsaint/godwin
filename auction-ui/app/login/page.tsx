/* eslint-disable react/jsx-no-bind */
'use client'

import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { Button, Container, Loader } from 'src/core'
import useAccount from 'src/hooks/useAccount'
import { useRouter } from 'next/navigation'

// { searchParams }: { searchParams: { code: string; state: string } }
export default function Login({ searchParams }: { searchParams: { error?: string; error_description?: string } }) {
  const { account, loading, isOnboardingComplete } = useAccount()
  const { loginWithRedirect, getIdTokenClaims } = useAuth0()
  const router = useRouter()

  const handleLogin = () => {
    loginWithRedirect()
  }

  useEffect(() => {
    if (!loading && account) {
      const getOnboardingStatus = async () => {
        const claims = await getIdTokenClaims()
        if (!claims) {
          return
        }

        if (!isOnboardingComplete) {
          return router.replace('/account/onboard')
        }

        router.replace('/')
      }

      getOnboardingStatus()
    }
  }, [account, loading, isOnboardingComplete, getIdTokenClaims, router])

  return (
    <Container>
      {loading && (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      )}
      {!loading && searchParams.error && (
        <div className="flex flex-col items-start gap-4">
          <span className="text-lg text-red-500">{searchParams.error_description}</span>
          <Button onClick={handleLogin}>Sign in</Button>
        </div>
      )}
    </Container>
  )
}
