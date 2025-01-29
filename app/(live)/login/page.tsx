/* eslint-disable react/jsx-no-bind */
'use client'

import { useEffect, useState } from 'react'
import Link from 'src/components/shared/Link'
import { Container, Form, Input, Loader } from 'src/core'
import Icon from 'src/core/components/Icon'
import { useTranslation } from 'src/hooks'
// import useReturnUrl from 'src/hooks/useReturnUrl'
import { useAccountContext } from 'src/providers/AccountProvider'
import { toast } from 'react-hot-toast'
import { LoginView } from 'src/utils/constants'
import { LocalStorageKeys } from 'src/constants/localStorage'

export default function Login() {
  const { login } = useAccountContext()
  const { t } = useTranslation()
  // const returnUrl = useReturnUrl({ excludeKey: true, encode: true })

  const [loading, setLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string | undefined>('') // Default to an empty string for controlled input
  const [view, setView] = useState(LoginView.Login)

  useEffect(() => {
    const storedEmail = window.localStorage.getItem(LocalStorageKeys.Login.email)
    if (storedEmail) {
      setEmail(storedEmail)
    }
  }, [])

  const handleSubmit = async (data: any) => {
    try {
      setLoading(true)
      setEmail(data.email)

      // const [success, error] = await login(data.email, returnUrl)
      // if (!success) {
      //   throw error
      // }

      // Pass '/pages/dashboard' directly instead of returnUrl
      const [success, error] = await login(data.email, '/pages/dashboard')
      if (!success) {
        throw error
      }

      setView(LoginView.EmailSent)
    } catch (ex: any) {
      toast.error(ex.message)
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
            <Form.Field className="w-full flex-col" required>
              <Form.Field.Label htmlFor="email">{t('login.email')}</Form.Field.Label>
              <Input
                type="email"
                name="email"
                placeholder="satoshi@gmx.com"
                value={email} // Bind the value to the state
                onChange={e => setEmail(e.target.value)} // Update the state on change
              />
            </Form.Field>

            <Form.Submit className="w-full">{loading ? <Loader height={20} width={20} /> : <span>{t('login.sign_in')}</span>}</Form.Submit>
          </Form>
          <div className="mt-8 flex justify-center border-t border-gray-300 pt-6">
            <Link href="/register" className="text-primary underline">
              {t('login.no_account_yet')}
            </Link>
          </div>
        </div>
      )}
      {view === LoginView.EmailSent && (
        <div className="flex size-full flex-col items-center justify-center gap-4 sm:w-3/4 lg:w-2/4 xl:w-[25vw]">
          <Icon icon="envelopeCircleCheck" className="size-20 text-gray-300" />
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
