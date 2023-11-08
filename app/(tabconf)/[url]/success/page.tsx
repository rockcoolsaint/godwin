/* eslint-disable no-restricted-imports */
'use client'

import { useEffect, useState } from 'react'
import getOrderStatus from 'src/api/checkout/getOrderStatus'
import { Container } from '../components/Container'
import { useSearchParams } from 'next/navigation'
import NotFoundComponent from 'src/components/shared/NotFoundComponent'
import { Loader } from 'src/core'
import { formatDistance, parseISO } from 'date-fns'
import { BoltIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import Link from 'src/components/shared/Link'
import { useAccountContext } from 'src/providers/AccountProvider'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface Status {
  worker: any
  payment: any
  pool_user: any
  email?: string
  proxy?: string
  assigned_at: string
}

export default function BalticSuccessPage({ params }: { params: any }) {
  const [status, setStatus] = useState<Status | null | undefined>(null)
  const [loading, setLoading] = useState(true)

  const searchParam = useSearchParams()
  const order_id = searchParam?.get('order_id') || ''

  const { account } = useAccountContext()

  useEffect(() => {
    const loadStatus = async (orderId: number) => {
      try {
        const status = await getOrderStatus(orderId)
        setStatus(status)
        setLoading(false)
      } catch (error: any) {
        console.error('error is ', (error as Error).message)
        toast.error((error as Error).message, { position: 'bottom-right' })
        setLoading(false)
      }
    }

    window.Intercom('shutdown')
    if (!Boolean(order_id)) {
      return
    }
    const interval = setInterval(() => loadStatus(Number(order_id)), 5000)

    return () => clearInterval(interval)
  }, [order_id, status?.payment?.status])

  if (!Boolean(order_id)) {
    return (
      <Container className="flex h-screen flex-col items-center justify-center bg-slate-50 pt-12">
        <NotFoundComponent message="Ooops! No detail for this order" return_url="/" />
      </Container>
    )
  }

  const renderPaymentStatus = () => {
    if (status?.payment?.status === 'paid') {
      return <span className="text-sm font-medium uppercase text-green-700 ">Paid</span>
    }
    if (status?.payment?.status === 'processing') {
      return <span className="text-sm font-medium uppercase text-yellow-700 ">Processing</span>
    }

    return <span className="text-sm font-medium uppercase text-red-700 ">Unpaid</span>
  }

  const renderOrderStatus = () => {
    return (
      <>
        <dl className="mx-auto mt-8 grid grid-cols-1 gap-px rounded-md border border-black/[0.05] sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
            <dt className="text-sm font-medium leading-6 text-gray-500">Email</dt>
            <dd className="w-full flex-none break-all text-sm font-medium tracking-tight text-gray-900">{status?.email}</dd>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
            <dt className="text-sm font-medium leading-6 text-gray-500">Payment</dt>
            <dd className="w-full flex-none break-all text-sm font-medium tracking-tight text-gray-900">{renderPaymentStatus()}</dd>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
            <dt className="text-sm font-medium leading-6 text-gray-500">Proxy</dt>
            <dd className="w-full flex-none break-all text-sm font-medium tracking-tight text-gray-900">{status?.proxy}</dd>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
            <dt className="text-sm font-medium leading-6 text-gray-500">Pool</dt>
            <dd className="w-full flex-none break-all text-sm font-medium tracking-tight text-gray-900">{status?.pool_user?.pool}</dd>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
            <dt className="text-sm font-medium leading-6 text-gray-500">Account</dt>
            <dd className="w-full flex-none break-all text-sm font-medium tracking-tight text-gray-900">
              {status?.pool_user?.username || '-'}
            </dd>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
            <dt className="text-sm font-medium leading-6 text-gray-500">Elapsed time</dt>
            <dd className="w-full flex-none break-all text-sm font-medium tracking-tight text-gray-900">
              {(status?.assigned_at && formatDistance(parseISO(status?.assigned_at), new Date())) || '-'}
            </dd>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
            <dt className="text-sm font-medium leading-6 text-gray-500">Shares</dt>
            <dd className="w-full flex-none break-all text-sm font-medium tracking-tight text-gray-900">
              {status?.worker?.accepted_shares || '-'}
            </dd>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
            <dt className="text-sm font-medium leading-6 text-gray-500">Difficulty</dt>
            <dd className="w-full flex-none break-all text-sm font-medium tracking-tight text-gray-900">
              {status?.worker?.difficulty || '-'}
            </dd>
          </div>
        </dl>
      </>
    )
  }

  return (
    <>
      <Container className="flex h-screen flex-col items-center justify-center bg-slate-50 pt-4 sm:pt-12">
        {!account?.pool_user?.username && (
          <div className="m-auto mt-8 flex w-8/12 flex-col items-center border-l-4 border-yellow-400 bg-yellow-50 p-4">
            <InformationCircleIcon className="h-14 w-14 text-yellow-600" />
            <div className="flex justify-center">
              <div className="ml-3">
                <p className="text-sm text-yellow-800">
                  You still need to set up your pool account. Set up your pool account{' '}
                  <Link className="underline" href={`/account/hashrate?proxy_status=${order_id}`}>
                    here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        )}
        {account?.pool_user?.username && (
          <>
            <div className="flex flex-col items-center justify-center">
              <BoltIcon className={clsx(loading ? 'animate-ping text-gray-500' : 'text-yellow-400', '0 mb-4 mt-8 h-24 w-24')} />
              <h1 className="mb-2 text-4xl">{loading ? 'Hash rate firing up' : 'Hash rate up'}</h1>
            </div>

            {loading ? (
              <div className="mt-8 flex flex-col items-center justify-center">
                <Loader />
                <p className="mt-1 text-lg text-dark-100">Loading order status</p>
              </div>
            ) : (
              renderOrderStatus()
            )}
          </>
        )}
      </Container>
    </>
  )
}
