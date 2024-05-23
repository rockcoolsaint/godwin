/* eslint-disable react/jsx-no-bind */
'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Loader } from 'src/core'
import { useAccountContext } from 'src/providers/AccountProvider'
import Container from 'src/core/components/Container'
import { useEffect } from 'react'
import useReturnUrl from 'src/hooks/useReturnUrl'


/** Protected routes lists all route prefixes which might have auth required. 
 * To activate logged-in requirement for a component wrap the component with 
 * protect() function. (e.g. `export default protect(Hashrate)`)
*/
export const protectedRoutes = [
  '/checkout', 
  '/account', 
]

const isRouteProtected = (pathName: string): boolean => {
  return protectedRoutes.some(route => pathName.startsWith(route))
}

export default function protect(Component: any) {
  return function HocChildComponent(props: any) {
    const router = useRouter()
    const pathName = usePathname()
    const isProtectedRoute = isRouteProtected(pathName)
    const { account, isLoading } = useAccountContext()
    const returnUrl = useReturnUrl()

    useEffect(() => {
      if (isProtectedRoute && !isLoading && !account) {
        router.push(`/login${returnUrl}`)
      }
    }, [isProtectedRoute, isLoading, account, router, returnUrl])

    if (!isProtectedRoute) {
      return <Component {...props} />
    }

    if (isLoading) {
      return (
        <Container className="flex h-full items-center justify-center py-16">
          <Loader />
        </Container>
      )
    }

    if (!account) {
      return (
        <Container className="flex h-full items-center justify-center py-16">
          <Loader />
        </Container>
      )
    }

    return <Component {...props} />
  }
}
