'use client'

import { format } from 'date-fns'
import { BellIcon } from '@heroicons/react/24/outline'
import { satoshisToFiat } from 'bitcoin-conversion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { PaymentProvider } from 'src/api/auction/types'
import { getOrder } from 'src/api/orders/getOrder'
import { usePayments } from 'src/hooks'
import { useAccountContext } from 'src/providers/AccountProvider'
import { Order } from 'src/types'
import OrderStatusMessage from 'src/components/pages/order/OrderStatusMessage'
import OrderActions from 'src/components/pages/order/OrderActions'

export default function OrderDetail({ params }: { params: any }) {
  const { account, token, isLoading: tokenLoading } = useAccountContext()
  const { orderId } = params

  const [order, setOrder] = useState<Order | undefined>(undefined)
  const [amountPaidUsd, setAmountPaidUsd] = useState<number | undefined>(undefined)
  const { amountPaid } = usePayments(order)

  const fetchOrder = async () => {
    if (!tokenLoading && token) {
      const res = await getOrder(orderId, token)
      setOrder(res)
    }
  }

  useEffect(() => {
    if (amountPaid != undefined) {
      const convert = async () => {
        const amountPaidUsd = await satoshisToFiat(amountPaid, 'USD')
        setAmountPaidUsd(Number(amountPaidUsd.toFixed(2)))
      }
      convert()
    }
  }, [amountPaid])

  useEffect(() => {
    fetchOrder()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, token, tokenLoading, setOrder])

  if (!order || !account) {
    // TODO: Redirect
    return null
  }

  const paymentOne = order.payments.find(payment => payment.provider === PaymentProvider.OpenNode)
  const paymentTwo = order.payments.find(payment => payment.provider === PaymentProvider.BitGo)

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <aside aria-labelledby="-heading" className="lg:col-span-7">
            <div
              aria-labelledby="mining-details"
              className="mt-16 rounded-lg border border-gray-300 p-4 sm:p-4 lg:col-span-5 lg:mt-0 lg:p-8"
            >
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Review your mining</h1>
              <hr className="my-4" />
              <h4 id="mining-details" className="text-xl font-semibold text-primary">
                Mining details
              </h4>
              <dl className="mt-2 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-base text-gray-600">Rigly auction fee</dt>
                  <dd className="text-base font-medium text-gray-900">{order.auction_fee} sats</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-base text-gray-600">Mining deposit</dt>
                  <dd className="text-base font-medium text-gray-900">{order.mining_deposit} sats</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-base text-gray-600">Bid</dt>
                  <dd className="text-base font-medium text-gray-900">{order.price} sats</dd>
                </div>
              </dl>
              {/* <hr className="mt-4" /> */}
              <div className="-mb-2 mt-4 text-base font-semibold text-gray-900">Payments</div>
              <dl className="mt-0 space-y-4">
                {paymentOne && (
                  <div className="flex items-center justify-between pt-4">
                    <dt className="text-base text-gray-600">Deposit + fees on {format(new Date(paymentOne.created_at), 'LL.dd.yyyy')}</dt>
                    <dd className="text-base font-medium text-gray-900">{paymentOne.amount} sats</dd>
                  </div>
                )}
                {paymentTwo && (
                  <div className="flex items-center justify-between">
                    <dt className="text-base text-gray-600">Auction balance on {format(new Date(paymentTwo.created_at), 'LL.dd.yyyy')}</dt>
                    <dd className="text-base font-medium text-gray-900">{paymentTwo.amount} sats</dd>
                  </div>
                )}
              </dl>
              <hr className="mt-4" />
              <dl className=" text-base font-semibold text-gray-900">
                <div className="flex items-center justify-between border-b border-gray-200 py-4">
                  <dt className="text-base text-gray-600">Balance</dt>
                  {paymentOne && paymentTwo && amountPaid === paymentOne.amount + paymentTwo.amount ? (
                    <dd className="text-base font-medium italic text-green-400">Your mining is paid in full, no balance due</dd>
                  ) : (
                    <dd className="text-base font-medium italic text-red-400">Your mining still requires payment</dd>
                  )}
                </div>
              </dl>
              <h4 className="mt-4 text-xl font-semibold text-primary">Escrow</h4>
              <dl className="space-y-2">
                <div className="flex items-center justify-between pt-4">
                  <dt className="text-base font-semibold">Funds in escrow</dt>
                  <dd className="text-base font-semibold">${amountPaidUsd}</dd>
                </div>
              </dl>
              <OrderStatusMessage account={account} order={order} />
              <OrderActions account={account} order={order} onRefresh={fetchOrder} />
              <hr className="my-4" />
              <div className="flex items-center text-sm">
                <BellIcon className="mr-2 h-8 w-8" />
                <p>
                  You may choose to cancel, request a review, or release payment. Please note: If you cancel you{' '}
                  <b>forfeit your security deposit!</b>
                </p>
              </div>
            </div>
          </aside>

          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg border border-gray-300 p-4 sm:p-4 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <Image src="https://via.placeholder.com/600x300/png" alt="placeholder" width={500} height={500} className="mb-4 rounded-md" />
            <h4 id="summary-heading" className="text-base text-gray-900">
              280 TH/s in USA
            </h4>
            <h4 className="mt-2 text-base font-normal text-gray-500">Epoch 390</h4>
            <dl className="mt-2 space-y-2">
              <div className="flex items-center justify-between">
                <dt className="text-base text-gray-600">Start</dt>
                <dd className="text-base font-medium text-gray-900">April 18th, 2023 02:24 UTC</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-base text-gray-600">End</dt>
                <dd className="text-base font-medium text-gray-900">April 18th, 2023 02:24 UTC</dd>
              </div>
            </dl>
            <hr className="mt-4" />
            <div className="-mb-2 mt-4 text-base font-semibold text-gray-900">Details</div>
            <dl className="mt-0 space-y-2">
              <div className="flex items-center justify-between pt-4">
                <dt className="text-base text-gray-600">Hashrate days</dt>
                <dd className="text-base font-medium text-gray-900">8.4 days @ 175 TH/s</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-base text-gray-600">Offline days</dt>
                <dd className="text-base font-medium text-gray-900">0.4 days @ 0 TH/s</dd>
              </div>
            </dl>
            <dl className="mt-4 space-y-2">
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base text-gray-600">Speed max</dt>
                <dd className="text-base font-medium text-gray-900">189 TH/s</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-base text-gray-600">Speed min</dt>
                <dd className="text-base font-medium text-gray-900">142 TH/s</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-base text-gray-600">Speed avg</dt>
                <dd className="text-base font-medium text-gray-900">175 TH/s</dd>
              </div>
              <div className="flex items-center justify-between font-semibold">
                <dt className="text-base text-gray-600">Days remaining</dt>
                <dd className="text-base text-gray-900">5 days @ 175 TH/s</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
    </div>
  )
}
