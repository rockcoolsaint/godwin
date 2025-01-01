import dynamic from 'next/dynamic'
import { useMobileScreen } from 'src/hooks/useIsMobile'

const content = [
  {
    title: 'Block party',
    body: 'We mine together and try to earn a block reward',
  },
  {
    title: 'Auction',
    body: 'Bid on hashrate to join our block party',
  },
  {
    title: 'Provably Fair',
    body: 'Don\'t trust. Verify our mining at solo.ckpool.org',
  },
]

export default function RealMachines() {
  const isMobile = useMobileScreen()

  return (
    <>
      <ul
        role="list"
        className="mx-4 grid max-w-7xl grid-cols-1 gap-6 text-sm text-navy sm:mx-auto sm:grid-cols-2 sm:gap-12 lg:grid-cols-3 lg:px-16 lg:text-3xl"
      >
        {content.map((person, index) => (
          <li key={index} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow-hero-outline last:mb-10 last:sm:mb-0"> 
            <div className="flex w-full items-center justify-between space-x-6 p-8">
              <div className="flex flex-1 flex-col items-center">
                <div className="space-x-3">
                  <p className="truncate font-bold lg:text-xl 2xl:text-2xl">{person.title}</p>
                </div>
                <p className="mt-1 text-center text-xl lg:text-base">{person.body}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
