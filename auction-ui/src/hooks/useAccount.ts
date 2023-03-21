'use client'

import { useAuth0 } from '@auth0/auth0-react'

export default function useAccount() {
  const { isLoading, isAuthenticated, user } = useAuth0()

  return {
    loading: isLoading,
    authenticated: isAuthenticated,
    account: user,
  }
}
