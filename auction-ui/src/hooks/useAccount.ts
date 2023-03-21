'use client'
// import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
// import { Account } from 'src/types'

export default function useAccount() {
  const { isLoading, isAuthenticated, user } = useAuth0()

  return {
    loading: isLoading,
    authenticated: isAuthenticated,
    account: user,
  }
}
