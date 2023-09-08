'use client'

import clsx from 'clsx'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'src/components/shared/Link'
import Icon from 'src/core/components/Icon'
import Select from 'src/core/components/Select'

const pages = [
  { label: 'General', path: '/account/general', icon: 'user' },
  { label: 'Orders', path: '/account/orders', icon: 'cart' },
  { label: 'Hashrate', path: '/account/hashrate', icon: 'helmetSafety' },
  { label: 'Notifications', path: '/account/preferences', icon: 'bell' },
]

function getActiveRoute(pathName: string) {
  const pathData = pathName.split('/').slice(2, 3)

  if (pathData[0]) {
    return `/${pathData[0]}`
  }

  return ''
}

const menuItems = [
  { path: '/account/general', label: 'General', icon: 'user' },
  { path: '/account/orders', label: 'Orders', icon: 'cart' },
  { path: '/account/hashrate', label: 'Hashrate', icon: 'helmetSafety' },
  { path: '/account/preferences', label: 'Notifications', icon: 'bell' },
]

export default function AccountSidebar() {
  const router = useRouter()
  const pathName = usePathname()
  const activeRoute = getActiveRoute(pathName)

  const handleChangeRoute = (path: string) => {
    router.push(path)
  }

  return (
    <>
      <Select
        className="flex lg:hidden"
        options={menuItems.map(item => ({ value: item.path, ...item }))}
        value={pathName}
        onChange={handleChangeRoute}
      />

      <div className="hidden w-full flex-col gap-1 rounded-xl bg-blue-100 p-2 lg:flex lg:w-1/5">
        {pages.map((page, i) => {
          const isActive = activeRoute === page.path.replace('/account', '')

          return (
            <Link
              key={i}
              href={page.path}
              className={clsx('flex h-12 items-center justify-start gap-4 rounded-lg px-4', {
                'bg-gradient': isActive,
              })}
            >
              <Icon icon={page.icon} className={clsx('h-4 w-4', { 'text-white': isActive })} />
              <span className={clsx({ 'text-white': isActive })}>{page.label}</span>
            </Link>
          )
        })}
      </div>
    </>
  )
}
