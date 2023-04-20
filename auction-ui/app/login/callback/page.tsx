/* eslint-disable react/jsx-no-bind */
'use client'

import { Container, Loader } from 'src/core'

export default function LoginCallback() {
  return (
    <Container className="flex h-full">
      <div className="flex grow items-center justify-center">
        <div className="flex flex-col justify-center gap-4">
          <Loader />
          <span className="text-sm text-gray-500">Signing in ...</span>
        </div>
      </div>
    </Container>
  )
}
