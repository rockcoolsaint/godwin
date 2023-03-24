'use client'

import { Container, Loader } from 'src/core'
import { Order, OrderStatus } from 'src/types'

import PaymentOne from 'src/components/pages/checkout/PaymentOne'
import PaymentTwo from 'src/components/pages/checkout/PaymentTwo'
import { useEffect, useState } from 'react'
import getOrder from 'src/api/checkout/getOrder'

export default function Checkout({ params }: { params: { order_id: string | undefined } }) {
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

  switch (order.status) {
    // case OrderStatus.Processing: {
    //   return (
    //     <Container>
    //       <div className="flex h-full w-full items-center justify-center">
    //         <div className="flex flex-col items-center gap-2">
    //           <span className="text-lg font-semibold">Oops, your payment has already been initiated.</span>
    //           <span className="">TODO: Make sure payment is canceled, and refresh payment.</span>
    //         </div>
    //       </div>
    //     </Container>
    //   )
    // }
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
            <span className="text-green-700">
              Order <b>{order_id}</b> is completed.
            </span>
          </div>
        </Container>
      )
    }
  }
}
