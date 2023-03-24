'use client'
import Image from 'next/image'
import Link from 'src/components/shared/Link'
import { Auction } from 'src/types'

interface Props {
  data: Auction
}

const AuctionProfile = ({ data }: Props) => {
  return (
    <section className="rounded-3 flow-root rounded-xl border bg-gray-50  px-4 py-3">
      <div className="border-1 flex justify-between rounded-xl bg-white p-2">
        <div className="flex-1 ">
          <div className="flex items-center rounded-t-xl border-b-2 border-white  odd:bg-gray-300 even:bg-gray-50">
            <aside className=" w-1/6  border-r-2 border-white">
              <p className="p-3 py-4 font-semibold text-dark-100">Name</p>
            </aside>
            <aside>
              <p className="p-3 py-4 pl-4 text-sm font-semibold">{data.title}</p>
            </aside>
          </div>
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-1/6   border-r-2 border-r-white">
              <p className="p-3 py-4 font-semibold text-dark-100">Hashrate</p>
            </aside>
            <aside>
              <p className="p-3 py-4 pl-4">{data.auction_meta.hashrate}</p>
            </aside>
          </div>
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-1/6   border-r-2 border-r-white">
              <p className="p-3 py-4 font-semibold text-dark-100">Location</p>
            </aside>
            <aside>
              <p className="p-3 py-4  pl-4">{data.auction_meta.location}</p>
            </aside>
          </div>
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-1/6   border-r-2 border-r-white">
              <p className="p-3 py-4 font-semibold text-dark-100">Days of mining</p>
            </aside>
            <aside>
              <p className="p-3 pl-4">{data.auction_meta.days_of_mining}</p>
            </aside>
          </div>
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-1/6   border-r-2 border-r-white">
              <p className="p-3 py-4 font-semibold text-dark-100">Hours</p>
            </aside>
            <aside>
              <p className="p-3 pl-4">{data.auction_meta.hours_per_day}</p>
            </aside>
          </div>
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-1/6   border-r-2 border-r-white">
              <p className="p-3 py-4 font-semibold text-dark-100">Power source</p>
            </aside>
            <aside>
              <p className="p-3 py-4 pl-4">{data.auction_meta.power_source}</p>
            </aside>
          </div>
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-1/6   border-r-2 border-r-white">
              <p className="p-3 py-4 font-semibold text-dark-100">ASIC model</p>
            </aside>
            <aside>
              <p className="p-3 pl-4">{data.auction_meta.asic_model}</p>
            </aside>
          </div>
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-1/6  border-r-2 border-r-white">
              <p className="p-3 py-4 font-semibold text-dark-100">Terms</p>
            </aside>
            <aside>
              <Link href={data?.auction_meta.terms_link} className="p-3 pl-4">
                Click Here
              </Link>
            </aside>
          </div>
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-1/6  border-r-2 border-r-white">
              <p className="p-3 py-4 font-semibold text-dark-100">Auction start</p>
            </aside>
            <aside>
              <p className="p-3 pl-4">{new Date(data.start_at).toLocaleString()}</p>
            </aside>
          </div>
          <div className="flex items-center rounded-b-xl border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-1/6  border-r-2 border-r-white">
              <p className="p-3 py-4 font-semibold text-dark-100">Auction end</p>
            </aside>
            <aside>
              <p className="p-3 pl-4">{new Date(data.end_at).toLocaleString()}</p>
            </aside>
          </div>
        </div>
        <div className="ml-3 ">
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
