/* eslint-disable react/jsx-no-bind */
'use client'
import { useState } from 'react'
import { register } from 'src/api/auth/register'
import { Input, Tabs } from 'src/core'

import Container from 'src/core/components/Container'
import Form from 'src/core/components/Form'
import { useTranslation } from 'src/hooks'

export default function Register() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState<boolean>(false)
  const [tab, setTab] = useState<string>('input')

  const handleSubmit = async (data: any) => {
    try {
      setLoading(true)

      await register({
        email: data.email,
        mining_pool_username: data.mining_pool_username || '',
        mining_pool_address: data.mining_pool_address || '',
        referral_code: data.referral_code || '',
      })
    } catch (ex) {
      console.error(ex)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 3000)
    }
  }

  return (
    <Container className="flex h-full justify-center py-40">
      <div className="flex flex-col">
        <h1 className="mb-2 text-2xl font-bold tracking-tight">{t('registration.sign_up')}</h1>
        <div className="flex items-center justify-start gap-1">
          <span className="text-sm text-gray-500">{t('registration.description')}</span>
        </div>

        <Form className="mt-8 min-w-[30vw] items-start gap-8" onSubmit={handleSubmit} disabled={loading}>
          <Form.Field className="w-full" required>
            <Form.Field.Label htmlFor="email">{t('registration.email')}</Form.Field.Label>
            <Input type="email" name="email" placeholder="satoshi@gmx.com" />
          </Form.Field>

          <div className="flex w-full flex-col gap-2">
            <Form.Field.Label hideSuffix>{t('registration.mining_pool_account')}</Form.Field.Label>
            <Tabs value={tab} onChange={setTab}>
              <Tabs.Tab value="input">
                <span className="text-xs">{t('registration.use_existing_pool_account')}</span>
              </Tabs.Tab>

              <Tabs.Tab value="generate">
                <span className="text-xs">{t('registration.create_pool_account')}</span>
              </Tabs.Tab>
            </Tabs>
          </div>

          {tab === 'input' && (
            <>
              <Form.Field className="w-full">
                <Form.Field.Label htmlFor="mining_pool_username">{t('registration.mining_pool_username')}</Form.Field.Label>
                <Input type="text" name="mining_pool_username" placeholder="satoshi.worker" />
              </Form.Field>

              <Form.Field className="w-full">
                <Form.Field.Label htmlFor="mining_pool_address">{t('registration.mining_pool_address')}</Form.Field.Label>
                <Input type="text" name="mining_pool_address" placeholder="stratum+tcp://stratum.braiins.com:3333" />
              </Form.Field>
            </>
          )}

          <Form.Field className="w-full">
            <Form.Field.Label htmlFor="referral_code">{t('registration.referral_code')}</Form.Field.Label>
            <Input type="text" name="referral_code" placeholder="012ABC" />
          </Form.Field>

          {tab === 'generate' && (
            <div className="flex w-full">
              <span className="text-sm text-gray-500">{t('registration.mining_pool_details_note')}</span>
            </div>
          )}

          <Form.Submit className="w-full">{t('registration.sign_up')}</Form.Submit>
        </Form>
      </div>
    </Container>
  )
}
