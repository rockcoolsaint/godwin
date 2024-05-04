'use client'

import { useState } from 'react'
import Link from 'src/components/shared/Link'
import LoginRegister from 'src/components/shared/Header/LoginRegister'
import { headerNavURL, NavigationItem } from './NavigationControl'
import { useAccountContext } from 'src/providers/AccountProvider'

interface MobileNavProps {
  active: boolean
  handleLogoutClick: () => void
  handleLoginClick: () => void
  handleRegisterClick: () => void
  handleNavigation: () => void
  isDemo?: boolean
}

const MobileNav = ({ active, handleLogoutClick, handleLoginClick, handleRegisterClick, handleNavigation, isDemo }: MobileNavProps) => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const { account } = useAccountContext()
  const navigationURL = headerNavURL
    .map(item => {
      if (item?.submenu) {
        const filteredSubmenu = item.submenu.filter(subitem => !(subitem.hideIfAuthed && account))

        return { ...item, submenu: filteredSubmenu }
      }

      return item
    })
    .filter(item => !isDemo || item.showInDemo)

  if (!active) return null

  const toggleDropdown = (id: number) => {
    setOpenDropdown(openDropdown === id ? null : id)
  }

  return (
    <div className="absolute inset-0 top-20 z-50 h-screen bg-white lg:hidden">
      <div className="flex flex-col">
        {navigationURL.map((nav: NavigationItem) => (
          <div key={nav.id}>
            {nav.url ? (
              <Link className="block px-5 py-4 text-sm text-dark-300 hover:text-primary" href={nav.url} onClick={handleNavigation}>
                {nav.name}
              </Link>
            ) : (
              <button
                onClick={() => toggleDropdown(nav.id)}
                className="w-full px-5 py-4 text-left text-sm text-dark-300 hover:text-primary"
              >
                {nav.name}
                <span className={`ml-2 ${openDropdown === nav.id ? 'rotate-180' : ''}`}>
                  <svg className="inline h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </span>
              </button>
            )}
            {nav.submenu && openDropdown === nav.id && (
              <div className="ml-4">
                {nav.submenu.map(sub => (
                  <Link
                    key={sub.url}
                    className="block px-5 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    href={sub.url}
                    onClick={handleNavigation}
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <LoginRegister handleLogoutClick={handleLogoutClick} handleLoginClick={handleLoginClick} handleRegisterClick={handleRegisterClick} />
    </div>
  )
}

export default MobileNav
