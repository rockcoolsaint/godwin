/* eslint-disable react/jsx-no-bind */
'use client'

import { useRouter } from 'next/navigation'

import { Form, Input, Loader } from 'src/core'
import { updateAccount } from 'src/api/auth/updateAccount'
import { useEffect, useState } from 'react'
import { useAccountContext } from 'src/providers/AccountProvider'
import protect from 'src/hoc/protect'
import ContentContainer from 'src/components/shared/ContentContainer'

function Onboard() {
  const { account, token, isLoading: isAccountLoading } = useAccountContext()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async (data: object) => {
    if (token) {
      setIsLoading(true)
      try {
        // TODO: Validate whether data satisfies requirements to complete onboarding.
        const success = await updateAccount({ ...data, is_onboarded: true }, token)

        if (success) {
          router.push('/')
        }
      } catch (ex) {
        console.error(ex)
      } finally {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    if (!isAccountLoading && account && account.is_onboarded) {
      router.push('/')
    }
  }, [isAccountLoading, account, router])

  if (isAccountLoading || !account || (account && account.is_onboarded)) {
    return (
      <ContentContainer>
        <div className="itemc-center flex justify-center">
          <Loader />
        </div>
      </ContentContainer>
    )
  }

  return (
    <ContentContainer>
      <h1>Complete your account</h1>
      <Form className="mt-8 gap-8" onSubmit={handleSubmit} disabled={isLoading}>
        <Form.Field>
          <Form.Field.Label htmlFor="username">Username</Form.Field.Label>
          <Input type="text" name="username" defaultValue={account.username} />
        </Form.Field>
        <Form.Field>
          <Form.Field.Label htmlFor="mining_pool_username">Mining Pool Username</Form.Field.Label>
          <Input type="text" name="mining_pool_username" />
        </Form.Field>
        <Form.Field>
          <Form.Field.Label htmlFor="mining_pool_server">Mining Pool Server</Form.Field.Label>
          <Input type="text" name="mining_pool_server" />
        </Form.Field>
        <Form.Field>
          <Form.Field.Label htmlFor="referral_code">Referral Code</Form.Field.Label>
          <Input type="text" name="referral_code" />
        </Form.Field>

        <Form.Submit>Continue &rarr;</Form.Submit>
      </Form>
    </ContentContainer>
  )
}

export default protect(Onboard)
