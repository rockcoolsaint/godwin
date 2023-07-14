/* eslint-disable react/jsx-no-bind */
'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { updateAccount } from 'src/api/auth/updateAccount'
import AccountView from 'src/components/pages/account/AccountView'
import { Form, Input, Loader } from 'src/core'
import { useAccountContext } from 'src/providers/AccountProvider'
import protect from 'src/hoc/protect'
import { getHashrateDeliveries } from 'src/api/account/getHashrateDeliveries'

function Hashrate() {
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
    } catch (ex: any) {
      toast.error(ex.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const loadHashrateDeliveries = async () => {
      if (!token) {
        return
      }

      try {
        const res = await getHashrateDeliveries(token)
        // TODO: @Jeezman to use response for completing https://github.com/RiglyCorp/rigly-auction/issues/282
        // eslint-disable-next-line no-console
        console.log(res)
      } catch (ex) {
        console.error(ex)
      } finally {
        setLoading(false)
      }
    }

    loadHashrateDeliveries()
  }, [token])

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
        <Form.Section title="Mining Pool">
          <Form.Field className="w-full flex-col">
            <Form.Field.Label htmlFor="mining_pool_username">Mining Pool Username</Form.Field.Label>
            <Input
              type="text"
              name="mining_pool_username"
              defaultValue={account.pool_user ? account.pool_user.username : ''}
              placeholder="satoshi"
            />
          </Form.Field>
          <Form.Field className="w-full flex-col">
            <Form.Field.Label htmlFor="mining_pool_address">Mining Pool Address</Form.Field.Label>
            <Input
              type="text"
              name="mining_pool_address"
              defaultValue={account.pool_user ? account.pool_user.pool : ''}
              placeholder="stratum+tcp://stratum.braiins.com:3333"
            />
          </Form.Field>
        </Form.Section>

        <div className="flex w-full justify-end px-4 pb-4">
          <Form.Submit>Save</Form.Submit>
        </div>
      </Form>
    </AccountView>
  )
}

export default protect(Hashrate)
