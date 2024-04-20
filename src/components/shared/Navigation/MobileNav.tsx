import Link from 'src/components/shared/Link'
import { NavigationItem } from 'src/components/shared/Header'
import LoginRegister from 'src/components/shared/Header/LoginRegister'

interface MobileNavProps {
  navigationURL: NavigationItem[]
  active: boolean
  handleLogoutClick: () => void
  handleLoginClick: () => void
  handleRegisterClick: () => void
}

const MobileNav = ({ navigationURL, active, handleLogoutClick, handleLoginClick, handleRegisterClick }: MobileNavProps) => {
  if (!active) return null

  return (
    <div className="absolute inset-0 top-20 z-10 h-screen bg-white lg:hidden">
      <div className="flex flex-col">
        {navigationURL.map(nav => (
          <Link key={nav.id} className="px-5 py-4 text-sm text-dark-300 hover:text-primary" href={nav.url}>
            {nav.name}
          </Link>
        ))}
      </div>
      <LoginRegister handleLogoutClick={handleLogoutClick} handleLoginClick={handleLoginClick} handleRegisterClick={handleRegisterClick} />
    </div>
  )
}

export default MobileNav
