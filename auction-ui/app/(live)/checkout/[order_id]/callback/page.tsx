/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { makeClientRequest } from 'src/api/clientRequest'
import { Loader } from 'src/core'

export default function CheckoutCallback({ params }: { params: { order_id?: string } }) {
  const { order_id } = params
  const router = useRouter()

  const updateOrderStatus = async () => {
    try {
      await makeClientRequest({
        method: 'PUT',
        path: '/api/orders/update',
        body: {
          order_id,
          update: {
            status: 'processing',
          },
        },
      })
      router.push(`/checkout/${order_id}?success=true`)
    } catch (ex) {
      // TODO: Log error somewhere
      router.push(`/checkout/${order_id}?error=true`)
    }
  }

  useEffect(() => {
    updateOrderStatus()
  }, [order_id])

  return (
    <div className="flex items-center justify-center p-12">
      <Loader />
    </div>
  )
}
