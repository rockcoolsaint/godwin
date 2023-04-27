/* eslint-disable react/jsx-no-bind */
'use client'

import Link from 'src/components/shared/Link'
import LogoSvg from 'src/assets/svg/logo_dark.svg'
import MiningSvg from 'src/assets/svg/mine.svg'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Authorized from './Authorized'
import Unauthorized from './Unauthorized'
import { useAccountContext } from 'src/providers/AccountProvider'
import Container from 'src/core/components/Container'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useReturnUrl from 'src/hooks/useReturnUrl'
import Icon from 'src/core/components/Icon'

export default function HeaderNav() {
  const router = useRouter()
  const { account, isLoading, logout } = useAccountContext()
  const returnUrl = useReturnUrl()

  const [active, setActive] = useState<boolean>(false)

  const toggleMobileMenu = () => {
    const newState = !active
    setActive(newState)
    document.body.style.overflowY = newState ? 'hidden' : 'auto'
  }

  const handleRegisterClick = () => {
    toggleMobileMenu()
    router.push(`/register${returnUrl}`)
  }

  const handleLoginClick = () => {
    toggleMobileMenu()
    router.push(`/login${returnUrl}`)
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
            <Link href="/">
              <LogoSvg />
            </Link>
            <aside className="hidden lg:block">
              <Link className="ml-8 text-base text-dark-300 hover:text-blue-500" href="/">
                Home
              </Link>
              <Link className="ml-8 text-base text-dark-300 hover:text-blue-500" href="/collections">
                Auctions
              </Link>
              <Link className="ml-8 text-base text-dark-300 hover:text-blue-500" href="https:/rigly.io/pages/learn">
                Learn more
              </Link>
            </aside>
          </div>
          <div className="ml-8 hidden items-center lg:flex">
            <Link className="flex items-center" href="https://rigly.io/pages/selling-on-rigly">
              <span>List your mining </span> <MiningSvg className="ml-4" />
            </Link>
            {!isLoading && (
              <div className="hidden md:block">
                {account && <Authorized />}
                {!account && <Unauthorized />}
              </div>
            )}
          </div>
        </Container>
      </header>

      {active && (
        <div className="absolute inset-0 top-20 z-10 h-screen bg-white lg:hidden">
          <div className="flex flex-col">
            <Link className="px-5 py-4 text-base text-dark-300 hover:text-blue-500" href="/">
              Home
            </Link>

            <Link className="px-5 py-4 text-base  text-dark-300 hover:text-blue-500" href="/collections">
              Auctions
            </Link>
            <Link className="px-5 py-4 text-base text-dark-300 hover:text-blue-500" href="https:/rigly.io/pages/learn">
              Learn more
            </Link>

            <Link
              className="flex items-center px-5 py-4 text-base text-dark-300 hover:text-blue-500"
              href="https://rigly.io/pages/selling-on-rigly"
            >
              <span>List your mining</span>
              <MiningSvg className="ml-4" />
            </Link>
          </div>
          {account && (
            <>
              <div className="border-y border-gray-300">
                <div className="p-5">
                  Signed in as <span className="text-blue-500">{account.email}</span>
                </div>
                <Link
                  className="flex items-center justify-start gap-3 px-5 py-4 text-base text-dark-300 hover:text-blue-500"
                  href="/account"
                >
                  <Icon icon="user" className="h-3 w-3 text-gray-600" />
                  <span>Account</span>
                </Link>
                <Link
                  className="flex items-center justify-start gap-3 px-5 py-4 text-base text-dark-300 hover:text-blue-500"
                  href="/account/orders"
                >
                  <Icon icon="cart" className="h-3 w-3 text-gray-600" />
                  <span>Orders</span>
                </Link>
              </div>
              <div className="p-5">
                <button
                  onClick={handleLogoutClick}
                  className="flex h-10 w-full items-center justify-center rounded-lg border border-gray-300 px-3 text-blue-400 hover:text-blue-600"
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
                className="flex h-10 w-full items-center justify-center rounded-lg border border-gray-300 px-3 text-blue-400 hover:text-blue-600"
              >
                <span className="whitespace-nowrap">Sign In</span>
              </button>

              <button
                onClick={handleRegisterClick}
                className="flex h-10 w-full items-center justify-center rounded-lg bg-gradient px-3 text-white hover:bg-gradient-hover"
              >
                <span className="whitespace-nowrap font-semibold">Sign up</span>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}
