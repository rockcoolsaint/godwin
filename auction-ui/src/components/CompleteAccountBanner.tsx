'use client'

import { usePathname } from 'next/navigation'
import Link from 'src/components/shared/Link'
import { useAccountContext } from 'src/providers/AccountProvider'
import Banner from './Banner'

export default function CompleteAccountBanner() {
  const pathName = usePathname()
  const { account } = useAccountContext()

  if (!account || (account && account.public_key) || pathName.startsWith('/account')) {
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
