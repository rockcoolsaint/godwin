import { Suspense } from 'react'
import { FilterList } from 'src/components/pages/collections/FilterItem'
import { sorting, filtering, auctionTypeFiltering } from 'src/utils/constants'

export default function CollectionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto mt-10 flex w-11/12 flex-col gap-2 pb-4 text-black lg:w-8/12 lg:flex-row lg:gap-6">
          <div className="grid w-full grid-cols-1 justify-between  justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={`filter-item-${index}`} className="h-[300px] w-full animate-pulse rounded-md bg-gray-300">
                <div className="flex flex-col items-center space-y-4 p-4">
                  <div className="bg-muted h-40 w-full animate-pulse rounded-md"></div>
                  <div className="bg-muted h-6 w-3/4 animate-pulse rounded-md"></div>
                  <div className="bg-muted h-4 w-3/5 animate-pulse rounded-md"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    >
      <section className="mx-auto mt-10 flex max-w-screen-2xl flex-col gap-2 pb-4 text-black lg:w-11/12 lg:flex-row lg:gap-6">
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
