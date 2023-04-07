/* eslint-disable react/jsx-no-bind */
import Link from 'src/components/shared/Link'

export default function Unauthorized() {
  return (
    <Link href="/login">
      <button className="ml-8 flex items-center justify-center rounded-lg bg-gradient p-3 px-5 text-white hover:bg-gradient-hover">
        <span className="whitespace-nowrap text-sm">Sign In</span>
      </button>
    </Link>
  )
}
