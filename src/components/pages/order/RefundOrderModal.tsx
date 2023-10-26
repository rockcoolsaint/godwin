import { useState } from 'react'
import { toast } from 'react-hot-toast'

import { Account } from 'src/api/auction/types'
import { refund } from 'src/api/orders/escrow/refund'
import Form from 'src/core/components/Form'
import Input from 'src/core/components/Input'
import Modal from 'src/core/components/Modal'
import { useAccountContext } from 'src/providers/AccountProvider'
import { Order } from 'src/types'

export default function RefundOrderModal({ open, onClose, order }: { open: boolean; onClose: () => void; order: Order; account: Account }) {
  const [loading, setLoading] = useState<boolean>(false)
  const { token, isLoading: tokenLoading } = useAccountContext()

  const handleSubmit = async (data: any) => {
    if (!token || tokenLoading) {
      return
    }

    try {
      setLoading(true)
      await refund(order.id, data.refund_reason, token)
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
      onClose()
    }
  }

  if (!token || tokenLoading) {
    return null
  }

  return (
    <Modal open={open} onClose={onClose} className="min-w-[420px]">
      <Modal.Header>
        <Modal.Title>Refund order</Modal.Title>
        <Modal.Close />
      </Modal.Header>

      <Form className="items-start" onSubmit={handleSubmit} disabled={loading}>
        <Modal.Content className="w-full p-4">
          <Form.Field className="w-full flex-col" required>
            <Form.Field.Label htmlFor="refund_reason">Why do you want to refund your order?</Form.Field.Label>
            <Input type="text" name="refund_reason" placeholder="Reason for refunding your order" />
          </Form.Field>
        </Modal.Content>

        <Modal.Footer>
          <Form.Submit small>Send</Form.Submit>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
