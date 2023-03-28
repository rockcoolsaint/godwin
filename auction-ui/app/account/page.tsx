/* eslint-disable react/jsx-no-bind */
'use client'

import { useState } from 'react'
import { updateAccount } from 'src/api/auth/updateAccount'
import AccountView from 'src/components/pages/account/AccountView'
import { Form, Input, Loader } from 'src/core'
import { useAccount } from 'src/hooks'

export default function Account() {
  const { account, loading: accountLoading, token } = useAccount()
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (data: object) => {
    if (!token) {
      return
    }

    try {
      setLoading(true)

      const success = await updateAccount(data, token)
      if (!success) {
        console.log('Account updated')
      }
    } catch (ex) {
      console.error(ex)
    } finally {
      setLoading(false)
    }
  }

  if (accountLoading) {
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
      <Form className="items-start p-4" onSubmit={handleSubmit} disabled={loading}>
        <Form.Field className="w-full">
          <Form.Field.Label htmlFor="bidding_name">Bidding Name</Form.Field.Label>
          <Input type="text" name="bidding_name" defaultValue={account.bidding_name} placeholder="Anonymous" />
        </Form.Field>

        <Form.Submit>Save</Form.Submit>
      </Form>
    </AccountView>
  )
}
