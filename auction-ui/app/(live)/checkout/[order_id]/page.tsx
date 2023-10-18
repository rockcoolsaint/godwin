'use client'

import { Container, Loader } from 'src/core'
import { Order, OrderStatus, OrderType } from 'src/types'

import PaymentOne from 'src/components/pages/checkout/PaymentOne'
import PaymentTwo from 'src/components/pages/checkout/PaymentTwo'
import { useEffect, useState } from 'react'
import getOrder from 'src/api/checkout/getOrder'
import protect from 'src/hoc/protect'
import { isOrderFulfilled } from 'utils'
import { useAccountContext } from 'src/providers/AccountProvider'

function Checkout({ params, searchParams }: { params: { order_id?: string }; searchParams: { success?: string } }) {
  const { order_id } = params
  const isSuccessPage = searchParams.success === 'true'

  const { token, isLoading: tokenLoading } = useAccountContext()

  const [loading, setLoading] = useState<boolean>(true)
  const [order, setOrder] = useState<Order | undefined>(undefined)

  useEffect(() => {
    const prepareCheckout = async () => {
      if (!order_id) {
        return console.error('No order_id was specified')
      }

      if (!tokenLoading && token) {
        try {
          setLoading(true)
          const res = await getOrder(order_id, token)

          setOrder(res as Order)
        } catch (ex) {
          console.error(ex)
        } finally {
          setLoading(false)
        }
      }
    }

    prepareCheckout()
  }, [order_id, tokenLoading, token])

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>

    if (order && !tokenLoading && token) {
      const poll = async () => {
        const res = await getOrder(order.id, token)
        if (res.status !== order.status) {
          setOrder(res as Order)
        }
      }

      if (order && !isOrderFulfilled(order.status)) {
        poll()
        interval = setInterval(() => poll(), 5000)
      }
    }

    return () => {
      clearInterval(interval)
    }
  }, [order, tokenLoading, token])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader />
      </div>
    )
  }

  if (!order) {
    return (
      <Container>
        <div className="flex h-full w-full items-center justify-center">
          <span className="text-red-700">
            Order <b>{order_id}</b> not found.
          </span>
        </div>
      </Container>
    )
  }

  if ((order.status === OrderStatus.Unpaid || order.status === OrderStatus.Processing) && isSuccessPage) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center p-12">
          <span className="mb-4 text-2xl font-semibold">Your payment is processing</span>
          <span className="mb-2">Please wait for confirmation on this page, or check back later.</span>
        </div>
      </Container>
    )
  }

  if (order.status === OrderStatus.Unpaid || order.status === OrderStatus.Processing) {
    return (
      <Container>
        <PaymentOne order={order} />
      </Container>
    )
  }

  if (order.status === OrderStatus.PaymentOneComplete && order.type === OrderType.Auction) {
    return (
      <Container>
        <PaymentTwo order={order} />
      </Container>
    )
  }

  return (
    <Container>
      <div className="flex h-full w-full items-center justify-center p-12">
        <div className="flex flex-col items-center">
          {order.type === OrderType.Auction && <span className="mb-4 text-2xl font-semibold">Thank you for completing Payment #2</span>}
          {(order.type === OrderType.Direct || order.type === OrderType.BlockParty) && (
            <span className="mb-4 text-2xl font-semibold">Your payment is complete</span>
          )}
          <span className="mb-2">You should receive an email about your hashrate soon.</span>
        </div>
      </div>
    </Container>
  )
}

export default protect(Checkout)
