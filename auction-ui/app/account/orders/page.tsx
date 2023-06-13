/* eslint-disable react/jsx-no-bind */
'use client'

import { useEffect, useState } from 'react'

import AccountView from 'src/components/pages/account/AccountView'
import Link from 'src/components/shared/Link'
import { getOrders } from 'src/api/account/getOrders'
import { Order, OrderStatus, OrderType } from 'src/types'
import { Loader, Table } from 'src/core'
import { useAccountContext } from 'src/providers/AccountProvider'
import protect from 'src/hoc/protect'
import { isOrderFulfilled } from 'utils'

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
        <Table
          data={orders}
          cols={[
            { title: 'Order ID', name: 'order_id' },
            { title: 'Order Type', name: 'order_type' },
            { title: 'Auction Name', name: 'name' },
            { title: 'Payment Status', name: 'payment_status' },
            { title: 'Actions', name: 'actions', align: 'right' },
          ]}
          row={(order, col) => {
            const hasManageAccess =
              order.status === OrderStatus.PaymentTwoComplete ||
              order.status === OrderStatus.DeliveryStarted ||
              order.status === OrderStatus.DeliveryEnded

            switch (col) {
              case 'order_id': {
                return <div className="flex h-12 items-center">{order.id}</div>
              }
              case 'order_type': {
                return <div className="flex h-12 items-center">{order.type === OrderType.Direct ? 'Direct' : 'Auction'}</div>
              }
              case 'name': {
                return <div className="flex h-12 items-center">{order.auction.title}</div>
              }
              case 'payment_status': {
                return <>{formatOrderStatus(order.status)}</>
              }
              case 'actions': {
                return (
                  <div className="flex h-full items-center justify-end">
                    {!isOrderFulfilled(order.status) ? (
                      <Link href={`/checkout/${order.id}`} className="text-sm text-blue-500 hover:text-blue-700">
                        Pay
                      </Link>
                    ) : hasManageAccess ? (
                      <Link href={`/order/${order.id}`} className="text-sm text-blue-500 hover:text-blue-700">
                        Manage
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
    </AccountView>
  )
}

export default protect(Orders)
