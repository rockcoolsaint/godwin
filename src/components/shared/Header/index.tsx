'use client'

import Link from 'src/components/shared/Link'
import LogoSvg from 'src/assets/svg/logo_dark.svg'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Authorized from './Authorized'
import Unauthorized from './Unauthorized'
import { useAccountContext } from 'src/providers/AccountProvider'
import Container from 'src/core/components/Container'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useReturnUrl from 'src/hooks/useReturnUrl'
import DesktopNav from 'src/components/shared/Navigation/DesktopNav'
import MobileNav from 'src/components/shared/Navigation/MobileNav'

interface Props {
  isDemo?: boolean
}

export default function HeaderNav({ isDemo }: Props) {
  const router = useRouter()
  const { account, isLoading, logout } = useAccountContext()
  const returnUrl = useReturnUrl()
  const homeURL = isDemo ? '/demo/' : '/'

  const [active, setActive] = useState<boolean>(false)

  const toggleMobileMenu = (): void => {
    setActive(!active)
  }

  const handleRegisterClick = (): void => {
    toggleMobileMenu()
    router.push(`/register${returnUrl}`)
  }

  const handleLoginClick = (): void => {
    toggleMobileMenu()
    router.push(`/${isDemo ? 'demo/' : ''}login${returnUrl}`)
  }

  const handleLogoutClick = (): void => {
    logout()
  }

  return (
    <>
      <header className="h-20 min-h-[80px]">
        <Container className="flex h-full items-center justify-center border-b sm:justify-between">
          <div className="absolute inset-y-0 left-5 flex h-20 items-center lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center rounded-md text-dark-200 hover:text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={active}
              aria-label="Toggle navigation menu"
            >
              {active ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          <div className="relative flex items-center">
            <Link href={homeURL}>
              <LogoSvg />
            </Link>
            <DesktopNav />
          </div>
          {!isLoading && <div className="ml-8 hidden md:block">{account ? <Authorized /> : <Unauthorized isDemo={isDemo} />}</div>}
        </Container>
      </header>
      <MobileNav
        active={active}
        handleLogoutClick={handleLogoutClick}
        handleLoginClick={handleLoginClick}
        handleRegisterClick={handleRegisterClick}
      />
    </>
  )
}
