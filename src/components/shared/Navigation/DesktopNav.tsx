import Link from 'src/components/shared/Link'
import { NavigationItem } from 'src/components/shared/Header'

interface DesktopNavProps {
  navigationURL: NavigationItem[]
}

const DesktopNav = ({ navigationURL }: DesktopNavProps) => (
  <aside className="hidden lg:block">
    {navigationURL.map(nav => (
      <Link key={nav.id} className="ml-8 font-epilogue text-sm font-normal text-dark-300 hover:text-primary" href={nav.url}>
        {nav.name}
      </Link>
    ))}
  </aside>
)

export default DesktopNav
