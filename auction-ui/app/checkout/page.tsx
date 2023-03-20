'use client'

import { Container, Loader } from 'src/core'
import { Order, OrderStatus } from 'src/types'

import PaymentOne from 'src/components/pages/checkout/PaymentOne'
import PaymentTwo from 'src/components/pages/checkout/PaymentTwo'
import { useEffect, useState } from 'react'
import getOrder from 'src/api/checkout/getOrder'

export default function Checkout() {
  const [order, setOrder] = useState<Order | undefined>(undefined)

  useEffect(() => {
    const prepareCheckout = async () => {
      const res = await getOrder()

      setOrder(res)
    }

    prepareCheckout()
  }, [])

  if (!order) {
    return (
      <Container>
        <div className="flex h-full w-full items-center justify-center">
          <Loader />
        </div>
      </Container>
    )
  }

  if (order && order.status === OrderStatus.Unpaid) {
    return <PaymentOne order={order} />
  }

  if (order && order.status === OrderStatus.PaymentOneComplete) {
    return <PaymentTwo order={order} />
  }

  return <Container>Order complete</Container>
}
