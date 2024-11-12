import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import Link from 'src/components/shared/Link'

export function SignUpPoolDetails() {
  return (
    <div>
      <div className="items-start gap-4">
        <div className="flex w-full flex-col">
          <p className="text-gray-500">You need a mining pool account to use Rigly.</p>
          <br/>
          <p className="text-gray-500">
          Sign up via the test drive and you get a Braiins Pool account:
          </p>
          <br/>

          <Link href="/test-drive"
            className="flex h-12 w-full items-center justify-center rounded-lg bg-gradient px-5 text-white outline-none hover:bg-gradient-hover">
            Mining Test Drive
          </Link>
          <br/>
          <p className="text-gray-500">
          Or create a pool account:
          </p>
        </div>
        <div className="mt-4 flex flex-wrap">
          <Link className="isolate mb-4 mr-4 inline-flex rounded-md shadow-sm" href="https://app.luxor.tech/register" target="_blank">
            <button
              type="button"
              className="relative inline-flex items-center gap-x-1.5 rounded-lg bg-white px-3 py-2 text-sm font-normal text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
              Luxor
              <ArrowTopRightOnSquareIcon className="-mr-0.5 h-4 w-4 text-gray-400" aria-hidden="true" />
            </button>
          </Link>
          <Link href="https://pool.braiins.com/signup" target="_blank" className="isolate mb-4 mr-4 inline-flex rounded-md shadow-sm">
            <button
              type="button"
              className="relative inline-flex items-center gap-x-1.5 rounded-lg bg-white px-3 py-2 text-sm font-normal text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
              Braiins
              <ArrowTopRightOnSquareIcon className="-mr-0.5 h-4 w-4 text-gray-400" aria-hidden="true" />
            </button>
          </Link>
          <Link href="https://emcd.io/pool" target="_blank" className="isolate mb-4 mr-4 inline-flex  rounded-md shadow-sm">
            <button
              type="button"
              className="relative inline-flex items-center gap-x-1.5 rounded-lg bg-white px-3 py-2 text-sm font-normal text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
              EMCD
              <ArrowTopRightOnSquareIcon className="-mr-0.5 h-4 w-4 text-gray-400" aria-hidden="true" />
            </button>
          </Link>
          <Link href="https://www.dmnd.work" target="_blank" className="isolate mb-4 mr-4 inline-flex  rounded-md shadow-sm">
            <button
              type="button"
              className="relative inline-flex items-center gap-x-1.5 rounded-lg bg-white px-3 py-2 text-sm font-normal text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
              DEMAND
              <ArrowTopRightOnSquareIcon className="-mr-0.5 h-4 w-4 text-gray-400" aria-hidden="true" />
            </button>
          </Link>
          <Link href="https://ocean.xyz/getstarted" target="_blank" className="isolate mb-4 mr-4 inline-flex  rounded-md shadow-sm">
            <button
              type="button"
              className="relative inline-flex items-center gap-x-1.5 rounded-lg bg-white px-3 py-2 text-sm font-normal text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
              Ocean
              <ArrowTopRightOnSquareIcon className="-mr-0.5 h-4 w-4 text-gray-400" aria-hidden="true" />
            </button>
          </Link>
          <Link href="https://www.f2pool.com/user/signup" target="_blank" className="isolate mb-4 mr-4 inline-flex rounded-md shadow-sm">
            <button
              type="button"
              className="relative inline-flex items-center gap-x-1.5 rounded-lg bg-white px-3 py-2 text-sm font-normal text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
              F2
              <ArrowTopRightOnSquareIcon className="-mr-0.5 h-4 w-4 text-gray-400" aria-hidden="true" />
            </button>
          </Link>
        </div>

        <p className="mb-4 text-sm text-gray-500">
        Rigly routes hashrate directly to a stratum address that you control through a mining pool account of your choice.
        </p>

        <p className="mb-4 text-sm text-gray-500">
        Read more about how mining pools work{' '}
        <Link href="https://academy.braiins.com/en/braiins-pool/about" className="text-primary underline hover:no-underline">
          here
        </Link>
        </p>
      </div>
    </div>
  )
}
