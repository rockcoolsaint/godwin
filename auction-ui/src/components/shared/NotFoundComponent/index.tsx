import { PropsWithChildren } from 'react'
import Link from 'src/components/shared/Link'

interface Props {
  message: string
}

export default function NotFoundComponent({ message }: PropsWithChildren<Props>) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <p className="text-2xl font-semibold">{`404 | ${message}`}</p>
      <Link className="text-sm underline hover:no-underline" href="/">
        Return to homepage
      </Link>
    </div>
  )
}
