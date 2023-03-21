/* eslint-disable react/jsx-no-bind */
'use client'

import { useAuth0 } from '@auth0/auth0-react'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { Button, Container } from 'src/core'
import useAccount from 'src/hooks/useAccount'

// { searchParams }: { searchParams: { code: string; state: string } }
export default function Login({ searchParams }: { searchParams: { error?: string; error_description?: string } }) {
  const { account, loading } = useAccount()
  const { loginWithRedirect } = useAuth0()

  const handleLogin = () => {
    loginWithRedirect()
  }

  useEffect(() => {
    if (!loading && account) {
      redirect('/')
    }
  }, [account, loading])

  return (
    <Container>
      {searchParams.error && (
        <div className="flex flex-col items-start gap-4">
          <span className="text-lg text-red-500">{searchParams.error_description}</span>
          <Button onClick={handleLogin}>Sign in</Button>
        </div>
      )}
      {!searchParams.error && <span className="text-lg text-green-500">Login successful</span>}
    </Container>
  )
}
