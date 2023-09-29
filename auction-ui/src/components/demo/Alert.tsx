import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { ReactNode } from 'react'

export default function DemoAlert({ msg }: { msg: string | ReactNode }) {
  return (
    <div className="m-auto border-l-4 border-yellow-400 bg-yellow-50 p-4 lg:w-3/4">
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
