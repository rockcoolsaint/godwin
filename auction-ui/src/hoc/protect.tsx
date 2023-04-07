/* eslint-disable react/jsx-no-bind */
'use client'

import { usePathname } from 'next/navigation'
import Link from 'src/components/shared/Link'
import { Button, Container, Loader } from 'src/core'
import { useAccountContext } from 'src/providers/AccountProvider'

export const protectedRoutes = ['/checkout']

const isRouteProtected = (pathName: string): boolean => {
  return protectedRoutes.some(route => pathName.startsWith(route))
}

export default function protect(Component: any) {
  return function HocChildComponent(props: any) {
    const pathName = usePathname()
    const isProtectedRoute = isRouteProtected(pathName)
    const { account, isLoading } = useAccountContext()

    if (!isProtectedRoute) {
      return <Component {...props} />
    }

    if (isLoading) {
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
            <Link href="/login">
              <Button>Sign in</Button>
            </Link>
          </div>
        </Container>
      )
    }

    return <Component {...props} />
  }
}
