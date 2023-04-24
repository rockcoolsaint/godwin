'use client'
import { useTranslation } from 'src/hooks'
import { Auction } from 'src/api/auction/types'
import { underscoreToSpaceAndCapitalize } from 'utils'
interface Props {
  data: Auction
}

const AuctionProfile = ({ data }: Props) => {
  const { t } = useTranslation()

  return (
    <section className="rounded-3 flow-root h-full rounded-xl border bg-gray-50 px-0 py-3 sm:px-4">
      <div className="border-1 flex justify-between rounded-xl bg-white p-2">
        <div className="flex-1 ">
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-2/6 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-1/6">
              <p className="p-3 py-4 font-semibold capitalize text-dark-100">{t('home.type')}</p>
            </aside>
            <aside>
              <p className="p-3 pl-4">{underscoreToSpaceAndCapitalize(data.auction_type.type)}</p>
            </aside>
          </div>
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-2/6 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-1/6">
              <p className="p-3 py-4 font-semibold capitalize text-dark-100">{t('home.epoch')}</p>
            </aside>
            <aside>
              <p className="p-3 pl-4">{data.auction_meta?.hashrate}</p>
            </aside>
          </div>
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-2/6 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-1/6">
              <p className="p-3 py-4 font-semibold capitalize text-dark-100">{t('home.duration')}</p>
            </aside>
            <aside>
              <p className="p-3 pl-4">{data.auction_meta?.days_of_mining}</p>
            </aside>
          </div>
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-2/6 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-1/6">
              <p className="p-3 py-4 font-semibold capitalize text-dark-100 sm:p-3">{t('home.hashrate')}</p>
            </aside>
            <aside>
              <p className="p-3 pl-4">{data.auction_meta.hashrate} TH/s</p>
            </aside>
          </div>
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-2/6 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-1/6">
              <p className="p-3 py-4 font-semibold text-dark-100">{t('home.power_source')}</p>
            </aside>
            <aside>
              <p className="p-3 py-4 pl-4">{data.auction_meta.power_source}</p>
            </aside>
          </div>
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-2/6 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-1/6">
              <p className="p-3 py-4 font-semibold text-dark-100">{t('home.asic_model')}</p>
            </aside>
            <aside>
              <p className="p-3 pl-4">{data.auction_meta.asic_model}</p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AuctionProfile
