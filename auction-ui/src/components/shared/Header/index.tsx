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

export default function HeaderNav() {
  const router = useRouter()
  const { account, isLoading } = useAccountContext()
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
                Collections
              </Link>
              <Link className="ml-8 text-base text-dark-300 hover:text-blue-500" href="/">
                Individuals
              </Link>
              <Link className="ml-8 text-base text-dark-300 hover:text-blue-500" href="/">
                Businesses
              </Link>
            </aside>
          </div>
          <div className="ml-8 flex items-center">
            <Link className="hidden items-center lg:flex" href="/">
              <span>List </span> <MiningSvg className="ml-4" />
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
              Collections
            </Link>

            <Link className="px-5 py-4 text-base text-dark-300 hover:text-blue-500" href="/">
              Individuals
            </Link>

            <Link className="px-5 py-4 text-base text-dark-300 hover:text-blue-500" href="/">
              Businesses
            </Link>

            <Link className="flex items-center px-5 py-4 text-base text-dark-300 hover:text-blue-500" href="/">
              <span>List your mining</span>
              <MiningSvg className="ml-4" />
            </Link>
          </div>
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
        </div>
      )}
    </>
  )
}
