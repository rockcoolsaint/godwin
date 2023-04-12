/* eslint-disable react/jsx-no-bind */
import Link from 'src/components/shared/Link'

export default function Unauthorized() {
  return (
    <div className="ml-8 flex items-center justify-end gap-2">
      <Link href="/login">
        <button className="flex h-10 items-center justify-center rounded-lg border border-transparent px-3 text-blue-400 hover:text-blue-600">
          <span className="whitespace-nowrap">Sign In</span>
        </button>
      </Link>

      <Link href="/register">
        <button className="flex h-10 items-center justify-center rounded-lg bg-gradient px-3 text-white hover:bg-gradient-hover">
          <span className="whitespace-nowrap font-semibold">Sign up</span>
        </button>
      </Link>
    </div>
  )
}
