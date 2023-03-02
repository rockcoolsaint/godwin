import { PropsWithChildren } from 'react'

interface Props {
  message: string
}

export default function NotFoundComponent({ message }: PropsWithChildren<Props>) {
  return <div className="flex h-screen w-full items-center justify-center">{`404 | ${message}`}</div>
}
