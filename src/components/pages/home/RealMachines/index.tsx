import Image from 'next/image'
import spot from 'src/assets/png/spot.png'

const content = [
  {
    title: 'Real machines',
    body: 'Connect to ASIC miners from different sellers around the world.',
  },
  {
    title: 'Real machines',
    body: 'Connect to ASIC miners from different sellers around the world.',
  },
  {
    title: 'Multisig escrow',
    body: 'Payments are released after your hashrate is delivered.',
  },
]

export default function RealMachines() {
  return (
    <>
      <ul
        role="list"
        className="mx-4 grid max-w-7xl grid-cols-1 gap-6 text-3xl text-navy sm:mx-auto sm:grid-cols-2 sm:gap-12 lg:grid-cols-3"
      >
        {content.map((person, index) => (
          <li key={index} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow-hero-outline">
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <p className="truncate font-medium">{person.title}</p>
                </div>
                <p className="mt-1">{person.body}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mx-auto hidden max-w-7xl sm:block">
        <Image className="mb-4 block w-full overflow-hidden" src={spot} width={undefined} height={undefined} alt="spot" />
      </div>
    </>
  )
}
