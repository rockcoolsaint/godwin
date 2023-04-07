/* eslint-disable react/jsx-no-bind */
'use client'
import Link from 'src/components/shared/Link'
import { Button, Container } from 'src/core'

export default function Unauthorized() {
  return (
    <Container>
      <div className="flex flex-col items-start gap-4">
        <h1>Unauthorized</h1>
        <p className="">Unfortunately, you need to be signed in to access this page.</p>
        <Link href="/login">
          <Button>Sign in</Button>
        </Link>
      </div>
    </Container>
  )
}
