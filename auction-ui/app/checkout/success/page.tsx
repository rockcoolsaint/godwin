'use client'

import { useEffect, useState } from 'react'
import getOrder from 'src/api/checkout/getOrder'
import { Container, Loader } from 'src/core'
import { Order } from 'src/types'

export default function CheckoutSuccess({ params }: { params: any }) {
  const { order_id } = params
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
        // TODO: Error handling
        setOrder(res as Order)
      } catch (ex) {
        console.error(ex)
      } finally {
        setLoading(false)
      }
    }

    prepareCheckout()
  }, [order_id])

  if (loading || !order) {
    return (
      <Container>
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      </Container>
    )
  }

  return <Container>Checkout success {order_id}</Container>
}
