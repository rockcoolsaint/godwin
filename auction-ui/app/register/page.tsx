'use client'

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { register } from 'src/api/auth/register'
import SignUp from 'src/components/pages/signup'
import Link from 'src/components/shared/Link'
import { Input } from 'src/core'

import Container from 'src/core/components/Container'
import Form from 'src/core/components/Form'
import Icon from 'src/core/components/Icon'
import { useNotificationContext } from 'src/core/providers/NotificationProvider'
import { useTranslation } from 'src/hooks'
import useReturnUrl from 'src/hooks/useReturnUrl'

enum RegisterView {
  Register = 0,
  EmailSent = 1,
}

export default function Register() {
  const { t } = useTranslation()
  const { error } = useNotificationContext()
  const returnUrl = useReturnUrl({ excludeKey: true, encode: true })

  const [loading, setLoading] = useState<boolean>(false)
  // const [tab, setTab] = useState<string>('input')
  const tab = 'input'
  const [email, setEmail] = useState<string | undefined>(undefined)
  const [view, setView] = useState(RegisterView.Register)

  const handleSubmit = async (data: any) => {
    try {
      setLoading(true)
      setEmail(data.email)

      const [success, error] = await register(
        {
          email: data.email,
          mining_pool_username: data.mining_pool_username || '',
          mining_pool_address: data.mining_pool_address || '',
          referral_code: data.referral_code || '',
          // create_pool_account: tab === 'generate',
          create_pool_account: false,
        },
        returnUrl,
      )

      if (!success) {
        throw error
      }

      setView(RegisterView.EmailSent)
    } catch (ex: any) {
      error({
        title: 'Error',
        content: ex.message,
      })
      console.error(ex)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 3000)
    }
  }

  return (
    <Container className="flex justify-center py-20">
      {view === RegisterView.Register && (
        <div className="flex w-3/4 flex-col">
          <SignUp />
        </div>
      )}
      {view === RegisterView.EmailSent && (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 sm:w-3/4 lg:w-2/4 xl:w-[25vw]">
          <Icon icon="envelopeCircleCheck" className="h-20 w-20 text-gray-300" />
          <span className="text-center text-gray-500" dangerouslySetInnerHTML={{ __html: t('login.email_sent_note', { email }) }}></span>
          <div className="mt-8 flex justify-center border-t border-gray-300 pt-6">
            <Link href="/login" className="text-primary underline">
              {t('registration.has_account_already')}
            </Link>
          </div>
        </div>
      )}
    </Container>
  )
}
