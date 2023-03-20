import { Order } from 'src/types'
import { Button, Container, QR } from 'src/core'

function PaymentTwo({ order }: { order: Order }) {
  const payment_url = `bitcoin:${order.auction.payment_address}?amount=1`

  return (
    <Container>
      <h1>Checkout page</h1>
      <QR code={payment_url} />
      <p>{order.auction.payment_address}</p>
      <a href={payment_url} target="_blank" rel="noreferrer" className="mt-4 block">
        <Button>Checkout</Button>
      </a>
    </Container>
  )
}
export default PaymentTwo
