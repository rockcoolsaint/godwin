import React from 'react'
import Link from 'src/components/shared/Link'

export default function Banner({ children }: { children?: React.ReactNode }) {
  return (
    <Link href="/account/onboarding">
      <div className="absolute top-[80px] flex min-h-[40px] w-full items-center justify-center bg-gradient">{children}</div>
    </Link>
  )
}
