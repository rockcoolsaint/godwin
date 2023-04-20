/* eslint-disable react/jsx-no-bind */
'use client'

import { usePathname } from 'next/navigation'
import Link from 'src/components/shared/Link'
import { Button, Loader } from 'src/core'
import { useAccountContext } from 'src/providers/AccountProvider'
import Container from 'src/core/components/Container'

export const protectedRoutes = ['/checkout', '/account', '/account/hashrate', '/account/orders']

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
        <Container className="flex h-full items-center justify-center">
          <Loader />
        </Container>
      )
    }

    if (!account) {
      return (
        <Container className="flex h-full flex-col items-center justify-center gap-4">
          <h1>Unauthorized</h1>
          <p className="">You need to be signed in to access this page.</p>

          <div className="flex items-center justify-center gap-2">
            <Link href="/login">
              <Button>Sign in</Button>
            </Link>

            <Link href="/register">
              <Button>Create an account</Button>
            </Link>
          </div>
        </Container>
      )
    }

    return <Component {...props} />
  }
}
