import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'

export default function DemoAlert() {
  return (
    <div className="m-auto border-l-4 border-yellow-400 bg-yellow-50 p-4 lg:w-3/4">
      <div className="flex lg:justify-center">
        <div className="shrink-0">
          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">You are currently on a demo version of Rigly.</p>
        </div>
      </div>
    </div>
  )
}
