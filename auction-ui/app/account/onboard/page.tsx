/* eslint-disable react/jsx-no-bind */
'use client'

import { useRouter } from 'next/navigation'

import { Container, Form, Input, Loader } from 'src/core'
import { updateAccount } from 'src/api/auth/updateAccount'
import { useAccount } from 'src/hooks'
import { useEffect } from 'react'

export default function Onboard() {
  const { account, token, loading, isOnboardingComplete } = useAccount()
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
    if (!loading && isOnboardingComplete) {
      router.push('/')
    }
  }, [loading, isOnboardingComplete, router])

  if (loading || isOnboardingComplete) {
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
          <Form.Field.Label htmlFor="bidding_name">Bidding Name</Form.Field.Label>
          <Input type="text" name="bidding_name" defaultValue={account.username} />
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
