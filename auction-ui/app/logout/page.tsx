'use client'

import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { Container } from 'src/core'
import useAccount from 'src/hooks/useAccount'

export default function Login() {
  const { account, loading } = useAccount()

  useEffect(() => {
    if (!loading && !account) {
      redirect('/')
    }
  }, [account, loading])

  return <Container>Logout</Container>
}
