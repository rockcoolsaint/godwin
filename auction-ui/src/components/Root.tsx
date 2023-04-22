// import { usePathname } from 'next/navigation'
import React from 'react'
// import Banner from 'src/components/Banner'
// import { useAccountContext } from 'src/providers/AccountProvider'

export default function Root({ children }: { children?: React.ReactNode }) {
  // const { account } = useAccountContext()
  // const pathName = usePathname()

  return (
    <>
      {/* {account && !account.is_onboarded && pathName !== '/account/onboarding' && (
        <Banner>
          <span className="text-sm text-white">Complete your profile &rarr;</span>
        </Banner>
      )} */}
      {children}
    </>
  )
}
