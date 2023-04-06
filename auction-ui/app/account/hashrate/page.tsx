'use client'

import { useEffect, useState } from 'react'
import Link from 'src/components/shared/Link'
import Image from 'next/image'

import AccountView from 'src/components/pages/account/AccountView'
import { useAccount } from 'src/hooks'
import { Loader } from 'src/core'
import { getOrders } from 'src/api/account/getOrders'
import { Order, OrderStatus } from 'src/types'

export default function Hashrate() {
  const { token } = useAccount()

  const [loading, setLoading] = useState<boolean>(true)
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    setLoading(false)
    const prepareOrders = async () => {
      if (!token) {
        return
      }

      setLoading(true)

      try {
        const res = await getOrders(token)

        setOrders(res.filter((o: Order) => o.status === OrderStatus.PaymentTwoComplete))
      } catch (ex) {
        console.error(ex)
      } finally {
        setLoading(false)
      }
    }

    prepareOrders()
  }, [token])

  return (
    <AccountView>
      {loading && (
        <div className="flex min-h-[30vh] items-center justify-center">
          <Loader />
        </div>
      )}
      {!loading && (
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-4 pl-4 text-left text-sm">Auction</th>
              <th className="py-4 text-left text-sm">Hashrate</th>
              <th className="py-4 pr-4 text-right text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => {
              return (
                <tr key={i} className="border-b border-gray-300">
                  <td className="pl-2 text-left text-sm">
                    <Link href={`/auctions/${order.auction.slug}`} className="group flex items-center justify-start gap-4 py-1">
                      <div className="h-10 w-10 rounded-lg bg-gray-300">
                        {order.auction.auction_meta.site_photo && (
                          <Image src={order.auction.auction_meta.site_photo} alt={order.auction.title} />
                        )}
                      </div>
                      <span className="group-hover:text-primary">{order.auction.title}</span>
                    </Link>
                  </td>
                  <td className="text-left text-sm">-</td>
                  <td className="pr-4 text-right">
                    <div className="flex h-full items-center justify-end">
                      <Link href={`/account/hashrate/${order.auction.id}`} className="text-sm text-blue-500 hover:text-blue-700">
                        Manage
                      </Link>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </AccountView>
  )
}
