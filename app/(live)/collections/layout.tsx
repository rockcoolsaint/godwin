import { Suspense } from 'react'
import { FilterList } from 'src/components/pages/collections/FilterItem'
import { sorting, filtering, auctionTypeFiltering } from 'src/utils/constants'

export default function CollectionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section className="mx-auto mt-10 flex max-w-screen-2xl flex-col gap-2 pb-4 text-black lg:flex-row lg:gap-6">
        <div className="order-first mx-auto mt-2 w-full max-w-[20rem] flex-none lg:max-w-[125px]">
          <FilterList list={filtering} title="Auction Status" />
          <div className="mt-4" />
          <FilterList list={auctionTypeFiltering} title="Auction Type" />
        </div>
        <div className="order-last mt-8 min-h-screen w-full md:px-5 lg:order-none lg:mt-0 lg:px-0">{children}</div>
        <div className="order-none mx-auto mt-2 w-full max-w-[20rem] flex-none lg:order-last lg:w-[125px]">
          <FilterList list={sorting} title="Sort by" />
        </div>
      </section>
    </Suspense>
  )
}
