/* eslint-disable react/jsx-no-bind */
'use client'

import { useRouter } from 'next/navigation'

import { Container, Form, Input, Loader } from 'src/core'
import { updateAccount } from 'src/api/auth/updateAccount'
import { useEffect } from 'react'
import { useAccountContext } from 'src/providers/AccountProvider'

export default function Onboard() {
  const { account, token, isLoading } = useAccountContext()
  const router = useRouter()

  const handleSubmit = async (data: object) => {
    if (token) {
      // TODO: Validate whether data satisfies requirements to complete onboarding.
      const success = await updateAccount({ ...data, onboarding_complete: true }, token)
      if (success) {
        router.push('/')
      }
    }
  }

  useEffect(() => {
    if (!isLoading && account && account.is_onboarded) {
      router.push('/')
    }
  }, [isLoading, account, router])

  if (isLoading || (account && account.is_onboarded)) {
    return (
      <Container>
        <div className="itemc-center flex justify-center">
          <Loader />
        </div>
      </Container>
    )
  }

  if (!account) {
    return (
      <Container>
        <div className="itemc-center flex justify-center">Unauthorized</div>
      </Container>
    )
  }

  return (
    <Container>
      <h1>Complete your account</h1>
      <Form className="mt-8 gap-8" onSubmit={handleSubmit}>
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
    </Container>
  )
}
