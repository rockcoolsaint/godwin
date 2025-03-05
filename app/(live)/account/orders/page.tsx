'use client'

import { useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ArrowTopRightOnSquareIcon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { Fragment } from 'react'
import { getOrders } from 'src/api/account/getOrders'
import AccountView from 'src/components/pages/account/AccountView'
import Link from 'src/components/shared/Link'
import { Loader, Table } from 'src/core'
import protect from 'src/hoc/protect'
import { useAccountContext } from 'src/providers/AccountProvider'
import { Order, OrderStatus, OrderType } from 'src/types'
import hasPassedOrderStatus from 'src/utils/hasPassedOrderStatus'
import { isOrderFulfilled } from 'utils'
import toast from 'react-hot-toast'

function OrderHistoryView({ order, onClose }: { order: Order; onClose: () => void }) {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-2xl rounded-xl bg-white">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <div className="p-6">
          <h3 className="mb-4 text-lg font-bold">Order Details</h3>
          <div className="space-y-4">
            <div className="flex justify-between border-b py-2">
              <span className="font-semibold">Order ID</span>
              <span>{order.id}</span>
            </div>
            <div className="flex justify-between border-b py-2">
              <span className="font-semibold">Type</span>
              <span>{order.type === OrderType.Direct ? 'Direct' : 'Auction'}</span>
            </div>
            <div className="flex justify-between border-b py-2">
              <span className="font-semibold">Name</span>
              <span>{order.type === OrderType.Direct ? 'Instant Mining' : order.auction?.title}</span>
            </div>
            <div className="flex justify-between border-b py-2">
              <span className="font-semibold">Status</span>
              <span>{formatOrderStatus(order)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function formatOrderStatus(order: Order) {
  switch (order.status) {
    case OrderStatus.Unpaid:
      return (
        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-900 ring-1 ring-inset ring-red-500/10">
          Unpaid
        </span>
      )
    case OrderStatus.Processing:
      return (
        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-500/10">
          Processing
        </span>
      )
    case OrderStatus.PaymentOneComplete:
      if (order.type === OrderType.Auction) {
        return (
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-500/10">
            Paid
          </span>
        )
      }

      return (
        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-500/10">
          Paid
        </span>
      )
    case OrderStatus.PaymentTwoComplete:
      return (
        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-500/10">
          Paid
        </span>
      )
    case OrderStatus.EscrowCancelled:
      return (
        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-600 ring-1 ring-inset ring-red-500/10">
          Cancelled
        </span>
      )
    case OrderStatus.DeliveryStarted:
      return (
        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-950 ring-1 ring-inset ring-green-500/10">
          Delivery Started
        </span>
      )
    case OrderStatus.DeliveryEnded:
      return (
        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
          Delivery ended
        </span>
      )
    case OrderStatus.EscrowRefunded:
      return <span className="font-normal text-blue-500">Refunded</span>
    default:
      return (
        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-500/10">
          Paid
        </span>
      )
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
    <>
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
              { title: 'Name', name: 'name' },
              { title: 'Payment Status', name: 'payment_status' },
              { title: 'Actions', name: 'actions', align: 'right' },
            ]}
            row={(order, col) => {
              const hasManageAccess = hasPassedOrderStatus(order.status, OrderStatus.PaymentTwoComplete)

              switch (col) {
                case 'order_id': {
                  return <div className="flex h-12 items-center">{order.id}</div>
                }
                case 'order_type': {
                  return <div className="flex h-12 items-center">{order.type === OrderType.Direct ? 'Direct' : 'Auction'}</div>
                }
                case 'name': {
                  if (order.type === OrderType.Direct) {
                    return (
                      <Link
                        href={`/direct-order/success?order_id=${order.id}`}
                        target="_blank"
                        className="flex h-12 items-center text-blue-500 hover:underline"
                      >
                        <span>Instant Mining</span>{' '}
                        <ArrowTopRightOnSquareIcon className="ml-1 h-4 w-4" />
                      </Link>
                    )
                  }

                  if (order.type === OrderType.BlockParty) {
                    return (
                      <Link href={''} target="_blank" className="flex h-12 items-center text-blue-500 hover:underline">
                        <span>Block Party - {order.block_party.name}</span>
                      </Link>
                    )
                  }

                  return (
                    <Link href={`/auctions/${order.auction?.slug}`} className="flex h-12 items-center text-blue-500 hover:underline">
                      {order.auction?.title}
                    </Link>
                  )
                }
                case 'payment_status': {
                  return <>{formatOrderStatus(order)}</>
                }
                case 'actions': {
                  return (
                    <div className="flex h-full items-center justify-end">
                      <OrderAction order={order} hasManageAccess={hasManageAccess} />
                    </div>
                  )
                }
              }
            }}
            empty={() => <span className="text-sm text-gray-500">No orders found</span>}
          />
        )}
      </AccountView>
    </>
  )
}

function OrderAction({ order, hasManageAccess }: { order: Order; hasManageAccess: boolean }) {
  const [showOrderHistory, setShowOrderHistory] = useState(false)

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowOrderHistory(true)}
          className="text-sm text-blue-500 hover:text-blue-700"
        >
          View Details
        </button>
        
        {!isOrderFulfilled(order.status) && (
          <>
            <span className="text-gray-300">|</span>
            {order.type === OrderType.Direct ? (
              <button
                onClick={() => toast.error("This option is unsupported, please create a new instant mining order")}
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                Pay
              </button>
            ) : (
              <Link
                href={`/checkout/${order.id}`}
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                Pay
              </Link>
            )}
          </>
        )}
      </div>

      {showOrderHistory && (
        <OrderHistoryView order={order} onClose={() => setShowOrderHistory(false)} />
      )}
    </>
  )
}

export default protect(Orders)
