'use client'

import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { Container, Loader } from 'src/core'
import useAccount from 'src/hooks/useAccount'

export default function Login() {
  const { account, loading } = useAccount()

  useEffect(() => {
    if (!loading && !account) {
      redirect('/')
    }
  }, [account, loading])

  return (
    <Container>
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    </Container>
  )
}
