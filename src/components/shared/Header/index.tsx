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
import Icon from 'src/core/components/Icon'

interface Props {
  isDemo?: boolean
}

const headerNavURL = {
  live: [
    { id: 1, name: 'Home', url: '/', show: true },
    { id: 2, name: 'Auctions', url: '/collections/completed', show: true },
    { id: 5, name: 'Block party', url: '/block-party', show: true },
    { id: 3, name: 'FAQ', url: '/faq', show: true },
    { id: 4, name: 'Blog', url: 'https://blog.rigly.io/', show: true },
  ],
  demo: [
    { id: 1, name: 'Home', url: '/demo', show: true },
    { id: 2, name: 'Auctions', url: '/collections/completed', show: false },
    { id: 5, name: 'Block party', url: '/block-party', show: true },
    { id: 3, name: 'FAQ', url: '/faq', show: true },
    { id: 4, name: 'Blog', url: 'https://blog.rigly.io/', show: true },
  ],
}

export default function HeaderNav({ isDemo }: Props) {
  const router = useRouter()
  const { account, isLoading, logout } = useAccountContext()
  const returnUrl = useReturnUrl()
  const homeURL = isDemo ? '/demo/' : '/'
  const navigationURL = isDemo ? headerNavURL.demo.filter(nav => nav.show) : headerNavURL.live.filter(nav => nav.show)

  const [active, setActive] = useState<boolean>(false)

  const toggleMobileMenu = () => {
    const newState = !active
    setActive(newState)
    document.body.style.overflowY = newState ? 'hidden' : 'auto'
  }

  const handleRegisterClick = () => {
    toggleMobileMenu()

    if (isDemo) {
      router.push(`/register${returnUrl}`)
    } else {
      router.push(`/register${returnUrl}`)
    }
  }

  const handleLoginClick = () => {
    toggleMobileMenu()
    if (isDemo) {
      router.push(`demo/login${returnUrl}`)
    } else {
      router.push(`/login${returnUrl}`)
    }
  }

  const handleLogoutClick = () => {
    logout()
  }

  return (
    <>
      <header className="h-20 min-h-[80px]">
        <Container className="flex h-full items-center justify-center border-b sm:justify-between ">
          <div className="absolute inset-y-0 left-5 flex h-20 items-center lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center rounded-md text-dark-200 hover:text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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

            <aside className="hidden lg:block">
              {navigationURL.map(nav => (
                <Link key={nav.id} className="ml-8 text-sm font-normal text-dark-300 hover:text-primary" href={nav.url}>
                  {nav.name}
                </Link>
              ))}
            </aside>
          </div>
          <div className="ml-8 hidden items-center lg:flex">
            {!isLoading && (
              <div className="hidden md:block">
                {account && <Authorized />}
                {!account && <Unauthorized isDemo={isDemo} />}
              </div>
            )}
          </div>
        </Container>
      </header>

      {active && (
        <div className="absolute inset-0 top-20 z-10 h-screen bg-white lg:hidden">
          <div className="flex flex-col">
            {navigationURL.map(nav => (
              <Link key={nav.id} className="px-5 py-4 text-sm text-dark-300 hover:text-primary" href={nav.url}>
                {nav.name}
              </Link>
            ))}
          </div>
          {account && (
            <>
              <div className="border-y border-gray-300">
                <Link
                  className="flex items-center justify-start gap-3 px-5 py-4 text-sm text-dark-300 hover:text-blue-500"
                  href="/account/general"
                >
                  <Icon icon="user" className="h-3 w-3 text-gray-600" />
                  <span>View my account</span>
                </Link>
                <div className="p-5 text-sm">
                  Signed in as <span className="text-blue-500">{account.email}</span>
                </div>
              </div>
              <div className="p-5">
                <button
                  onClick={handleLogoutClick}
                  className="flex h-10 w-full items-center justify-center rounded-lg border border-gray-300 px-3 text-sm text-blue-400 hover:text-blue-600"
                >
                  <span className="whitespace-nowrap">Sign Out</span>
                </button>
              </div>
            </>
          )}
          {!account && (
            <div className="grid grid-cols-2 gap-5 border-t border-gray-300 p-5">
              <button
                onClick={handleLoginClick}
                className="flex h-10 w-full items-center justify-center rounded-lg border border-gray-300 px-3 text-sm text-blue-400 hover:text-blue-600"
              >
                <span className="whitespace-nowrap">Sign In</span>
              </button>

              <button
                onClick={handleRegisterClick}
                className="flex h-10 w-full items-center justify-center rounded-lg bg-gradient px-3 text-sm text-white hover:bg-gradient-hover"
              >
                <span className="whitespace-nowrap font-normal">Sign up</span>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}
