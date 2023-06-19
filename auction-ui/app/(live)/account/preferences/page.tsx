/* eslint-disable react/jsx-no-bind */
'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import AccountView from 'src/components/pages/account/AccountView'
import { Button, Form, Loader } from 'src/core'
import protect from 'src/hoc/protect'
import { useAccountContext } from 'src/providers/AccountProvider'
import { Input, Checkbox } from 'src/core'
import { AccountPreferences } from 'src/api/auction/types'
import { updateAccountPreferences } from 'src/api/auth/updateAccountPreferences'
import { disconnectTelegram } from 'src/api/account/disconnectTelegram'
import { checkTelegram } from 'src/api/account/checkTelegram'

const events = [
  { key: 'event_bid_placed', label: 'Bids > Bid placed' },
  { key: 'event_proxy_bid_placed', label: 'Bids > Proxy bid placed' },
  { key: 'event_outbid', label: 'Bids > Outbid' },
  { key: 'event_auction_started', label: 'Auctions > Start' },
  { key: 'event_auction_ended', label: 'Auctions > End' },
  { key: 'event_hashrate_delivery_started', label: 'Hashrate Delivery > Start' },
  { key: 'event_hashrate_delivery_ended', label: 'Hashrate Delivery > End' },
]

let interval: ReturnType<typeof setInterval> | undefined = undefined

function Preferences() {
  const { account, isLoading: isAccountLoading, token, refresh } = useAccountContext()
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

  const pollTelegramConnectStatus = async () => {
    if (!account) {
      return
    }

    const exists = await checkTelegram(account.email)
    if (!exists) {
      return
    }

    clearInterval(interval)
    interval = undefined
    await refresh()
  }

  const handleConnectTelegram = () => {
    window.open('https://t.me/RiglyNotificationBot', '_blank')

    pollTelegramConnectStatus()
    interval = setInterval(pollTelegramConnectStatus, 5000)
  }

  const handleDisconnectTelegram = async () => {
    if (!account) {
      return
    }

    const err = await disconnectTelegram(account.email)
    if (err) {
      return toast.error(err)
    }

    await refresh()
    toast.success('Telegram account disconnected')
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
  const showTelegramConnect = !account.telegram_username && preferences.telegram
  const showTelegramDisconnect = account.telegram_username && preferences.telegram

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

          {(showSmsWarning || showTelegramConnect || showTelegramDisconnect) && (
            <div className="flex w-full flex-col gap-2">
              {showSmsWarning && (
                <span className="text-sm text-red-500">
                  Warning: Please set your phone number on the Account page to receive SMS notifications
                </span>
              )}
              {showTelegramConnect && (
                <div className="flex flex-col items-start gap-2">
                  <span className="text-sm text-red-500">
                    Warning: Please connect your Telegram account on the Account page to receive Telegram notifications
                  </span>
                  <div className="flex items-center justify-start gap-2">
                    <Input type="text" name="telegram_code" placeholder="Telegram code" value={account.telegram_code} disabled />
                    <Button type="button" onClick={handleConnectTelegram} className="h-10">
                      Connect
                    </Button>
                  </div>
                </div>
              )}
              {showTelegramDisconnect && (
                <div className="flex flex-col items-start gap-2">
                  <span className="text-sm text-gray-500">Disconnect your Telegram account using the button below:</span>
                  <div className="flex items-center justify-start gap-2">
                    <Button type="button" onClick={handleDisconnectTelegram} className="h-10">
                      Disconnect
                    </Button>
                  </div>
                </div>
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
