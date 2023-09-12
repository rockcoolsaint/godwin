'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Container, Loader } from 'src/core'
import { Input } from 'src/core'
import { useTranslation } from 'src/hooks'
import * as yup from 'yup'
import { toast } from 'react-hot-toast'
import { createOrder } from 'src/api/orders/createOrder'
import createDirectOrderPayment from 'src/api/checkout/createDirectOrderPayment'
import { useRouter } from 'next/navigation'
import { register as postRegister } from 'src/api/auth/register'

const useSignUpSchema = () => {
  const schema = useMemo(
    () =>
      yup
        .object({
          email: yup
            .string()
            .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, () => 'Email not valid')
            .required(() => 'Email required'),
        })
        .required(),
    [],
  )

  return schema
}

interface FormInputs {
  email: string
}

export default function Mining() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState(0)
  const router = useRouter()

  const signUpSchema = useSignUpSchema()

  const signUpInfo = {
    email: '',
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<FormInputs>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      ...signUpInfo,
    },
  })

  const onSubmit: SubmitHandler<FormInputs> = useCallback(
    async value => {
      try {
        setLoading(true)

        const [success, data] = await postRegister({
          email: value.email,
          mining_pool_address: '',
          mining_pool_username: '',
          create_pool_account: false,
        })

        let order = undefined

        if (data?.id) {
          setStatus(1)
          order = await createOrder({ account_id: data?.id })
        }

        let payment = undefined
        if (order?.id) {
          setStatus(2)
          payment = await createDirectOrderPayment(
            order.id,
            `${process.env.NEXT_PUBLIC_APP_CALLBACK_URL}/tabconf/success?order_id=${order.id}`,
          )
        }

        if (payment?.payment_id) {
          router.push(payment?.checkout_url)
        }

        if (!success) {
          toast.error('Error')
        }

        reset(
          {
            email: '',
          },
          { keepTouched: false, keepDirty: false },
        )
        toast.success('Payment created')
        setLoading(false)
      } catch (err) {
        setLoading(false)
        toast.error('Error')
      }
    },
    [reset, router],
  )

  const renderStatus = () => {
    if (status === 0) {
      return <p className="mt-1 text-sm text-dark-200">Creating your account...</p>
    }
    if (status === 1) {
      return (
        <div className="flex flex-col items-center justify-center">
          <p className="mt-1 text-sm text-green-500">Account created</p>
          <p className="mt-1 text-sm text-dark-200">Creating order...</p>
        </div>
      )
    }
    if (status === 2) {
      return (
        <div className="flex flex-col items-center justify-center">
          <p className="mt-1 text-sm text-green-500">Account created</p>
          <p className="mt-1 text-sm text-green-500">Order created</p>
          <p className="mt-1 text-sm text-dark-200">Creating payment...</p>
        </div>
      )
    }
  }

  if (loading) {
    return (
      <div id="test-mine" className="mt-24 flex h-screen flex-col items-center justify-center">
        <Loader />
        {renderStatus()}
      </div>
    )
  }

  return (
    <Container id="test-mine" className="flex h-screen items-center justify-center">
      <section className="flex w-3/12 flex-col items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
          <h1 className="mb-4">Test Drive</h1>
          <div className="flex">
            <div>
              <h5 className="font-semibold">Hashrate</h5>
              <p className="text-sm text-gray-600">88 TH/s</p>
            </div>
            <div className="mx-4">
              <h5 className="font-semibold">Duration</h5>
              <p className="text-sm text-gray-600">3 hours</p>
            </div>
            <div>
              <h5 className="font-semibold">Price</h5>
              <p className="text-sm text-gray-600">500 sats</p>
            </div>
          </div>
          <div className="w-full">
            <Input
              className="text-gray-600"
              id="email"
              type="text"
              autoComplete="off"
              autoCorrect="off"
              defaultValue={signUpInfo.email}
              errorMessage={errors.email?.message}
              placeholder="satoshi@gmx.com"
              label={t('registration.email')}
              {...register('email')}
            />
          </div>
          <button
            disabled={!isDirty || !isValid}
            type="submit"
            className="mt-8 flex h-12 w-full items-center justify-center rounded-lg bg-gradient px-5 text-white outline-none hover:bg-gradient-hover disabled:cursor-not-allowed disabled:bg-gradient-disabled"
          >
            Zap to hash
          </button>
        </form>
      </section>
    </Container>
  )
}
