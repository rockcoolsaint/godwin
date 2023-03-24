'use client'

import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { Container, Loader } from 'src/core'
import { useAccountContext } from 'src/providers/AccountProvider'

export default function Logout() {
  const { account, loading } = useAccountContext()

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
