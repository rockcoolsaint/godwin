'use client'

import { useEffect, useState } from 'react'
import createPayment from 'src/api/checkout/createPayment'
import refreshPayment from 'src/api/checkout/refreshPayment'
import { Button, Loader, Container } from 'src/core'
import { usePayments } from 'src/hooks'
import { useAccountContext } from 'src/providers/AccountProvider'
import { Order, OrderType, PaymentStatus } from 'src/types'
import Image from 'next/image'
import { formatMoney } from 'src/utils/currency'
import { formatDate } from 'src/utils/date'
import * as miner from 'src/assets/jpg/mining.jpeg'
import { PaymentProvider } from 'src/api/auction/types'

interface Props {
  order: Order
}

function secondsToDays(seconds: number) {
  return Math.floor(seconds / 86400)
}

function formatHashrate(hashrate_ths: number) {
  if (hashrate_ths >= 1000) {
    return `${(hashrate_ths / 1000).toFixed()} PH/s`
  }

  return `${hashrate_ths.toFixed()} TH/s`
}

function PaymentOne({ order }: Props) {
  const { token, isLoading: tokenLoading } = useAccountContext()
  const [currentOrder, setCurrentOrder] = useState(order)
  const [loading, setLoading] = useState(true)
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  const { first, paymentId, amountPaid, amountRemaining, isPaymentComplete, checkoutUrl } = usePayments(currentOrder)
  const { block_party, auction, auction_fee, total, price } = order

  const handleCheckout = async () => {
    setCheckoutLoading(true)
    try {
      if (checkoutUrl) {
        window.location.href = checkoutUrl
      }
    } catch (ex) {
      console.error(ex)
    } finally {
      setCheckoutLoading(false)
    }
  }

  useEffect(() => {
    const prepareCheckout = async () => {
      if (!token) {
        return console.error('Cannot prepare checkout, missing token.')
      }

      setLoading(true)

      if (!order.payments[0]) {
        // If order does not have any payments, we need to create one.
        const res = await createPayment(order.id, token)

        setCurrentOrder({
          ...order,
          payments: [res],
        })
      } else if (order.payments[0].status === PaymentStatus.Unpaid || order.payments[0].status === PaymentStatus.Expired) {
        // If order already has payments, we need to refresh the payment.
        const lastIdx = order.payments.length - 1
        const lastPayment = order.payments[lastIdx]
        const res = await refreshPayment(lastPayment.id, token)

        setCurrentOrder({
          ...order,
          payments: order.payments.map(payment => {
            return payment.id === res.id ? res : payment
          }),
        })
      }
      setLoading(false)
    }

    if (!tokenLoading && token) {
      prepareCheckout()
    }
  }, [order, tokenLoading, token])

  if (!first || loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader />
      </div>
    )
  }

  const lastOpenNodePayment =
    currentOrder.payments.length > 0
      ? currentOrder.payments
          .filter(payment => payment.provider === PaymentProvider.OpenNode)
          .reduce((highest, current) => (current.id > highest.id ? current : highest))
      : undefined

  const isBlockParty = order.type === OrderType.BlockParty
  const showRemaining =
    currentOrder &&
    currentOrder.payments &&
    currentOrder.payments.length > 1 &&
    !isPaymentComplete &&
    first &&
    first.status !== PaymentStatus.Processing

  const name = isBlockParty ? block_party?.name : auction?.title
  const durationDays = isBlockParty ? secondsToDays(block_party!.duration_seconds) : auction!.auction_meta.days_of_mining
  const durationDaysPrefix = durationDays > 1 ? 'days' : 'day'
  const hashrate = formatHashrate(isBlockParty ? block_party!.hashrate_ths : auction!.auction_meta.hashrate)
  const estimatedStart = isBlockParty
    ? block_party && block_party.hashrate_start
      ? formatDate(block_party.hashrate_start, 'MMMM d, yyyy')
      : '-'
    : auction && auction.auction_meta.hashrate_start
    ? formatDate(auction.auction_meta.hashrate_start, 'MMMM d, yyyy')
    : '-'

  return (
    <Container>
      <section className="mx-auto my-28 w-full max-w-3xl lg:w-3/5">
        <div className="grid grid-cols-1 gap-3 rounded-2xl bg-gray-100 p-5 sm:grid-cols-2 lg:grid-cols-2">
          {!isBlockParty && (
            <Image
              className="w-full rounded-2xl sm:w-auto"
              src={auction?.auction_meta.site_photo || miner}
              alt="auction image"
              width={240}
              height={180}
            />
          )}
          <div className="ml-0 mt-4 flex flex-col justify-between sm:mt-0">
            <div className="mb-6 sm:mb-12">
              <h3 className="text-2xl font-medium text-gray-900">{name}</h3>
              <span className="text-sm font-normal text-gray-700">
                {durationDays} {durationDaysPrefix} | {hashrate}
              </span>
            </div>
            <div>
              {order.type === OrderType.Auction && (
                <p className="text-sm font-normal text-gray-700">{`Epoch ${auction?.epoch?.epoch_number || '-'}`}</p>
              )}
              <p className="text-sm font-normal text-gray-900">Estimated start {estimatedStart}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-gray-200 p-4 md:p-9">
          <h1 className="text-xl font-medium text-gray-900">Confirm and pay</h1>

          <div className="my-10">
            <dl className="space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Payment Id:</dt>
                <dd className="text-right text-sm font-medium text-gray-900">{paymentId}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>Auction bid</span>
                </dt>
                <dd className="text-sm font-medium text-gray-900">{formatMoney(price)} sats</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex text-sm text-gray-600">
                  <span>Auction fee ({order.markup_percentage}%): </span>
                </dt>
                <dd className="text-sm font-medium text-gray-900">{formatMoney(auction_fee)} sats</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">Due now</dt>
                <dd className="text-base font-medium text-gray-900">{formatMoney(total)} sats</dd>
              </div>
            </dl>
          </div>

          {lastOpenNodePayment &&
            (lastOpenNodePayment.status === PaymentStatus.Unpaid || lastOpenNodePayment.status === PaymentStatus.Expired) && (
              <div className="flex justify-end">
                <Button disabled={checkoutLoading} onClick={handleCheckout}>
                  Checkout
                </Button>
              </div>
            )}

          {lastOpenNodePayment && lastOpenNodePayment.status === PaymentStatus.Processing && (
            <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-sm font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
              Your payment is processing, please check back later
            </span>
          )}
        </div>

        {showRemaining && (
          <div className=" pt-4">
            <p className="flex items-center text-base text-red-600">You still need to complete payment for this order:</p>
            <div>
              <span className="text-sm text-gray-600">Paid: </span>
              <span className="text-sm font-medium text-gray-900">{amountPaid} sats</span>
            </div>
            <div>
              <span className="text-sm text-gray-600">Remaining: </span>
              <span className="text-sm font-medium text-gray-900">{amountRemaining} sats</span>
            </div>
          </div>
        )}
      </section>
    </Container>
  )
}

export default PaymentOne
