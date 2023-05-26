/* eslint-disable react/jsx-no-bind */
'use client'

import { useState } from 'react'
import { updateAccount } from 'src/api/auth/updateAccount'
import AccountView from 'src/components/pages/account/AccountView'
import { Form, Input, Loader } from 'src/core'
import protect from 'src/hoc/protect'
import { useAccountContext } from 'src/providers/AccountProvider'
import { toast } from 'react-hot-toast'

function Account() {
  const { account, isLoading: isAccountLoading, token } = useAccountContext()
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (data: object) => {
    if (!token) {
      return
    }

    try {
      setLoading(true)

      const updateSuccess = await updateAccount(data, token)
      if (updateSuccess) {
        toast.success('Your changes have been saved.')
      }
    } catch (ex) {
      console.error(ex)
    } finally {
      setLoading(false)
    }
  }

  if (isAccountLoading) {
    return (
      <AccountView>
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      </AccountView>
    )
  }

  if (!account) {
    return <AccountView>Unauthorized</AccountView>
  }

  return (
    <AccountView>
      <Form className="items-start gap-8" onSubmit={handleSubmit} disabled={loading}>
        <Form.Section title="General">
          <Form.Field className="w-full">
            <Form.Field.Label htmlFor="username">Username</Form.Field.Label>
            <Input type="text" name="username" defaultValue={account.username} placeholder="Anonymous" />
          </Form.Field>

          <Form.Horizontal>
            <Form.Field className="w-full">
              <Form.Field.Label htmlFor="first_name">First name</Form.Field.Label>
              <Input type="text" name="first_name" defaultValue={account.first_name} placeholder="Satoshi" />
            </Form.Field>

            <Form.Field className="w-full">
              <Form.Field.Label htmlFor="last_name">Last name</Form.Field.Label>
              <Input type="text" name="last_name" defaultValue={account.last_name} placeholder="Nakamoto" />
            </Form.Field>
          </Form.Horizontal>
        </Form.Section>
        <Form.Section title="Payments">
          <Form.Field className="w-full">
            <Form.Field.Label htmlFor="public_key" hideSuffix>
              Public key
            </Form.Field.Label>
            <Input
              type="text"
              name="public_key"
              defaultValue={account.public_key}
              placeholder="xpub661MyMwAqRbcGjFB7GhGVVtib1BoHoFWLpFKcvnKdmbq6Z5oXLZxyG486JQQBx3N1vXF1JgcvCiXqRXbMBTi46y8QUdNE6on1HyVYpTkcS4"
            />
            <span className="text-sm text-gray-500">
              Some auctions use a 2-of-3 multisig wallet, to sign transactions we&apos;ll need your public key
            </span>
          </Form.Field>
        </Form.Section>
        <Form.Section title="Mining pool">
          <Form.Field className="w-full">
            <Form.Field.Label htmlFor="mining_pool_address">Mining pool address</Form.Field.Label>
            <Input
              type="text"
              name="mining_pool_address"
              defaultValue={account.pool_user?.pool}
              placeholder="stratum+tcp://stratum.braiins.com:3333"
            />
          </Form.Field>

          <Form.Field className="w-full">
            <Form.Field.Label htmlFor="mining_pool_username">Mining pool username</Form.Field.Label>
            <Input type="text" name="mining_pool_username" defaultValue={account.pool_user?.username} placeholder="satoshi.worker" />
          </Form.Field>
        </Form.Section>

        <Form.Section title="Contact details">
          <Form.Field className="w-full">
            <Form.Field.Label htmlFor="phone_number">Phone no.</Form.Field.Label>
            <Input type="text" name="phone_number" defaultValue={account.phone_number} placeholder="-" />
          </Form.Field>

          <Form.Field className="w-full">
            <Form.Field.Label htmlFor="telegram_username">Telegram username</Form.Field.Label>
            <Input type="text" name="telegram_username" defaultValue={account.telegram_username} placeholder="-" />
          </Form.Field>
        </Form.Section>

        <Form.Section title="Other">
          <Form.Field className="w-full" disabled={true}>
            <Form.Field.Label htmlFor="referral_code">Referral code</Form.Field.Label>
            <Input type="text" name="referral_code" defaultValue={account.referral_code} placeholder="-" />
          </Form.Field>
        </Form.Section>

        <div className="flex w-full justify-end px-4 pb-4">
          <Form.Submit>Save</Form.Submit>
        </div>
      </Form>
    </AccountView>
  )
}

export default protect(Account)
