'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useState, useCallback, useMemo } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { createOrder } from 'src/api/orders/createOrder'
import createDirectOrderPayment from 'src/api/checkout/createDirectOrderPayment'
import { Loader } from 'src/core'
import Input from 'src/core/components/Input'
import { useRouter } from 'next/navigation'
import { register as postRegister } from 'src/api/auth/register'
import Link from 'src/components/shared/Link'

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

export default function TestDrive() {
  const [loading, setLoading] = useState(false)
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
          create_pool_account: true,
        })

        let order = undefined

        if (data?.id) {
          setStatus(1)
          order = await createOrder({ account_id: data?.id, amount_sats: 1000 })
        }

        let payment = undefined
        if (order?.id) {
          setStatus(2)
          payment = await createDirectOrderPayment(
            order.id,
            `${process.env.NEXT_PUBLIC_APP_CALLBACK_URL}/direct-order/td/success?order_id=${order.id}`,
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
      return <p className="mt-1 font-epilogue text-xl font-bold text-dark-200">Creating your account...</p>
    }
    if (status === 1) {
      return (
        <div className="flex flex-col items-center justify-center font-epilogue text-xl font-bold">
          <p className="mt-1 text-green-500">Account created</p>
          <p className="mt-1 text-dark-200">Creating order...</p>
        </div>
      )
    }
    if (status === 2) {
      return (
        <div className="flex flex-col items-center justify-center font-epilogue text-xl font-bold">
          <p className="mt-1 text-green-500">Account created</p>
          <p className="mt-1 text-green-500">Order created</p>
          <p className="mt-1 text-dark-200">Creating payment...</p>
        </div>
      )
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-center rounded-xl bg-white p-4 py-8 sm:px-10">
        <h2 className="bg-gradient-to-r from-[#5C3FAF] to-[#316AEF] bg-clip-text font-chakra text-2xl font-bold text-transparent lg:text-4xl 2xl:text-7xl">

          Get started
        </h2>
        <p className="my-4 w-full text-center font-epilogue text-xs font-normal text-gray-500 lg:my-8 lg:w-3/5 lg:text-xl 2xl:w-7/12 2xl:text-3xl">
          Includes a{' '}
          <Link href="https://braiins.com/pool" target="_blank" className="text-blue-500 hover:underline">
            Braiins
          </Link>{' '}
          mining pool account
        </p>
        <div className="flex w-full flex-col rounded border border-solid border-black p-10 items-center">
          <div className="flex w-11/12 items-center justify-between lg:w-7/12 2xl:mb-10">
            <p className="flex flex-col items-center justify-center text-center">
              <h5 className="text-sm font-bold lg:text-xl 2xl:text-3xl">Hashrate</h5>
              <p className="text-xs lg:text-base 2xl:text-xl">120 TH/s</p>
            </p>
            <p className="flex flex-col items-center justify-center text-center">
              <h5 className="text-sm font-bold lg:text-xl 2xl:text-3xl">Duration</h5>
              <p className="text-xs lg:text-base 2xl:text-xl">3 hours</p>
            </p>
            <p className="flex flex-col items-center justify-center text-center">
              <h5 className="text-sm font-bold lg:text-xl 2xl:text-3xl">Price</h5>
              <p className="text-xs lg:text-base 2xl:text-xl">1,000 sats</p>
            </p>
          </div>
          <div className="flex w-11/12 flex-col items-center justify-center lg:w-8/12 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex w-11/12 flex-col lg:w-7/12 2xl:w-7/12">
              <Input
                className="text-2xl text-gray-600"
                id="email"
                type="text"
                autoComplete="off"
                autoCorrect="off"
                placeholder="satoshi@gmx.com"
                label="Enter your email"
                defaultValue={signUpInfo.email}
                errorMessage={errors.email?.message}
                {...register('email')}
              />
            </div>
            <button
              disabled={!isDirty || !isValid}
              type="submit"
              className="mt-4 flex h-12 items-center justify-center rounded-lg bg-hero-gradient px-5 py-2 font-chakra text-xl font-bold text-white outline-none hover:opacity-80 disabled:cursor-not-allowed disabled:bg-gradient-disabled lg:ml-4 lg:mt-8 lg:w-5/12 lg:text-base 2xl:w-4/12 2xl:text-xl"
            >
              Buy test drive
            </button>
          </div>
        </div>
        {loading && (
          <div id="test-mine" className="mt-10 flex flex-col items-center justify-center ">
            <Loader width={48} height={48} />
            {renderStatus()}
          </div>
        )}
      </form>
    </>
  )
}
