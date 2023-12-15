'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Container, Loader } from 'src/core'
import * as yup from 'yup'
import { toast } from 'react-hot-toast'
import { createOrder } from 'src/api/orders/createOrder'
import createDirectOrderPayment from 'src/api/checkout/createDirectOrderPayment'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import chart from 'src/assets/png/chart.png'
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
      const rate = await getProductRate()
      setHashprice(rate?.hashprice)
      setHashrate(rate?.hashrate / 10 ** 12)
      setMarkup(rate?.markup)
    }

    fetchRates()
  }, [])

  const markupPercentage = markup / 100

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
        setLoading(false)
      } catch (err) {
        setLoading(false)
        toast.error('Error')
      }
    },
    [account?.id, hashprice, hashrate, markupPercentage, reset, router],
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
    <Container className="flex items-center justify-center py-20 md:w-9/12 lg:h-screen lg:w-8/12 lg:py-0 xl:w-7/12">
      <section className="flex w-full flex-col items-center justify-center gap-8 sm:flex-row sm:gap-28 md:gap-8 lg:gap-14">
        <div className="w-full max-w-sm overflow-hidden rounded-xl border border-gray-50 shadow-lg">
          <Image className="mb-4 block w-full overflow-hidden sm:h-64" src={chart} width={352} height={230} alt="chart" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col">
          <h1>Instant hashrate</h1>
          <div>
            <h5 className="mb-4 text-sm italic text-gray-600">Buy hashrate and start mining to your pool account now</h5>
            <div className="mt-2 grid gap-4">
              <div className="grid grid-cols-2">
                <div className="col-span-1">
                  <p className="text-sm font-semibold text-gray-700">Hashrate</p>
                </div>
                <div className="col-span-1">
                  <p className="text-sm font-normal text-gray-600">{hashrate} TH/s</p>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="col-span-1">
                  <p className="text-sm font-semibold text-gray-700">Hash price</p>
                </div>
                <div className="col-span-1">
                  <p className="text-sm font-normal text-gray-600">{Math.round(hashprice * (1 + markupPercentage))} sats per TH/s/day</p>
                </div>
              </div>
              <div className="grid grid-cols-2 items-center">
                <div className="col-span-1">
                  <p className="text-sm font-semibold text-gray-700">Duration</p>
                </div>
                <div className="col-span-1">
                  <select
                    {...register('duration')}
                    className="block w-10/12 rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm xl:w-7/12 2xl:w-5/12"
                  >
                    <option value="1">1 day</option>
                    <option value="2">2 days</option>
                    <option value="3">3 days</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 flex h-12 w-11/12 items-center justify-center rounded-lg bg-gradient px-5 text-white outline-none hover:bg-gradient-hover disabled:cursor-not-allowed disabled:bg-gradient-disabled lg:w-9/12 xl:w-8/12"
          >
            {formatMoney(Math.round(Number(watchShowDuration) * hashrate * hashprice * (1 + markupPercentage)))} sats - Buy now
          </button>
        </form>
      </section>
    </Container>
  )
}
