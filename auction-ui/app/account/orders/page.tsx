'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import AccountView from 'src/components/pages/account/AccountView'
import Link from 'src/components/shared/Link'
import { useAccount } from 'src/hooks'
import { getOrders } from 'src/api/account/getOrders'
import { Order, OrderStatus } from 'src/types'
import { Loader } from 'src/core'

function formatOrderStatus(status: string) {
  switch (status) {
    case OrderStatus.Unpaid:
      return <span className="font-semibold text-red-600">Unpaid</span>
    case OrderStatus.Processing:
      return <span className="font-semibold text-gray-600">Processing</span>
    case OrderStatus.PaymentOneComplete:
      return <span className="font-semibold text-orange-400">Deposit & fee received</span>
    default:
      return <span className="font-semibold text-green-600">Paid</span>
  }
}

export default function Orders() {
  const { token } = useAccount()

  const [loading, setLoading] = useState<boolean>(true)
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const prepareOrders = async () => {
      if (!token) {
        return
      }

      setLoading(true)

      try {
        const res = await getOrders(token)

        setOrders(res)
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
              <th className="py-4 text-left text-sm">Payment status</th>
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
                  <td className="text-left text-sm">{formatOrderStatus(order.status)}</td>
                  <td className="pr-4 text-right">
                    <div className="flex h-full items-center justify-end">
                      {order.status !== OrderStatus.PaymentTwoComplete ? (
                        <Link href={`/checkout/${order.id}`} className="text-sm text-blue-500 hover:text-blue-700">
                          Pay
                        </Link>
                      ) : (
                        <span className="text-sm text-gray-500">-</span>
                      )}
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
