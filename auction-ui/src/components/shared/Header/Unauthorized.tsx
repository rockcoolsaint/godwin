/* eslint-disable react/jsx-no-bind */
'use client'

import Link from 'src/components/shared/Link'
import useReturnUrl from 'src/hooks/useReturnUrl'

export default function Unauthorized() {
  const returnUrl = useReturnUrl()

  return (
    <div className="ml-8 flex items-center justify-end gap-2">
      <Link href={`/login${returnUrl}`}>
        <button className="flex h-10 items-center justify-center rounded-lg border border-transparent px-3 text-primary hover:text-primary/70">
          <span className="whitespace-nowrap font-normal">Sign In</span>
        </button>
      </Link>

      <Link href={`/register${returnUrl}`}>
        <button className="flex h-10 items-center justify-center rounded-lg bg-gradient px-3 text-white hover:bg-gradient-hover">
          <span className="whitespace-nowrap font-normal">Sign up</span>
        </button>
      </Link>
    </div>
  )
}
