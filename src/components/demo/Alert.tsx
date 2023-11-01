import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { ReactNode } from 'react'

export default function DemoAlert({ msg, className }: { msg: string | ReactNode; className?: string }) {
  return (
    <div className={clsx('m-auto border-l-4 border-yellow-400 bg-yellow-50 p-4 lg:w-3/4', className)}>
      <div className="flex lg:justify-center">
        <div className="shrink-0">
          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <div className="text-sm text-yellow-700">{msg}</div>
        </div>
      </div>
    </div>
  )
}
