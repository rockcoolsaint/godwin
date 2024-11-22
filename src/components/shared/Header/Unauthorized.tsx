/* eslint-disable react/jsx-no-bind */
'use client'

import Link from 'src/components/shared/Link'
import useReturnUrl from 'src/hooks/useReturnUrl'

interface Props {
  isDemo?: boolean
}

export default function Unauthorized({ isDemo }: Props) {
  const returnUrl = useReturnUrl()
  const loginUrl = isDemo ? `/demo/login` : `/login${returnUrl}`
  const registerUrl = isDemo ? `/demo/register` : `/register${returnUrl}`

  return (
    <div className="ml-8 flex items-center justify-end gap-2 font-epilogue">
      <Link
        href={loginUrl}
        className="flex h-10 items-center justify-center rounded-lg border border-transparent px-3 text-sm text-[#f08222] hover:cursor-pointer"
      >
        <span className="whitespace-nowrap font-normal">Sign In</span>
      </Link>

      <Link
        href={registerUrl}
        className="flex h-10 items-center justify-center rounded-lg bg-[#f08222] px-3 text-sm text-white hover:cursor-pointer hover:opacity-80"
      >
        <span className="whitespace-nowrap font-normal">Sign up</span>
      </Link>
    </div>
  )
}