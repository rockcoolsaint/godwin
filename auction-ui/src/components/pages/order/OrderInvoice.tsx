import { formatMoney } from 'src/utils/currency'
import { Invoice } from 'src/types'
import SatsSvg from 'src/assets/svg/sats.svg'

export function OrderInvoice({ invoice }: { invoice: Invoice }) {
  const { report } = invoice

  return (
    <div className="my-6 border-t border-gray-100">
      <dl className="divide-y divide-gray-100">
        <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
          <dt className="text-sm font-medium leading-6 text-gray-900">Auction</dt>
          <dd className="mt-1 flex items-center text-sm capitalize leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {report.auction_title}
          </dd>
        </div>
        <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
          <dt className="text-sm font-medium leading-6 text-gray-900">Average hashrate</dt>
          <dd className="mt-1 flex items-center text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{report.average_hashrate_thps}</dd>
        </div>
        <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
          <dt className="text-sm font-medium leading-6 text-gray-900">Bid price</dt>
          <dd className="mt-1 flex items-center text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {formatMoney(report.bid_price_sats)} <SatsSvg className="ml-1" />
          </dd>
        </div>
        <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
          <dt className="text-sm font-medium leading-6 text-gray-900">Deposit (%)</dt>
          <dd className="mt-1 flex items-center text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{report.deposit_percent}%</dd>
        </div>
        <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
          <dt className="text-sm font-medium leading-6 text-gray-900">Mining status</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{report.mining_status}</dd>
        </div>
        <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
          <dt className="text-sm font-medium leading-6 text-gray-900">Pool account</dt>
          <dd className="mt-1 flex items-center text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{report.pool_account}</dd>
        </div>
        <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
          <dt className="text-sm font-medium leading-6 text-gray-900">Pool worker name</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{report.pool_worker_name}</dd>
        </div>
      </dl>
    </div>
  )
}
