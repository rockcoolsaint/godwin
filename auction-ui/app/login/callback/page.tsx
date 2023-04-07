/* eslint-disable react/jsx-no-bind */
'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Container, Loader } from 'src/core'
import { useAccountContext } from 'src/providers/AccountProvider'

export default function LoginCallback() {
  const { account, isLoading } = useAccountContext()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (account) {
        router.replace('/')
      } else {
        router.replace('/login')
      }
    }
  }, [account, isLoading, router])

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
