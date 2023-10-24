import Link from 'src/components/shared/Link'
import { BlockPartyOnchain } from 'src/types'
import { formatMoney } from 'src/utils/currency'

function BlockPartyOnchainDetails({ onchain }: { onchain?: BlockPartyOnchain }) {
  if (!onchain) return null

  return (
    <ul role="list" className="divide-y divide-gray-100">
      <li className="flex justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">Pending balance</p>
          </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p className="text-sm leading-6 text-gray-900">{formatMoney(onchain.pending_balance)} sats</p>
        </div>
      </li>
      <li className="flex justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">Escrow balance</p>
          </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p className="text-sm leading-6 text-gray-900">{formatMoney(onchain.escrow_balance)}</p>
        </div>
      </li>
      <li className="flex justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">Escrow address</p>
          </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <Link
            href={`https://mempool.space/address/${onchain.escrow_address}`}
            target="_blank"
            className="text-sm leading-6 underline hover:no-underline"
          >
            {onchain.escrow_address}
          </Link>
        </div>
      </li>
      <li className="flex justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">CKPool Stats</p>
          </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <Link
            href={`https://solo.ckpool.org/users/${onchain.escrow_address}`}
            target="_blank"
            className="text-sm leading-6 underline hover:no-underline"
          >
            {onchain.escrow_address}
          </Link>
        </div>
      </li>
      <li className="flex justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">Block Party Host</p>
          </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p className="text-sm leading-6 text-gray-900">{onchain.host.username}</p>
        </div>
      </li>
    </ul>
  )
}

export default BlockPartyOnchainDetails
