/* eslint-disable react/jsx-no-bind */
'use client'

import { useAuth0 } from '@auth0/auth0-react'
import { Button, Container } from 'src/core'

export default function Unauthorized() {
  const { loginWithRedirect } = useAuth0()

  const handleLogin = () => {
    loginWithRedirect()
  }

  return (
    <Container>
      <div className="flex flex-col items-start gap-4">
        <h1>Unauthorized</h1>
        <p className="">Unfortunately, you need to be signed in to access this page.</p>
        <Button onClick={handleLogin}>Sign in</Button>
      </div>
    </Container>
  )
}
