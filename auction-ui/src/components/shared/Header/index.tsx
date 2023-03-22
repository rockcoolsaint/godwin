'use client'

import Link from 'src/components/shared/Link'
import LogoSvg from 'src/assets/svg/logo_dark.svg'
import MiningSvg from 'src/assets/svg/mine.svg'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Authorized from './Authorized'
import Unauthorized from './Unauthorized'
import { useAccountContext } from 'src/providers/AccountProvider'
import { Loader } from 'src/core'

export default function HeaderNav() {
  const { account, loading } = useAccountContext()

  return (
    <Disclosure as="nav" className="bg-white px-6 md:px-40">
      {({ open }) => (
        <>
          <section className="relative flex items-center justify-center border-b py-6 sm:justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <Disclosure.Button className="inline-flex items-center justify-center rounded-md text-dark-200 hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
            <div className="relative flex items-center">
              <Link href="/">
                <LogoSvg />
              </Link>
              <aside className="hidden sm:block">
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
            <div className="absolute right-0 flex items-center sm:relative">
              <Link className="hidden items-center sm:flex" href="/">
                <span>List your mining</span> <MiningSvg className="ml-4" />
              </Link>
              {!loading && (
                <>
                  {account && <Authorized />}
                  {!account && <Unauthorized />}
                </>
              )}
            </div>
          </section>

          <Disclosure.Panel className="h-screen sm:hidden">
            <aside className="mt-8 flex flex-col">
              <Link className="px-3 pb-8 text-base text-dark-300 hover:text-blue-500" href="/">
                Home
              </Link>
              <Link className="px-3 pb-8 text-base  text-dark-300 hover:text-blue-500" href="/collections">
                Collections
              </Link>
              <Link className="px-3 pb-8 text-base text-dark-300 hover:text-blue-500" href="/">
                Individuals
              </Link>
              <Link className="px-3 pb-8 text-base text-dark-300 hover:text-blue-500" href="/">
                Businesses
              </Link>
              <Link className="flex items-center px-3 pb-8 text-base text-dark-300 hover:text-blue-500" href="/">
                <span>List your mining</span> <MiningSvg className="ml-4" />
              </Link>
            </aside>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
