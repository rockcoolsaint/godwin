'use client'
import Image from 'next/image'
import Link from 'src/components/shared/Link'
import { useTranslation } from 'src/hooks'
import { Auction } from 'src/types'
import { formatDate } from 'src/utils/date'

interface Props {
  data: Auction
}

const AuctionProfile = ({ data }: Props) => {
  const { t } = useTranslation()

  return (
    <section className="rounded-3 flow-root rounded-xl border bg-gray-50  px-4 py-3">
      <div className="border-1 flex justify-between rounded-xl bg-white p-2">
        <div className="flex-1 ">
          <div className="flex items-center rounded-t-xl border-b-2 border-white  odd:bg-gray-300 even:bg-gray-50">
            <aside className=" w-1/4 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-1/6">
              <p className="p-3 py-4 font-semibold capitalize text-dark-100">{t('home.name')}</p>
            </aside>
            <aside>
              <p className="p-3 py-4 pl-4 text-sm font-semibold">{data.title}</p>
            </aside>
          </div>
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className=" w-1/4 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-1/6">
              <p className="p-3 py-4 font-semibold capitalize text-dark-100">{t('home.hashrate')}</p>
            </aside>
            <aside>
              <p className="p-3 py-4 pl-4">{data.auction_meta.hashrate}</p>
            </aside>
          </div>
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className=" w-1/4 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-1/6">
              <p className="p-3 py-4 font-semibold capitalize text-dark-100">{t('home.location')}</p>
            </aside>
            <aside>
              <p className="p-3 py-4  pl-4">{data.auction_meta.location}</p>
            </aside>
          </div>
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className=" w-1/4 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-1/6">
              <p className="p-3 py-4 font-semibold text-dark-100">{t('home.days_of_mining')}</p>
            </aside>
            <aside>
              <p className="p-3 pl-4">{data.auction_meta.days_of_mining}</p>
            </aside>
          </div>
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className=" w-1/4 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-1/6">
              <p className="p-3 py-4 font-semibold text-dark-100">{t('home.hours')}</p>
            </aside>
            <aside>
              <p className="p-3 pl-4">{data.auction_meta.hours_per_day}</p>
            </aside>
          </div>
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className=" w-1/4 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-1/6">
              <p className="p-3 py-4 font-semibold text-dark-100">{t('home.power_source')}</p>
            </aside>
            <aside>
              <p className="p-3 py-4 pl-4">{data.auction_meta.power_source}</p>
            </aside>
          </div>
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className=" w-1/4 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-1/6">
              <p className="p-3 py-4 font-semibold text-dark-100">{t('home.asic_model')}</p>
            </aside>
            <aside>
              <p className="p-3 pl-4">{data.auction_meta.asic_model}</p>
            </aside>
          </div>
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className=" w-1/4 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-1/6">
              <p className="p-3 py-4 font-semibold text-dark-100">{t('home.auction_terms')}</p>
            </aside>
            <aside>
              <Link href={data?.auction_meta.terms_link} className="p-3 pl-4">
                Click Here
              </Link>
            </aside>
          </div>
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className=" w-1/4 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-1/6">
              <p className="p-3 py-4 font-semibold text-dark-100">{t('home.auction_start')}</p>
            </aside>
            <aside>
              <p className="p-3 pl-4">{formatDate(data.start_at)}</p>
            </aside>
          </div>
          <div className="flex items-center rounded-b-xl border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className=" w-1/4 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-1/6">
              <p className="p-3 py-4 font-semibold text-dark-100">{t('home.auction_end')}</p>
            </aside>
            <aside>
              <p className="p-3 pl-4">{formatDate(data.end_at)}</p>
            </aside>
          </div>
        </div>
        <div className="ml-3 hidden sm:block">
          <div className="flex flex-col items-start justify-between py-2">
            <Image width={165} height={165} className="mb-2 rounded-xl bg-slate-50" src={data.auction_meta.profile_image_1} alt="Profile" />
            <Image width={165} height={165} className="mb-2 rounded-xl bg-slate-50" src={data.auction_meta.profile_image_2} alt="Profile" />
            <Image width={165} height={165} className="mb-2 rounded-xl bg-slate-50" src={data.auction_meta.profile_image_3} alt="Profile" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AuctionProfile
