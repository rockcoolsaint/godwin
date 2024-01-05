'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Loader } from 'src/core'
import * as yup from 'yup'
import { toast } from 'react-hot-toast'
import { createOrder } from 'src/api/orders/createOrder'
import createDirectOrderPayment from 'src/api/checkout/createDirectOrderPayment'
import { useRouter } from 'next/navigation'
import { formatMoney } from 'src/utils/currency'
import { useAccountContext } from 'src/providers/AccountProvider'
import { getProductRate } from 'src/api/orders/getProductRate'

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
  const [processing, setProcessing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(0)
  const router = useRouter()
  const { account } = useAccountContext()
  const [hashprice, setHashprice] = useState(0)
  const [hashrate, setHashrate] = useState(0)
  const [markup, setMarkup] = useState(0)

  const signUpSchema = useSignUpSchema()

  const signUpInfo = {
    duration: '',
  }

  const { register, handleSubmit, reset, watch } = useForm<FormInputs>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      ...signUpInfo,
      duration: '1',
    },
  })

  const watchShowDuration = watch('duration', '')

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true)
      const rate = await getProductRate()
      setHashprice(rate?.hashprice)
      setHashrate(rate?.hashrate / 10 ** 12)
      setMarkup(rate?.markup)
      setLoading(false)
    }

    fetchRates()
  }, [])

  const markupPercentage = markup / 100

  const onSubmit: SubmitHandler<FormInputs> = useCallback(
    async value => {
      try {
        setProcessing(true)

        if (!account?.id) {
          toast.error('Redirecting to login...')
          router.push('/login')

          return
        }

        const order = await createOrder({
          account_id: account?.id,
          amount_sats: Number(value.duration) * hashrate * hashprice * (1 + markupPercentage),
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
        setProcessing(false)
      } catch (err) {
        setProcessing(false)
        toast.error('Error')
      }
    },
    [account?.id, hashprice, hashrate, markupPercentage, reset, router],
  )

  const renderStatus = () => {
    if (status === 1) {
      return (
        <div className="flex flex-col items-center justify-center">
          <p className="mt-1 font-epilogue text-xl font-bold text-white">Creating order...</p>
        </div>
      )
    }
    if (status === 2) {
      return (
        <div className="flex flex-col items-center justify-center">
          <p className="mt-1 font-epilogue text-xl font-bold text-white">Order created</p>
          <p className="mt-1 font-epilogue text-xl font-bold text-white">Creating payment...</p>
        </div>
      )
    }
  }

  if (processing) {
    return (
      <section className="flex w-9/12 flex-col items-center justify-center gap-8 p-12 sm:flex-row sm:gap-28 md:gap-8 lg:gap-14">
        <div id="test-mine" className="flex flex-col items-center justify-center">
          <Loader width={48} height={48} />
          {renderStatus()}
        </div>
      </section>
    )
  }

  return (
    <section className="order-2 flex w-full flex-col gap-8 p-6 sm:flex-row sm:gap-28 md:gap-8 lg:order-1 lg:w-9/12 lg:gap-14 lg:p-12">
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-center">
        <div className="w-full font-epilogue">
          <div className="mt-2 grid gap-8">
            <div className="grid grid-cols-2">
              <div className="col-span-1">
                <p className="text-sm font-bold text-white lg:text-xl">Hashrate</p>
              </div>
              <div className="col-span-1 justify-self-end">
                {loading ? (
                  <p className="flex h-2 w-12 animate-pulse rounded bg-white text-sm" />
                ) : (
                  <p className="text-xs font-bold text-white lg:text-sm">{hashrate} TH/s</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="col-span-1">
                <p className="text-sm font-bold text-white lg:text-xl">Hash price</p>
              </div>
              <div className="col-span-1 justify-self-end">
                {loading ? (
                  <p className="flex h-2 w-24 animate-pulse rounded bg-white text-sm" />
                ) : (
                  <p className="text-xs font-bold text-white lg:text-sm">
                    {Math.round(hashprice * (1 + markupPercentage))} sats per TH/s/day
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 items-center">
              <div className="col-span-1">
                <p className="text-sm font-bold text-white lg:text-xl">Select a duration</p>
              </div>
              <div className="col-span-1 justify-self-end">
                <select
                  {...register('duration')}
                  className="block rounded-full border-primary bg-transparent py-2 pl-3 pr-10 text-right text-sm font-bold text-white focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                >
                  <option value="1">1 day</option>
                  <option value="2">2 days</option>
                  <option value="3">3 days</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 items-center">
              <div className="col-span-1">
                <p className="text-sm font-bold text-white lg:text-xl">Cost</p>
              </div>
              <div className="col-span-1 justify-self-end">
                {loading ? (
                  <p className="flex h-2 w-24 animate-pulse rounded bg-white text-sm" />
                ) : (
                  <p className="text-xs font-bold text-white lg:text-sm">
                    {formatMoney(Math.round(Number(watchShowDuration) * hashrate * hashprice * (1 + markupPercentage)))} sats
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-8 flex w-9/12 items-center justify-center rounded-full bg-primary px-6 py-4 font-chakra text-lg font-bold text-white outline-none hover:opacity-90 disabled:cursor-not-allowed lg:w-9/12 lg:text-4xl xl:w-6/12"
        >
          Buy hashrate
        </button>
      </form>
    </section>
  )
}
