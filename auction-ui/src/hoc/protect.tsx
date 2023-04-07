/* eslint-disable react/jsx-no-bind */
'use client'

import { usePathname } from 'next/navigation'
import ContentContainer from 'src/components/shared/ContentContainer'
import Link from 'src/components/shared/Link'
import { Button, Loader } from 'src/core'
import { useAccountContext } from 'src/providers/AccountProvider'

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
        <ContentContainer className="flex h-full items-center justify-center">
          <Loader />
        </ContentContainer>
      )
    }

    if (!account) {
      return (
        <ContentContainer className="flex h-full flex-col items-center justify-center gap-4">
          <h1>Unauthorized</h1>
          <p className="">You need to be signed in to access this page.</p>
          <Link href="/login">
            <Button>Sign in</Button>
          </Link>
        </ContentContainer>
      )
    }

    return <Component {...props} />
  }
}
