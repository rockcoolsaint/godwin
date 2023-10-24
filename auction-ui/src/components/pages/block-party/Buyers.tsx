import { BlockPartyOrder } from 'src/types'
import { formatDate } from 'src/utils/date'

const SPEED = {
  slow: { name: 'slow', value: 21 },
  medium: { name: 'medium', value: 100 },
  fast: { name: 'fast', value: 210 },
}

function BlockPartyBuyers({ blockPartyOrders }: { blockPartyOrders: BlockPartyOrder[] }) {
  return (
    <div className="-m-3 flow-root py-2">
      <div className="overflow-x-auto ">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                  Name
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Speed
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {blockPartyOrders.map(order => (
                <tr key={order.id} className="even:bg-gray-200">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">{order.account.username}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span className="capitalize">{SPEED[order.block_party_speed as keyof typeof SPEED].name}</span>
                    {' - '}
                    <>{SPEED[order.block_party_speed as keyof typeof SPEED].value} TH/s</>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatDate(order.created_at, 'd MMM, yy h:mmaa')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default BlockPartyBuyers
