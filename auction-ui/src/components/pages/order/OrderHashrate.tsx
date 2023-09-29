import Chart from 'src/components/pages/auction/AuctionLiveFeed/Chart'
import { Invoice, Shares } from 'src/types'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export function OrderHashrate({ invoice, shares }: { invoice: Invoice; shares: Shares }) {
  if (!invoice) {
    return (
      <div className="flex items-center">
        <ExclamationTriangleIcon className="mr-2 h-12 w-12 text-gray-500" /> <h3 className="font-normal">No hashrate data</h3>
      </div>
    )
  }

  return (
    <div>
      <h6 className="flex flex-wrap justify-between px-4 font-semibold sm:px-6 xl:px-8">Hashrate Data</h6>
      <Chart title="Hashrate data" data={invoice.figure.data} layout={invoice.figure.layout} />
      <h6 className="flex flex-wrap justify-between px-4 font-semibold sm:px-6 xl:px-8">Shares Data</h6>
      <dl className="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white p-4 sm:px-6 xl:px-8">
          <dt className="text-sm font-medium leading-6 text-gray-500">ID</dt>
          <dd className="w-full flex-none text-xl font-medium leading-10 tracking-tight text-gray-900">{shares.id}</dd>
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white p-4 sm:px-6 xl:px-8">
          <dt className="text-sm font-medium leading-6 text-gray-500">Stratum ID</dt>
          <dd className="w-full flex-none text-xl font-medium leading-10 tracking-tight text-gray-900">{shares.stratums_id}</dd>
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white p-4 sm:px-6 xl:px-8">
          <dt className="text-sm font-medium leading-6 text-gray-500">Accepted</dt>
          <dd className="w-full flex-none text-xl font-medium leading-10 tracking-tight text-gray-900">{shares.accepted}</dd>
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white p-4 sm:px-6 xl:px-8">
          <dt className="text-sm font-medium leading-6 text-gray-500">Rejected</dt>
          <dd className="w-full flex-none text-xl font-medium leading-10 tracking-tight text-gray-900">{shares.rejected}</dd>
        </div>
      </dl>
    </div>
  )
}
