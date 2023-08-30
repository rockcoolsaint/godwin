'use client'
import { useTranslation } from 'src/hooks'
import { Auction } from 'src/api/auction/types'
import { underscoreToSpaceAndCapitalize } from 'utils'
import { formatDate } from 'src/utils/date'

interface Props {
  data: Auction
}

const AuctionProfile = ({ data }: Props) => {
  const { t } = useTranslation()

  return (
    <section className="rounded-3 flow-root h-full rounded-xl border bg-gray-50 px-0 py-3 sm:px-4">
      <div className="border-1 flex justify-between rounded-xl bg-white p-2">
        <div className="flex-1">
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-3/6 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-2/6">
              <p className="p-3 py-4 font-semibold capitalize text-dark-100">{t('home.type')}</p>
            </aside>
            <aside className="w-3/6">
              <p className=" p-3 pl-4 sm:whitespace-nowrap">{underscoreToSpaceAndCapitalize(data.auction_type.type)}</p>
            </aside>
          </div>
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-3/6 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-2/6">
              <p className="p-3 py-4 font-semibold capitalize text-dark-100">{t('home.epoch')}</p>
            </aside>
            <aside>{data.epoch ? <p className="p-3 pl-4">{data.epoch.epoch_number}</p> : <p className="p-3 pl-4">-</p>}</aside>
          </div>
          {data.epoch?.start_time && (
            <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
              <aside className="w-3/6 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-2/6">
                <p className="p-3 py-4 font-semibold capitalize text-dark-100">{t('home.epoch')} start date</p>
              </aside>
              <aside>
                <p className="p-3 pl-4">{formatDate(data.epoch.start_time, 'MMMM d, yyyy')}</p>
              </aside>
            </div>
          )}
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-3/6 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-2/6">
              <p className="p-3 py-4 font-semibold capitalize text-dark-100">{t('home.duration')}</p>
            </aside>
            <aside>
              <p className="p-3 pl-4">
                {data.auction_meta?.days_of_mining} {data.auction_meta?.days_of_mining > 1 ? 'days' : 'day'}
              </p>
            </aside>
          </div>
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-3/6 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-2/6">
              <p className="p-3 py-4 font-semibold capitalize text-dark-100 sm:p-3">{t('home.hashrate')}</p>
            </aside>
            <aside>
              <p className="p-3 pl-4">{data.auction_meta.hashrate} TH/s</p>
            </aside>
          </div>
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-3/6 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-2/6">
              <p className="p-3 py-4 font-semibold text-dark-100">{t('home.power_source')}</p>
            </aside>
            <aside>
              <p className="p-3 py-4 pl-4">{data.auction_meta.power_source.name}</p>
            </aside>
          </div>
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-3/6 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-2/6">
              <p className="p-3 py-4 font-semibold text-dark-100">Fee</p>
            </aside>
            <aside>
              <p className="p-3 py-4 pl-4">3.5% of final bid amount</p>
            </aside>
          </div>
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-3/6 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-2/6">
              <p className="p-3 py-4 font-semibold text-dark-100">Deposit</p>
            </aside>
            <aside>
              <p className="p-3 py-4 pl-4">10%</p>
            </aside>
          </div>
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-3/6 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-2/6">
              <p className="p-3 py-4 font-semibold text-dark-100">Status</p>
            </aside>
            <aside>
              <p className="p-3 py-4 pl-4">{data.status}</p>
            </aside>
          </div>
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-3/6  sm:w-1/6 md:w-1/3 lg:w-2/6">
              <p className="p-3 py-4 font-semibold text-dark-100">Payment terms</p>
            </aside>
            <aside className="w-4/6">
              <p className="p-3 py-4 pl-4">
                Deposit and auction fee upon auction close, based on winning bid. Your balance is due within 24 hours of start date
              </p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AuctionProfile
