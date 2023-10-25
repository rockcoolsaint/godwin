import { InformationCircleIcon } from '@heroicons/react/24/outline'
import Link from 'src/components/shared/Link'
import { Tooltip, TooltipTrigger, TooltipContent } from 'src/components/shared/Tooltip'
import { BlockPartyOnchain } from 'src/types'
import { formatMoney } from 'src/utils/currency'
import shortenAddress from 'src/utils/shortenAddress'

function BlockPartyOnchainDetails({ onchain }: { onchain?: BlockPartyOnchain }) {
  if (!onchain) return null

  return (
    <ul role="list" className="divide-y divide-gray-100">
      <li className="flex justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-sm leading-6 text-gray-900">Pending balance</p>
          </div>
        </div>
        <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
          <p className="text-sm leading-6 text-gray-900">{formatMoney(onchain.pending_balance)} sats</p>
        </div>
      </li>
      <li className="flex justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-sm leading-6 text-gray-900">Escrow balance</p>
          </div>
        </div>
        <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
          <p className="text-sm leading-6 text-gray-900">{formatMoney(onchain.escrow_balance)}</p>
        </div>
      </li>
      <li className="flex justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-sm leading-6 text-gray-900">Escrow address</p>
          </div>
        </div>
        <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
          <Link
            href={`https://mempool.space/address/${onchain.escrow_address}`}
            target="_blank"
            className="text-sm leading-6 underline hover:no-underline"
          >
            {shortenAddress(onchain.escrow_address)}
          </Link>
        </div>
      </li>
      <li className="flex justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <Tooltip placement="right-end">
              <TooltipTrigger>
                <p className="flex items-center justify-center text-sm leading-6 text-gray-900">
                  CKPool status <InformationCircleIcon className="ml-1 h-4 w-4" />
                </p>
              </TooltipTrigger>
              <TooltipContent className="z-[2000] w-2/12 rounded bg-gray-600 p-2 text-xs font-medium text-white">
                Click link to see summary status for CKPool in json format. Once the block party begins, this link will be updated to view
                the party&rsquo;s hashrate at CKPool
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
          <Link href="https://solo.ckpool.org/pool/" target="_blank" className="text-sm leading-6 underline hover:no-underline">
            solo.ckpool.org/pool
          </Link>
        </div>
      </li>
      <li className="flex justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-sm leading-6 text-gray-900">Block Party Host</p>
          </div>
        </div>
        <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
          <Link
            href="tbd"
            target="_blank"
            className="text-sm leading-6 text-gray-900 underline hover:no-underline"
          >
            TBD
          </Link>
        </div>
      </li>
    </ul>
  )
}

export default BlockPartyOnchainDetails
