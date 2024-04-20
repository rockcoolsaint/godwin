import Link from 'src/components/shared/Link'
import { NavigationItem, headerNavURL } from './NavigationControl'
interface DesktopNavProps {
  isDemo?: boolean
}
const DesktopNav = ({ isDemo }: DesktopNavProps) => {
  const navigationURL = headerNavURL.filter(item => !isDemo || item.showInDemo)

  return (
    <aside className="hidden lg:flex">
      {navigationURL.map((nav: NavigationItem) => (
        <div key={nav.id} className="group relative ml-8">
          <div className="flex cursor-pointer items-center hover:text-primary">
            {nav.url ? (
              <Link className="font-epilogue text-sm font-normal text-dark-300" href={nav.url}>
                {nav.name}
              </Link>
            ) : (
              <span className="font-epilogue text-sm font-normal text-dark-300">{nav.name}</span>
            )}
            {nav.submenu && (
              <svg className="-mt-1 ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          {nav.submenu && (
            <div className="dropdown-content absolute left-0 hidden min-w-max rounded-md bg-white shadow-md group-hover:block">
              {nav.submenu.map(sub => (
                <Link key={sub.url} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" href={sub.url}>
                  {sub.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </aside>
  )
}

export default DesktopNav
