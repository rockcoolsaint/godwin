'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Container, Loader } from 'src/core'
import * as yup from 'yup'
import { toast } from 'react-hot-toast'
import { createOrder } from 'src/api/orders/createOrder'
import createDirectOrderPayment from 'src/api/checkout/createDirectOrderPayment'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import chart from 'src/assets/webp/chart.webp'
import { formatMoney } from 'src/utils/currency'
import { useAccountContext } from 'src/providers/AccountProvider'

const useSignUpSchema = () => {
  const schema = useMemo(
    () =>
      yup
        .object({
          duration: yup.string().required(() => 'Duration required'),
        })
        .required(),
    [],
  )

  return schema
}

interface FormInputs {
  duration: string
}

export default function InstantHashrate() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(0)
  const router = useRouter()
  const { account } = useAccountContext()

  const signUpSchema = useSignUpSchema()

  const signUpInfo = {
    duration: '',
  }

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<FormInputs>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      ...signUpInfo,
    },
  })

  const watchShowDuration = watch('duration', '0')

  const onSubmit: SubmitHandler<FormInputs> = useCallback(
    async value => {
      try {
        setLoading(true)

        if (!account?.id) {
          toast.error('Redirecting to login...')
          router.push('/login')

          return
        }

        const order = await createOrder({
          account_id: account?.id,
          amount_sats: Number(value.duration) * 88 * 300,
          duration_days: Number(value.duration),
        })

        let payment = undefined
        if (order?.id) {
          setStatus(2)
          payment = await createDirectOrderPayment(
            order.id,
            `${process.env.NEXT_PUBLIC_APP_CALLBACK_URL}/direct-order/success?order_id=${order.id}`,
          )
        }

        if (payment?.payment_id) {
          router.push(payment?.checkout_url)
        }

        reset(
          {
            duration: '',
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
    [account?.id, reset, router],
  )

  const renderStatus = () => {
    if (status === 1) {
      return (
        <div className="flex flex-col items-center justify-center">
          <p className="mt-1 text-sm text-dark-200">Creating order...</p>
        </div>
      )
    }
    if (status === 2) {
      return (
        <div className="flex flex-col items-center justify-center">
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
    <Container className="flex h-screen items-center justify-center md:w-6/12">
      <section className="flex w-full flex-row items-center justify-center gap-28">
        <div className="w-full overflow-hidden rounded-xl border border-gray-50 shadow-lg">
          <Image className="mb-4 block w-full overflow-hidden  sm:h-64" src={chart} width={352} height={230} alt="chart" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col">
          <h1 className="mb-4">Instant hashrate</h1>

          <div>
            <h5 className="font-semibold">Buy hashrate and start mining in an hour</h5>
            <div className="mt-2 grid gap-4">
              <div className="grid grid-cols-2">
                <div className="col-span-1">
                  <p className="text-sm font-semibold text-gray-700">Hashrate</p>
                </div>
                <div className="col-span-1">
                  <p className="text-sm font-normal text-gray-600">88 TH/s</p>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="col-span-1">
                  <p className="text-sm font-semibold text-gray-700">Hash price</p>
                </div>
                <div className="col-span-1">
                  <p className="text-sm font-normal text-gray-600">300 sats per TH/s/day</p>
                </div>
              </div>
              <div className="grid grid-cols-2 items-center">
                <div className="col-span-1">
                  <p className="text-sm font-semibold text-gray-700">Duration</p>
                </div>
                <div className="col-span-1">
                  <select
                    {...register('duration')}
                    className="block w-9/12 rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="1">1 day</option>
                    <option value="2">2 days</option>
                    <option value="3">3 days</option>
                    <option value="4">4 days</option>
                    <option value="5">5 days</option>
                    <option value="6">6 days</option>
                    <option value="7">7 days</option>
                    <option value="8">8 days</option>
                    <option value="9">9 days</option>
                    <option value="10">10 days</option>
                    <option value="11">11 days</option>
                    <option value="12">12 days</option>
                    <option value="13">13 days</option>
                    <option value="14">14 days</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <button
            disabled={!isDirty || !isValid}
            type="submit"
            className="mt-8 flex h-12 w-8/12 items-center justify-center rounded-lg bg-gradient px-5 text-white outline-none hover:bg-gradient-hover disabled:cursor-not-allowed disabled:bg-gradient-disabled"
          >
            {formatMoney(Number(watchShowDuration) * 88 * 300)} sats - Buy now
          </button>
        </form>
      </section>
    </Container>
  )
}
