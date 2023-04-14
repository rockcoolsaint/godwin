/* eslint-disable react/jsx-no-bind */
'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import Link from 'src/components/shared/Link'
import { Container, Form, Input } from 'src/core'
import Icon from 'src/core/components/Icon'
import { useTranslation } from 'src/hooks'
import { useAccountContext } from 'src/providers/AccountProvider'

enum LoginView {
  Login = 0,
  EmailSent = 1,
}

export default function Login() {
  const searchParams = useSearchParams()
  const { login } = useAccountContext()
  const { t } = useTranslation()

  const [loading, setLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string | undefined>(undefined)
  const [view, setView] = useState(LoginView.Login)

  const handleSubmit = async (data: any) => {
    try {
      setLoading(true)
      setEmail(data.email)
      setView(LoginView.EmailSent)

      const returnUrl = searchParams.get('return_url')

      await login(data.email, returnUrl)
    } catch (ex) {
      console.error(ex)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="flex h-full justify-center py-20">
      {view === LoginView.Login && (
        <div className="flex w-full flex-col sm:w-3/4 lg:w-2/4 xl:w-[25vw]">
          <h1 className="mb-2 text-2xl font-bold tracking-tight">{t('login.sign_in')}</h1>
          <div className="flex items-center justify-start gap-1">
            <span className="text-sm text-gray-500">{t('login.description')}</span>
          </div>
          <Form className="mt-8 items-start gap-8" onSubmit={handleSubmit} disabled={loading}>
            <Form.Field className="w-full" required>
              <Form.Field.Label htmlFor="email">{t('login.email')}</Form.Field.Label>
              <Input type="email" name="email" placeholder="satoshi@gmx.com" />
            </Form.Field>

            <Form.Submit className="w-full">{t('login.sign_in')}</Form.Submit>
          </Form>
          <div className="mt-8 flex justify-center border-t border-gray-300 pt-6">
            <Link href="/register" className="text-primary underline">
              {t('login.no_account_yet')}
            </Link>
          </div>
        </div>
      )}
      {view === LoginView.EmailSent && (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 sm:w-3/4 lg:w-2/4 xl:w-[25vw]">
          <Icon icon="envelopeCircleCheck" className="h-20 w-20 text-gray-300" />
          <span className="text-center text-gray-500" dangerouslySetInnerHTML={{ __html: t('login.email_sent_note', { email }) }}></span>
          <div className="mt-8 flex justify-center border-t border-gray-300 pt-6">
            <Link href="/register" className="text-primary underline">
              {t('login.no_account_yet')}
            </Link>
          </div>
        </div>
      )}
    </Container>
  )
}
