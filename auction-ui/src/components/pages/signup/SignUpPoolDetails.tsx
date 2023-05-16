import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import Link from 'src/components/shared/Link'

export function SignUpPoolDetails() {
  return (
    <div>
      <div className="items-start gap-4">
        <div className=" flex flex-wrap">
          <Link className="isolate mb-4 mr-4 inline-flex rounded-md shadow-sm" href="https://app.luxor.tech/register" target="_blank">
            <button
              type="button"
              className="relative inline-flex items-center gap-x-1.5 rounded-lg bg-white px-3 py-2 text-sm font-normal text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
              Luxor Pool
              <ArrowTopRightOnSquareIcon className="-mr-0.5 h-4 w-4 text-gray-400" aria-hidden="true" />
            </button>
          </Link>
          <Link href="https://pool.braiins.com/signup" target="_blank" className="isolate mb-4 mr-4 inline-flex rounded-md shadow-sm">
            <button
              type="button"
              className="relative inline-flex items-center gap-x-1.5 rounded-lg bg-white px-3 py-2 text-sm font-normal text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
              Braiins Pool
              <ArrowTopRightOnSquareIcon className="-mr-0.5 h-4 w-4 text-gray-400" aria-hidden="true" />
            </button>
          </Link>
          <Link href="https://www.f2pool.com/user/signup" target="_blank" className="isolate mb-4 mr-4 inline-flex rounded-md shadow-sm">
            <button
              type="button"
              className="relative inline-flex items-center gap-x-1.5 rounded-lg bg-white px-3 py-2 text-sm font-normal text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
              F2pool
              <ArrowTopRightOnSquareIcon className="-mr-0.5 h-4 w-4 text-gray-400" aria-hidden="true" />
            </button>
          </Link>
          <Link href="https://app.lincoin.com/user/login" target="_blank" className="isolate mb-4 mr-4 inline-flex  rounded-md shadow-sm">
            <button
              type="button"
              className="relative inline-flex items-center gap-x-1.5 rounded-lg bg-white px-3 py-2 text-sm font-normal text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
              Lincoin
              <ArrowTopRightOnSquareIcon className="-mr-0.5 h-4 w-4 text-gray-400" aria-hidden="true" />
            </button>
          </Link>
          <Link href="https://solo.ckpool.org/" target="_blank" className="isolate mb-4 mr-4 inline-flex rounded-md shadow-sm">
            <button
              type="button"
              className="relative inline-flex items-center gap-x-1.5 rounded-lg bg-white px-3 py-2 text-sm font-normal text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
              CKPool
              <ArrowTopRightOnSquareIcon className="-mr-0.5 h-4 w-4 text-gray-400" aria-hidden="true" />
            </button>
          </Link>
        </div>
        <div className="flex w-full flex-col">
          <p className="mb-4 text-sm text-gray-500">
            Rigly routes hashrate directly to a stratum address that you control through a mining pool account of your choice.
          </p>
          <p className="mb-4 text-sm text-gray-500">
            You need a mining pool account to use Rigly. Please select from one of the above pools and create your account
          </p>
          <p className="text-sm text-gray-500">
            Read more about how mining pools work{' '}
            <Link
              className="text-blue-700 underline"
              href="https://braiins.com/blog/bitcoin-mining-pools-luck-shares-estimated-hashrate"
              target="_blank"
            >
              here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
