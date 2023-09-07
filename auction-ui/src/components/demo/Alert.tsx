import { ReactNode } from 'react'

export default function DemoAlert({ msg }: { msg: string | ReactNode }) {
  return (
    <div className="m-auto border-l-4 border-gray-800 bg-[#f4eef8] p-4 lg:w-3/4">
      <div className="flex lg:justify-center">
        {/* <div className="shrink-0">
          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
        </div> */}
        <div className="ml-3">
          <p className="text-sm text-purple-950">{msg}</p>
        </div>
      </div>
    </div>
  )
}
