'use client'
import Link from 'src/components/shared/Link'
import Image from 'next/image'
import Logo from 'src/assets/webp/upendo-logo-orange.webp'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Authorized from './Authorized'
import Unauthorized from './Unauthorized'
import { useAccountContext } from 'src/providers/AccountProvider'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useReturnUrl from 'src/hooks/useReturnUrl'
import DesktopNav from 'src/components/shared/Navigation/DesktopNav'
import MobileNav from 'src/components/shared/Navigation/MobileNav'
import ThemeToggle from '../Navigation/ThemeToggle'

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

  const handleNavigation = (): void => {
    setActive(false)
  }

  return (
    <>
      <header className="h-20 min-h-[80px] border-b">
        <div className="mx-auto flex h-full w-full max-w-screen-2xl items-center justify-between px-5 md:px-8 lg:px-12">
          <div className="flex items-center">
            <div className="mr-4 lg:hidden">
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
            <Link href={homeURL}>
              <Image 
                src={Logo}
                alt="Rigly Logo"
                width={300} // reduced from 400 to 300 (25% smaller)
                height={110} // maintaining aspect ratio
                priority // If this is your main logo, you'll want to prioritize loading
              />
            </Link>
          </div>
          <div className="hidden lg:block">
            <DesktopNav />
          </div>
          <div className='flex items-center'>
            <ThemeToggle />
            {!isLoading && <div className="ml-8 hidden lg:block">{account ? <Authorized /> : <Unauthorized isDemo={isDemo} />}</div>}
          </div>
        </div>
      </header>
      <div className="lg:hidden">
        <MobileNav
          active={active}
          handleLogoutClick={handleLogoutClick}
          handleLoginClick={handleLoginClick}
          handleRegisterClick={handleRegisterClick}
          handleNavigation={handleNavigation}
        />
      </div>
    </>
  )
}
