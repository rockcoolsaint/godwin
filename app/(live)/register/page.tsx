'use client'

import { useState } from 'react'
import SignUp from 'src/components/pages/signup'

import Container from 'src/core/components/Container'
import Icon from 'src/core/components/Icon'
import { useTranslation } from 'src/hooks'

enum RegisterView {
  Register = 0,
  EmailSent = 1,
}

export default function Register() {
  const { t } = useTranslation()
  const [email, setEmail] = useState<string | undefined>(undefined)
  const [view, setView] = useState(RegisterView.Register)

  return (
    <Container className="flex justify-center py-20">
      {view === RegisterView.Register && (
        <div className="flex w-3/4 flex-col">
          <SignUp setView={() => setView(RegisterView.EmailSent)} setEmail={(email: string) => setEmail(email)} />
        </div>
      )}
      {view === RegisterView.EmailSent && (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 sm:w-3/4 lg:w-2/4 xl:w-[25vw]">
          <Icon icon="envelopeCircleCheck" className="h-20 w-20 text-gray-300" />
          <span className="text-center text-gray-500" dangerouslySetInnerHTML={{ __html: t('registration.email_sent_note', { email }) }}></span>
        </div>
      )}
    </Container>
  )
}