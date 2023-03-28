'use client'

import { Container, Loader } from 'src/core'
import { Order, OrderStatus } from 'src/types'

import PaymentOne from 'src/components/pages/checkout/PaymentOne'
import PaymentTwo from 'src/components/pages/checkout/PaymentTwo'
import { useEffect, useState } from 'react'
import getOrder from 'src/api/checkout/getOrder'
import protect from 'src/hoc/protect'

function Checkout({ params, searchParams }: { params: { order_id?: string }; searchParams: { success?: string } }) {
  const { order_id } = params
  const isSuccessPage = searchParams.success === 'true'

  const [loading, setLoading] = useState<boolean>(true)
  const [order, setOrder] = useState<Order | undefined>(undefined)

  useEffect(() => {
    const prepareCheckout = async () => {
      if (!order_id) {
        return console.error('No order_id was specified')
      }

      try {
        setLoading(true)
        const res = await getOrder(order_id)

        setOrder(res as Order)
      } catch (ex) {
        console.error(ex)
      } finally {
        setLoading(false)
      }
    }

    prepareCheckout()
  }, [order_id])

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>

    if (order) {
      const poll = async () => {
        const res = await getOrder(order.id)
        if (res.status !== order.status) {
          setOrder(res as Order)
        }
      }

      if (order && order.status !== OrderStatus.PaymentTwoComplete) {
        poll()
        interval = setInterval(() => poll(), 5000)
      }
    }

    return () => {
      clearInterval(interval)
    }
  }, [order])

  if (loading) {
    return (
      <Container>
        <div className="flex h-full w-full items-center justify-center">
          <Loader />
        </div>
      </Container>
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
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex flex-col items-center">
            <span className="mb-4 text-2xl font-semibold">Thank you for completing Payment #1</span>
            <span className="mb-2">Please wait for confirmation on this page, or check back later.</span>
          </div>
        </div>
      </Container>
    )
  }

  switch (order.status) {
    case OrderStatus.Unpaid:
    case OrderStatus.Processing: {
      return (
        <Container>
          <PaymentOne order={order} />
        </Container>
      )
    }
    case OrderStatus.PaymentOneComplete: {
      return (
        <Container>
          <PaymentTwo order={order} />
        </Container>
      )
    }
    default: {
      return (
        <Container>
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex flex-col items-center">
              <span className="mb-4 text-2xl font-semibold">Thank you for completing Payment #2</span>
              <span className="mb-2">TODO: Add some guidance for users here on how to access their hashrate.</span>
            </div>
          </div>
        </Container>
      )
    }
  }
}

export default protect(Checkout)
