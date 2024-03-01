'use client'
import { useTranslation } from 'src/hooks'
import { Auction } from 'src/api/auction/types'
import { underscoreToSpaceAndCapitalize } from 'utils'
import { convertTime } from 'src/utils/date'
import { Tooltip, TooltipContent, TooltipTrigger } from 'src/components/shared/Tooltip'
import { formatMoney } from 'src/utils/currency'

interface Props {
  data: Auction
}

const AuctionProfile = ({ data }: Props) => {
  const { t } = useTranslation()

  const renderDuration = () => {
    if (data.auction_type.type === 'immediate_delivery') {
      const days = convertTime(data.auction_meta.duration).days

      return (
        <>
          {days > 0 ? (
            <p className="p-6 pl-4">
              {days} {days > 1 ? 'days' : 'day'}{' '}
            </p>
          ) : (
            <p className="p-6 pl-4">N/A</p>
          )}
        </>
      )
    }

    if (data.auction_meta?.days_of_mining) {
      return (
        <p className="p-6 pl-4">
          1 epoch {''}
          <Tooltip placement="top">
            <TooltipTrigger>
              <i className="text-xs font-bold">(1 epoch = 2016 blocks)</i>
            </TooltipTrigger>
            <TooltipContent className="w-3/12 rounded bg-gray-600 px-2 py-1 text-xs font-medium text-white">
              Depending on whether hashrate has increased or decreased since the last difficulty adjustment, the time period of an epoch can
              be shorter or longer than 14 days
            </TooltipContent>
          </Tooltip>
        </p>
      )
    }

    return <p className="p-6 pl-4">N/A</p>
  }

  return (
    <section className="rounded-3 flow-root h-full rounded-xl border bg-gray-50 px-0 py-3 sm:px-4">
      <div className="border-1 flex justify-between rounded-xl bg-white p-2">
        <div className="flex-1">
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-3/6 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-2/6">
              <p className="p-3 py-6 font-semibold capitalize text-dark-100">{t('home.type')}</p>
            </aside>
            <aside className="w-3/6">
              <p className="p-3 pl-4 sm:whitespace-nowrap">{underscoreToSpaceAndCapitalize(data.auction_type.type)}</p>
            </aside>
          </div>
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-3/6 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-2/6">
              <p className="p-3 py-6 font-semibold capitalize text-dark-100">{t('home.duration')}</p>
            </aside>
            <aside>{renderDuration()}</aside>
          </div>
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-3/6 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-2/6">
              <p className="p-3 py-6 font-semibold capitalize text-dark-100">{t('home.hashrate')}</p>
            </aside>
            <aside>
              <p className="p-3 pl-4">{formatMoney(data.auction_meta.hashrate)} TH/s</p>
            </aside>
          </div>
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-3/6 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-2/6">
              <p className="p-3 py-6 font-semibold text-dark-100">{t('home.power_source')}</p>
            </aside>
            <aside>
              <p className="p-3 py-6 pl-4">{data.auction_meta.power_source?.name || 'N/A'}</p>
            </aside>
          </div>
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-3/6 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-2/6">
              <p className="p-3 py-6 font-semibold text-dark-100">Fee</p>
            </aside>
            <aside>
              <p className="p-3 py-6 pl-4">3.5% of final bid amount</p>
            </aside>
          </div>
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-3/6 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-2/6">
              <p className="p-3 py-6 font-semibold text-dark-100">Status</p>
            </aside>
            <aside>
              <p className="p-3 py-6 pl-4">{data.status}</p>
            </aside>
          </div>
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-3/6 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-2/6">
              <p className="p-3 py-6 font-semibold text-dark-100">Payment terms</p>
            </aside>
            <aside className="w-4/6">
              <p className="p-3 py-6 pl-4">Payment due on auction close</p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AuctionProfile
