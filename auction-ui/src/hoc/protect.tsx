/* eslint-disable react/jsx-no-bind */
'use client'

import { useAuth0 } from '@auth0/auth0-react'
import { usePathname } from 'next/navigation'
import { Button, Container, Loader } from 'src/core'
import { useAccountContext } from 'src/providers/AccountProvider'

export const protectedRoutes = ['/checkout']

const isRouteProtected = (pathName: string): boolean => {
  return protectedRoutes.some(route => pathName.startsWith(route))
}

export default function protect(Component: any) {
  return function HocChildComponent(props: any) {
    const { loginWithRedirect } = useAuth0()
    const pathName = usePathname()
    const isProtectedRoute = isRouteProtected(pathName)
    const { account, loading } = useAccountContext()

    const handleLogin = () => {
      loginWithRedirect()
    }

    if (!isProtectedRoute) {
      return <Component {...props} />
    }

    if (loading) {
      return (
        <Container>
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        </Container>
      )
    }

    if (!account) {
      return (
        <Container>
          <div className="flex flex-col items-center gap-4">
            <h1>Unauthorized</h1>
            <p className="">You need to be signed in to access this page.</p>
            <Button onClick={handleLogin}>Sign in</Button>
          </div>
        </Container>
      )
    }

    return <Component {...props} />
  }
}
