/* eslint-disable react/jsx-no-bind */
'use client'

import { useState } from 'react'
import { updateAccount } from 'src/api/auth/updateAccount'
import AccountView from 'src/components/pages/account/AccountView'
import { Form, Input, Loader } from 'src/core'
import protect from 'src/hoc/protect'
import { useAccountContext } from 'src/providers/AccountProvider'
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline' // Add this import
import { toast } from 'react-hot-toast'

function Account() {
  const { account, isLoading: isAccountLoading, token } = useAccountContext()
  const [loading, setLoading] = useState<boolean>(false)
  const userReferral = `${window.location.origin}/register?referral=${account.referral_code}`

  const handleCopyReferral = () => {
    const referralUrl = `${window.location.origin}/register?referral=${account.referral_code}`
    navigator.clipboard.writeText(referralUrl)
    toast.success('Referral link copied to clipboard!')
  }

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
          <Form.Field className="w-full flex-col">
            <Form.Field.Label htmlFor="username">Username</Form.Field.Label>
            <Input type="text" name="username" defaultValue={account.username} placeholder="Anonymous" className="w-1/4"/>
          </Form.Field>
          <span className="text-sm text-gray-500">
              This name is shown when you bid on auctions. By default it is anonymous.
            </span>
        </Form.Section>
        <Form.Section title="Payments">
          <Form.Field className="w-full flex-col">
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
              In the future, some auctions will support a 2-of-3 multisig wallet, to sign transactions we&apos;ll need your public key
            </span>
          </Form.Field>
          <Form.Field className="w-full flex-col">
            <Form.Field.Label htmlFor="refund_address">Refund address</Form.Field.Label>
            <Input type="text" name="refund_address" defaultValue={account.refund_address} placeholder="-" />
          </Form.Field>
        </Form.Section>

        <Form.Section title="Referral details">
          <Form.Field className="w-full flex-col">
            <Form.Field.Label htmlFor="referral_code">Your referral code</Form.Field.Label>
            <div className="flex items-center gap-2"> {/* This div ensures inline layout */}
            <Input 
              type="text" 
              name="referral_code" 
              defaultValue={account.referral_code} 
              placeholder="Enter your referral code"
              className="w-1/4" 
            />
            <button
                type="button"
                onClick={handleCopyReferral}
                className="flex items-center justify-center p-2 text-gray-500 hover:text-primary transition-colors"
                title="Copy referral link"
              >
                <ClipboardDocumentIcon className="h-5 w-5" />
            </button>
            </div>
            <span className="text-sm text-gray-500">
              Share your referral code with friends and earn free hashrate!
            </span>
            <span className="text-sm text-gray-500">
              You and your referral will both earn <b>1 day @ 120 TH/s mining</b> after their first purchase.
            </span>
            <span className="text-sm text-gray-500">
              Feel free to update your code as you like!
            </span>
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
