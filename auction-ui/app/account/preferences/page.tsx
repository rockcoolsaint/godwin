/* eslint-disable react/jsx-no-bind */
'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import AccountView from 'src/components/pages/account/AccountView'
import { Form, Loader } from 'src/core'
import protect from 'src/hoc/protect'
import { useAccountContext } from 'src/providers/AccountProvider'
import { Checkbox } from 'src/core'
import { AccountPreferences } from 'src/api/auction/types'
import { updateAccountPreferences } from 'src/api/auth/updateAccountPreferences'

const events = [
  { key: 'event_bid_placed', label: 'Bids > Bid placed' },
  { key: 'event_outbid', label: 'Bids > Outbid' },
  { key: 'event_auction_started', label: 'Auctions > Start' },
  { key: 'event_auction_ended', label: 'Auctions > End' },
  { key: 'event_hashrate_delivery_started', label: 'Hashrate Delivery > Start' },
  { key: 'event_hashrate_delivery_ended', label: 'Hashrate Delivery > End' },
]

function Preferences() {
  const { account, isLoading: isAccountLoading, token } = useAccountContext()
  const [loading, setLoading] = useState<boolean>(false)
  const [preferences, setPreferences] = useState<AccountPreferences | undefined>(undefined)

  const handleSubmit = async () => {
    if (!token || !preferences) {
      return
    }

    try {
      setLoading(true)

      const updateSuccess = await updateAccountPreferences(preferences, token)
      if (updateSuccess) {
        toast.success('Your changes have been saved.')
      }
    } catch (ex) {
      console.error(ex)
    } finally {
      setLoading(false)
    }
  }

  const updatePreferences = (key: string, value: boolean) => {
    setPreferences({ ...preferences, [key]: value } as AccountPreferences)
  }

  useEffect(() => {
    if (!isAccountLoading && account) {
      setPreferences(account.preferences)
    }
  }, [account, isAccountLoading])

  if (isAccountLoading || !preferences) {
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

  const showSmsWarning = !account.phone_number && preferences.sms
  const showTelegramWarning = !account.telegram_username && preferences.telegram

  return (
    <AccountView>
      <Form className="items-start gap-8" onSubmit={handleSubmit} disabled={loading}>
        <Form.Section title="Notification > Methods">
          <div className="flex w-full flex-col gap-2">
            <span className="text-sm text-gray-500">Please select your preferred notification method(s) from the options below:</span>
          </div>

          <Form.Horizontal className="justify-start">
            <Form.Field className="items-center justify-start">
              <Form.Field.Label className="cursor-pointer" htmlFor="email" hideSuffix>
                E-mail
              </Form.Field.Label>
              <Checkbox name="email" defaultValue={preferences.email} onChange={val => updatePreferences('email', val)} />
            </Form.Field>
            <Form.Field className="items-center justify-start">
              <Form.Field.Label className="cursor-pointer" htmlFor="sms" hideSuffix>
                SMS
              </Form.Field.Label>
              <Checkbox name="sms" defaultValue={preferences.sms} onChange={val => updatePreferences('sms', val)} />
            </Form.Field>

            <Form.Field className="items-center justify-start">
              <Form.Field.Label className="cursor-pointer" htmlFor="telegram" hideSuffix>
                Telegram
              </Form.Field.Label>
              <Checkbox name="telegram" defaultValue={preferences.telegram} onChange={val => updatePreferences('telegram', val)} />
            </Form.Field>
          </Form.Horizontal>

          {(showSmsWarning || showTelegramWarning) && (
            <div className="flex w-full flex-col gap-2">
              {showSmsWarning && (
                <span className="text-sm text-red-500">
                  Warning: Please set your phone number on the Account page to receive SMS notifications
                </span>
              )}
              {showTelegramWarning && (
                <span className="text-sm text-red-500">
                  Warning: Please set your Telegram username on the Account page to receive Telegram notifications
                </span>
              )}
            </div>
          )}
        </Form.Section>
        <Form.Section title="Notification > Triggers">
          <div className="flex w-full flex-col gap-2">
            <span className="text-sm text-gray-500">Specify for which events you wish to receive notifications:</span>
          </div>

          {events.map((field, i) => {
            return (
              <Form.Field className="flex w-full items-center" key={i}>
                <Form.Field.Label className="cursor-pointer" htmlFor={field.key} hideSuffix>
                  {field.label}
                </Form.Field.Label>
                <Checkbox
                  name={field.key}
                  defaultValue={preferences[field.key as keyof AccountPreferences]}
                  onChange={val => updatePreferences(field.key, val)}
                />
              </Form.Field>
            )
          })}
        </Form.Section>
        <div className="flex w-full justify-end px-4 pb-4">
          <Form.Submit>Save</Form.Submit>
        </div>
      </Form>
    </AccountView>
  )
}

export default protect(Preferences)
