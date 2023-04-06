'use client'

import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import Link from 'src/components/shared/Link'
import Icon from 'src/core/components/Icon'

const pages = [
  { label: 'Account', path: '/account', icon: 'user' },
  { label: 'Hashrate', path: '/account/hashrate', icon: 'helmetSafety' },
  { label: 'Orders', path: '/account/orders', icon: 'cart' },
]

export default function AccountSidebar() {
  const pathName = usePathname()
  const accountPath = pathName.replace('/account', '')

  return (
    <div className="flex w-1/5 flex-col gap-1 rounded-xl bg-blue-100 p-6">
      {pages.map((page, i) => {
        const isActive = accountPath === page.path.replace('/account', '')

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
  )
}
