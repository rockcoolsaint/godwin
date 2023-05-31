'use client'

import { usePathname } from 'next/navigation'
import { Auction } from 'src/api/auction/types'
import Link from 'src/components/shared/Link'
import { useAccountContext } from 'src/providers/AccountProvider'
import Banner from './Banner'

const excludedRoutes = ['/account', '/checkout', '/login', '/register']

export default function CompleteAccountBanner({ auction }: { auction: Auction }) {
  const pathName = usePathname()
  const { account } = useAccountContext()

  if (
    !account ||
    (account && account.public_key) ||
    excludedRoutes.some(route => pathName.startsWith(route)) ||
    auction.payment_type !== 'multisig'
  ) {
    return null
  }

  return (
    <Link href="/account">
      <Banner>
        <span className="text-white">Complete your account &rarr;</span>
      </Banner>
    </Link>
  )
}
