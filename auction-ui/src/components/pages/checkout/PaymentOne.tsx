'use client'

import { useEffect, useState } from 'react'
import createPayment from 'src/api/checkout/createPayment'
import refreshPayment from 'src/api/checkout/refreshPayment'
import { makeClientRequest } from 'src/api/clientRequest'
import { Button, Loader, Input, formatAuctionType, Container } from 'src/core'
import { usePayments } from 'src/hooks'
import { useAccountContext } from 'src/providers/AccountProvider'
import { Order, OrderStatus, OrderType, PaymentStatus } from 'src/types'
import Image from 'next/image'
import { formatMoney } from 'src/utils/currency'
import { formatDate } from 'src/utils/date'
import * as miner from 'src/assets/jpg/mining.jpeg'

interface Props {
  order: Order
}

function PaymentOne({ order }: Props) {
  const { token, isLoading: tokenLoading } = useAccountContext()
  const [currentOrder, setCurrentOrder] = useState(order)
  const [promoCode, setPromoCode] = useState('')
  const [loading, setLoading] = useState(true)
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  const { first, paymentId, amountPaid, amountRemaining, isPaymentComplete, checkoutUrl } = usePayments(currentOrder)
  const { auction, auction_fee, mining_deposit, price, total } = order

  const applyPromoCode = async () => {
    if (!promoCode || promoCode === '' || !first || !currentOrder.id) {
      return
    }

    try {
      setLoading(true)
      const newOrder = await makeClientRequest({
        method: 'PUT',
        path: '/api/orders/update',
        body: {
          order_id: currentOrder.id,
          update: {
            promo_code: promoCode,
          },
        },
      })
      setCurrentOrder(newOrder)
      setPromoCode('')
    } catch (ex) {
      console.error(ex)
    } finally {
      setLoading(false)
    }
  }

  const clearPromoCode = async () => {
    if (!first || !currentOrder.id) {
      return
    }

    try {
      setLoading(true)

      const newOrder = await makeClientRequest({
        method: 'PUT',
        path: '/api/orders/update',
        body: {
          order_id: currentOrder.id,
          update: {
            promo_code: null,
          },
        },
      })

      setCurrentOrder(newOrder)
      setPromoCode('')
    } catch (ex) {
      console.error(ex)
    } finally {
      setLoading(false)
    }
  }

  const handlePromoCodeChange = (val: string | number) => {
    setPromoCode(val.toString())
  }

  const handleCheckout = async () => {
    setCheckoutLoading(true)
    try {
      await makeClientRequest({
        method: 'PUT',
        path: '/api/orders/update',
        body: {
          order_id: currentOrder.id,
          update: {
            status: 'processing',
          },
        },
      })

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
      } else if (order.status !== OrderStatus.Processing) {
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
      <div className="flex h-full w-full items-center justify-center">
        <Loader />
      </div>
    )
  }

  const showRemaining =
    currentOrder &&
    currentOrder.payments &&
    currentOrder.payments.length > 1 &&
    !isPaymentComplete &&
    first &&
    first.status !== PaymentStatus.Processing

  return (
    <Container>
      <section className="mx-auto my-28 w-full lg:w-3/5">
        <div className="flex rounded-2xl bg-gray-100 p-5">
          <Image className="rounded-2xl" src={miner} alt="auction image" width={240} height={180} />
          <div className="ml-8 flex flex-col justify-between">
            <div className="mb-12">
              <h3 className="text-2xl font-medium text-gray-900">{auction?.title}</h3>
              <span className="text-sm font-normal text-gray-700">{`${auction!.auction_meta.days_of_mining} ${
                auction!.auction_meta.days_of_mining > 1 ? 'days' : 'day'
              }  | ${auction!.auction_meta.hashrate}TH/s `}</span>
            </div>
            <div>
              {order.type === OrderType.Auction && <p className="text-sm font-normal text-gray-700">{`Epoch ${auction?.epoch || '-'}`}</p>}
              <p className="text-sm font-normal text-gray-900">Estimated start {formatDate(auction!.start_at, 'MMMM d, yyyy')}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-gray-200 p-4 md:p-9">
          <h1 className="text-xl font-medium text-gray-900">Confirm and pay</h1>

          <div className="my-10">
            <dl className="space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Payment Id:</dt>
                <dd className="text-sm font-medium text-gray-900">{paymentId}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>Auction bid</span>
                </dt>
                <dd className="text-sm font-medium text-gray-900">{formatMoney(price)} sats</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex text-sm text-gray-600">
                  <span>Mining deposit</span>
                </dt>
                <dd className="text-sm font-medium text-gray-900">{formatMoney(mining_deposit)} sats</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex text-sm text-gray-600">
                  <span>Rigly auction fee</span>
                </dt>
                <dd className="text-sm font-medium text-gray-900">{formatMoney(auction_fee)} sats</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">Due now</dt>
                <dd className="text-base font-medium text-gray-900">{formatMoney(total)} sats</dd>
              </div>
            </dl>
          </div>

          {currentOrder.status !== OrderStatus.Processing && (
            <div className="flex justify-end">
              <Button disabled={checkoutLoading} onClick={handleCheckout}>
                Checkout
              </Button>
            </div>
          )}

          {currentOrder.status === OrderStatus.Processing && (
            <a className="flex justify-end" href={checkoutUrl} rel="noreferrer">
              <Button>Checkout</Button>
            </a>
          )}
        </div>

        {/* <>
          {currentOrder.promo_code && (
            <div>
              <span>Discount: </span>
              <b>{currentOrder.promo_code.discount}%</b>
            </div>
          )}

          {currentOrder.promo_code && (
            <div>
              <span>Amount due: </span>
              <b>
                {first.amount}
                <i className="fak fa-regular" />
              </b>
            </div>
          )}

          {!currentOrder.promo_code && currentOrder.type === OrderType.Auction && (
            <div>
              <span>Amount due: </span>
              <b>
                {currentOrder.mining_deposit + currentOrder.auction_fee}
                <i className="fak fa-regular" />
              </b>
            </div>
          )}
          {currentOrder.type === OrderType.Auction && (
            <>
              {currentOrder.status === OrderStatus.Processing && (
                <div className="my-5 flex gap-2">
                  <span>Payment for this order has already been started, unable to apply promo codes.</span>
                </div>
              )}

              {currentOrder.can_apply_promo_code && (
                <div style={{ display: 'flex', gap: '1rem', marginTop: '20px' }}>
                  <Input className="form-control mb-3" name="promo_code" value={promoCode} onChange={handlePromoCodeChange} type="text" />

                  <Button onClick={applyPromoCode} disabled={loading}>
                    <span style={{ whiteSpace: 'nowrap' }}>Apply code</span>
                  </Button>
                </div>
              )}

              {currentOrder.promo_code && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '8px',
                    background: '#E8F6FF',
                    borderRadius: '8px',
                    padding: '16px',
                    marginTop: '20px',
                    marginBottom: '20px',
                  }}
                >
                  <div>
                    <div>Promo code applied:</div>
                    <b>
                      {currentOrder.promo_code.code} ({currentOrder.promo_code.discount}% OFF)
                    </b>
                  </div>

                  {currentOrder.can_apply_promo_code && (
                    <Button onClick={clearPromoCode} disabled={loading}>
                      Clear
                    </Button>
                  )}
                </div>
              )}
            </>
          )}
        </> */}

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
