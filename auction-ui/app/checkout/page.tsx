import { makeServerRequest } from 'src/api/serverRequest'
import { Container, QR } from 'src/core'

export default async function Checkout() {
  const order = await makeServerRequest({ method: 'GET', path: '/api/orders?auction_id=1' })

  switch (order.status) {
    case 'unpaid': {
      // Check if payment needs to be created order.payments.length === 0
      if (order.payments.length === 0) {
        // If order does not have any payments, we need to create one.
        const payment = await makeServerRequest({ method: 'POST', path: '/api/payments/create', body: { order_id: order.id } })
        order.payments[0] = payment
      } else {
        // If order already has payments, we need to refresh the payment.
        const lastIdx = order.payments.length - 1
        const lastPayment = order.payments[lastIdx]
        const payment = await makeServerRequest({ method: 'POST', path: '/api/payments/refresh', body: { payment_id: lastPayment.id } })
        order.payments[lastIdx] = payment
      }

      console.log(order.payments[0])

      return (
        <Container>
          <p>OpenNode checkout</p>
        </Container>
      )
    }
    case 'paid_1': {
      const payment_url = `bitcoin:${order.auction.payment_address}?amount=1`

      return (
        <Container>
          <h1>Checkout page</h1>
          <QR code={payment_url} />
          <p>{order.auction.payment_address}</p>
        </Container>
      )
    }
    default: {
      return <Container>Payment complete</Container>
    }
  }
}
