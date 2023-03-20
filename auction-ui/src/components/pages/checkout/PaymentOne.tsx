/* eslint-disable react/jsx-no-bind */
'use client'

import { useEffect, useState } from 'react'
import createPayment from 'src/api/checkout/createPayment'
import refreshPayment from 'src/api/checkout/refreshPayment'
import { makeClientRequest } from 'src/api/clientRequest'
import { Button, Container, Input } from 'src/core'
import usePayments from 'src/hooks/usePayments'
import { Order, PaymentStatus } from 'src/types'

function PaymentOne({ order }: { order: Order }) {
  const [currentOrder, setCurrentOrder] = useState(order)
  const [promoCode, setPromoCode] = useState('')
  const [loading, setLoading] = useState(false)

  const { first, paymentId, amountPaid, amountRemaining, isPaymentComplete, checkoutUrl } = usePayments(currentOrder)

  const applyPromoCode = async () => {
    if (!promoCode || promoCode === '' || !first || !currentOrder.id) {
      return
    }

    try {
      setLoading(true)

      const res = await makeClientRequest({
        method: 'PUT',
        path: '/api/payments/update',
        body: {
          payment_id: first.id,
          promo_code: promoCode,
        },
      })

      if (res.error) {
        throw res.error
      }

      setCurrentOrder({
        ...currentOrder,
        payments: currentOrder.payments.map(payment => {
          return payment.id === res.id ? res : payment
        }),
      })

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

      const res = await makeClientRequest({
        method: 'PUT',
        path: '/api/payments/update',
        body: {
          payment_id: first.id,
          promo_code: null,
        },
      })

      setCurrentOrder({
        ...currentOrder,
        payments: currentOrder.payments.map(payment => {
          return payment.id === res.id ? res : payment
        }),
      })

      setPromoCode('')
    } catch (ex) {
      console.error(ex)
    } finally {
      setLoading(false)
    }
  }

  const handlePromoCodeChange = (val: string) => {
    setPromoCode(val)
  }

  useEffect(() => {
    const prepareCheckout = async () => {
      if (!order.payments[0]) {
        // If order does not have any payments, we need to create one.
        const res = await createPayment(order.id)

        setCurrentOrder({
          ...order,
          payments: [res],
        })
      } else {
        // If order already has payments, we need to refresh the payment.
        const lastIdx = order.payments.length - 1
        const lastPayment = order.payments[lastIdx]
        const res = await refreshPayment(lastPayment.id)

        if (!res) {
          return
        }

        setCurrentOrder({
          ...order,
          payments: order.payments.map(payment => {
            return payment.id === res.id ? res : payment
          }),
        })
      }
    }

    prepareCheckout()
  }, [order])

  if (!first) {
    return <Container>Loading</Container>
  }

  const showRemaining =
    currentOrder &&
    currentOrder.payments &&
    currentOrder.payments.length > 0 &&
    !isPaymentComplete &&
    first &&
    first.status !== PaymentStatus.Processing

  return (
    <Container>
      <p>OpenNode checkout</p>

      <div>
        <span>PaymentID:</span> <b>{paymentId}</b>
      </div>
      <div>
        <span>Bid: </span>
        <b>
          {currentOrder.price}
          <i className="fak fa-regular" />
        </b>
      </div>
      <div>
        <span>
          Mining deposit ({formatAuctionType(currentOrder.auction.auction_type.type)} {currentOrder.auction.auction_type.percentage}%):
        </span>{' '}
        <b>
          {currentOrder.mining_deposit}
          <i className="fak fa-regular" />
        </b>
      </div>
      <div>
        <span>Auction fee (3.5%): </span>
        <b>
          {currentOrder.auction_fee}
          <i className="fak fa-regular" />
        </b>
      </div>

      {first.promo_code && (
        <>
          <div>
            <span>Discount: </span>
            <b>{first.promo_code.discount}%</b>
          </div>
          <div>
            <span>Total: </span>
            <b>
              {first.amount}
              <i className="fak fa-regular" />
            </b>
          </div>
        </>
      )}

      {!first.promo_code && (
        <div>
          <span>Total: </span>
          <b>
            {currentOrder.total}
            <i className="fak fa-regular" />
          </b>
        </div>
      )}

      {first.can_apply_promo_code && (
        <div style={{ display: 'flex', gap: '1rem', marginTop: '20px' }}>
          <Input className="form-control mb-3" name="promo_code" value={promoCode} onChange={handlePromoCodeChange} type="text" />

          <Button onClick={applyPromoCode} disabled={loading}>
            <span style={{ whiteSpace: 'nowrap' }}>Apply code</span>
          </Button>
        </div>
      )}

      {first.promo_code && (
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
              {first.promo_code.code} ({first.promo_code.discount}% OFF)
            </b>
          </div>

          {first.can_apply_promo_code && (
            <Button onClick={clearPromoCode} disabled={loading}>
              Clear
            </Button>
          )}
        </div>
      )}

      {showRemaining && (
        <div style={{ margin: '20px 0' }}>
          <b style={{ color: 'red' }}>You still need to complete payment for this order:</b>
          <div>
            <span>Paid: </span>
            <b>
              {amountPaid}
              <i className="fak fa-regular" />
            </b>
          </div>
          <div>
            <span>Remaining: </span>
            <b>
              {amountRemaining}
              <i className="fak fa-regular" />
            </b>
          </div>
        </div>
      )}
      {isPaymentComplete && (
        <div style={{ paddingTop: '20px' }}>
          <b style={{ color: 'green' }}>You`ve completed payment for this order.</b>
        </div>
      )}

      <a href={checkoutUrl} target="_blank" rel="noreferrer" className="mt-4 block">
        <Button>Checkout</Button>
      </a>
    </Container>
  )
}

const formatAuctionType = (auctionType: string) => {
  switch (auctionType) {
    case 'immediate_delivery':
      return 'Immediate delivery'
    case 'forward_date':
      return 'Forward date'
    case 'upfront_payment':
      return 'Upfront payment'
  }
}

export default PaymentOne
