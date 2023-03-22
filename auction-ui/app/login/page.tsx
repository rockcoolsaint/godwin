/* eslint-disable react/jsx-no-bind */
'use client'

import { useAuth0 } from '@auth0/auth0-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button, Container, Loader } from 'src/core'

// { searchParams }: { searchParams: { code: string; state: string } }
export default function Login({ searchParams }: { searchParams: { error?: string; error_description?: string } }) {
  const { loginWithRedirect } = useAuth0()
  const router = useRouter()

  const handleLogin = () => {
    loginWithRedirect()
  }

  useEffect(() => {
    if (!searchParams.error) {
      setTimeout(() => {
        router.push('/')
      }, 3000)
    }
  }, [searchParams.error, router])

  return (
    <Container>
      {searchParams.error && (
        <div className="flex flex-col items-start gap-4">
          <span className="text-lg text-red-500">{searchParams.error_description}</span>
          <Button onClick={handleLogin}>Sign in</Button>
        </div>
      )}

      {!searchParams.error && (
        <div className="flex flex-col items-center justify-center">
          <Loader />
          <span className="mt-8">Redirecting after 3 seconds</span>
        </div>
      )}
    </Container>
  )
}
