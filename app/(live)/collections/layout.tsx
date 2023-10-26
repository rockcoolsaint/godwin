import { Suspense } from 'react'
import { FilterList } from 'src/components/pages/collections/FilterItem'
import { sorting, filtering, auctionTypeFiltering } from 'src/utils/constants'

export default function CollectionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section className="mx-auto flex max-w-screen-2xl flex-col gap-8 border-8 border-cyan-500 pb-4 text-black md:flex-row">
        <div className="order-first w-full flex-none border-4 border-green-500 md:max-w-[125px]">
          <FilterList list={filtering} title="Auction Status" />
          <div className="mt-4" />
          <FilterList list={auctionTypeFiltering} title="Auction Type" />
        </div>
        <div className="order-last min-h-screen w-full md:order-none">{children}</div>
        <div className="order-none flex-none border-4 border-yellow-500 md:order-last md:w-[125px]">
          <FilterList list={sorting} title="Sort by" />
        </div>
      </section>
    </Suspense>
  )
}
