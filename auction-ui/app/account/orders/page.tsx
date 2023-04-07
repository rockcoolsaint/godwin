/* eslint-disable react/jsx-no-bind */
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import AccountView from 'src/components/pages/account/AccountView'
import Link from 'src/components/shared/Link'
import { getOrders } from 'src/api/account/getOrders'
import { Order, OrderStatus } from 'src/types'
import { Loader, Table } from 'src/core'
import { useAccountContext } from 'src/providers/AccountProvider'
import protect from 'src/hoc/protect'

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

function Orders() {
  const { token } = useAccountContext()

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
        <>
          {orders.length > 0 && (
            <Table
              data={orders}
              cols={[
                { title: 'Auction', name: 'auction' },
                { title: 'Payment status', name: 'payment_status' },
                { title: 'Actions', name: 'actions', align: 'right' },
              ]}
              row={(order, col) => {
                switch (col) {
                  case 'auction': {
                    return (
                      <Link href={`/auctions/${order.auction.slug}`} className="group flex items-center justify-start gap-4 py-1">
                        <div className="h-10 w-10 rounded-lg bg-gray-300">
                          {order.auction.auction_meta.site_photo && (
                            <Image src={order.auction.auction_meta.site_photo} alt={order.auction.title} />
                          )}
                        </div>
                        <span className="group-hover:text-primary">{order.auction.title}</span>
                      </Link>
                    )
                  }
                  case 'payment_status': {
                    return <>{formatOrderStatus(order.status)}</>
                  }
                  case 'actions': {
                    return (
                      <div className="flex h-full items-center justify-end">
                        {order.status !== OrderStatus.PaymentTwoComplete ? (
                          <Link href={`/checkout/${order.id}`} className="text-sm text-blue-500 hover:text-blue-700">
                            Pay
                          </Link>
                        ) : (
                          <span className="text-sm text-gray-500">-</span>
                        )}
                      </div>
                    )
                  }
                }
              }}
              empty={() => <span className="text-sm text-gray-500">No orders found</span>}
            />
          )}
        </>
      )}
    </AccountView>
  )
}

export default protect(Orders)
