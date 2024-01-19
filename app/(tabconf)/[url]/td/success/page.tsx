/* eslint-disable no-restricted-imports */
'use client'

import { useEffect, useState } from 'react'
import getProxyStatus from 'src/api/checkout/getProxyStatus'
import { Container } from '../../components/Container'
import { useSearchParams } from 'next/navigation'
import NotFoundComponent from 'src/components/shared/NotFoundComponent'
import { Form, Input, Loader } from 'src/core'
import { formatDistance, parseISO } from 'date-fns'
import { BoltIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import Link from 'src/components/shared/Link'
import { ProxyStatusResponse } from 'src/types'
import toast from 'react-hot-toast'
import { ErrorBoundary } from 'react-error-boundary'
import { useAccountContext } from 'src/providers/AccountProvider'
import { LoginView } from 'src/utils/constants'
import useReturnUrl from 'src/hooks/useReturnUrl'
import Icon from 'src/core/components/Icon'
import { useTranslation } from 'src/hooks'

export default function TestDriveSuccessPage({ params }: { params: any }) {
  const { t } = useTranslation()
  const [proxyStatus, setProxyStatus] = useState<ProxyStatusResponse | null | undefined>(null)
  const [loading, setLoading] = useState(true)
  const { account, login } = useAccountContext()
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const [email, setEmail] = useState<string | undefined>(undefined)
  const [view, setView] = useState(LoginView.Login)
  const returnUrl = useReturnUrl({ excludeKey: false, encode: true })

  const loadStatus = async (orderId: number) => {
    try {
      const res = await getProxyStatus(orderId)
      setProxyStatus(res)
    } catch (error: any) {
      toast.error(error.message, { position: 'bottom-right' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    window.Intercom('shutdown')
    if (!orderId) {
      return
    }

    loadStatus(Number(orderId))
    const interval = setInterval(() => loadStatus(Number(orderId)), 5000)

    return () => clearInterval(interval)
  }, [orderId])

  const handleSubmit = async (data: any) => {
    try {
      setLoading(true)
      setEmail(data.email)

      const [success, error] = await login(data.email, returnUrl)
      if (!success) {
        throw error
      }

      setView(LoginView.EmailSent)
    } catch (ex: any) {
      toast.error(ex.message)
      console.error(ex)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Container className="flex h-screen flex-col items-center justify-center bg-slate-50 pt-12">
        <Loader />
      </Container>
    )
  }

  if (!proxyStatus || !orderId) {
    return (
      <Container className="flex h-screen flex-col items-center justify-center bg-slate-50 pt-12">
        <NotFoundComponent message="No detail for this order" return_url="/" />
      </Container>
    )
  }

  if (!account?.email) {
    return (
      <Container className="flex flex-col items-center justify-center bg-slate-50 pt-12">
        <NotFoundComponent message="Please sign in to view this order">
          {view === LoginView.Login && (
            <div className="flex flex-col items-center justify-center sm:w-3/4 lg:w-8/12 xl:w-4/12">
              <div className="mt-2 flex items-center justify-start gap-1">
                <span className="text-sm text-gray-500">
                  Just one more step to view your mining test drive! Enter your email and you&apos;ll receive a magic link
                </span>
              </div>
              <Form className="mt-8 w-full items-start gap-8" onSubmit={handleSubmit} disabled={loading}>
                <Form.Field className="w-full flex-col" required>
                  <Form.Field.Label htmlFor="email">Email</Form.Field.Label>
                  <Input type="email" name="email" placeholder="satoshi@gmx.com" />
                </Form.Field>

                <Form.Submit className="w-full">{loading ? <Loader height={20} width={20} /> : <span>Sign in</span>}</Form.Submit>
              </Form>
            </div>
          )}
          {view === LoginView.EmailSent && (
            <div className="flex w-full flex-col items-center justify-center gap-4 sm:w-3/4 lg:w-2/4 xl:w-[25vw]">
              <Icon icon="envelopeCircleCheck" className="h-20 w-20 text-gray-300" />
              <span
                className="text-center text-gray-500"
                dangerouslySetInnerHTML={{ __html: t('login.email_sent_note', { email }) }}
              ></span>
            </div>
          )}
        </NotFoundComponent>
      </Container>
    )
  }

  if (account?.email !== proxyStatus.email) {
    return (
      <Container className="flex h-screen flex-col items-center justify-center bg-slate-50 pt-12">
        <NotFoundComponent message="You're not permitted to view this order" return_url="/" />
      </Container>
    )
  }

  const renderHeader = () => {
    if (loading) {
      return (
        <>
          <BoltIcon className="0 mb-4 h-24 w-24 animate-ping text-gray-500" />
          <span>Hashrate initializing</span>
        </>
      )
    }

    if (!proxyStatus.order) {
      return (
        <>
          <BoltIcon className="0 mb-4 h-24 w-24 animate-ping text-gray-500" />
          <span>Hashrate initializing</span>
        </>
      )
    }

    if (proxyStatus.order.status === 'delivery_ended') {
      return <span>Hashrate delivered</span>
    }

    return <span>Hashrate up</span>
  }

  const renderDeliveryStatus = () => {
    if (!proxyStatus.order) {
      return (
        <div className="mt-8 flex w-full items-center justify-center rounded-t-md border border-b-0 border-black/[0.05] bg-white py-4">
          <span className="text-sm font-bold text-yellow-500">Your hashrate delivery is on its way</span>
        </div>
      )
    }
    if (proxyStatus?.order?.status === 'delivery_ended') {
      return (
        <div className="mt-8 flex w-full items-center justify-center rounded-t-md border border-b-0 border-black/[0.05] bg-white py-4">
          <span className="text-sm font-bold text-green-500">Your hashrate delivery is complete</span>
        </div>
      )
    }
  }

  return (
    <Container className="flex h-screen flex-col items-center justify-start bg-slate-50 pt-4 sm:pt-12">
      <h1 className="mb-2 mt-10 flex flex-col items-center justify-center text-4xl">{renderHeader()}</h1>

      {loading ? (
        <div className="mt-8 flex flex-col items-center justify-center">
          <Loader />
          <p className="mt-1 text-lg text-dark-100">Loading order status</p>
        </div>
      ) : (
        <ErrorBoundary fallback={<div className="p-8">⚠️ Oops! Something went wrong fetching Hashrate data</div>}>
          <>
            {renderDeliveryStatus()}
            {proxyStatus.order && (
              <dl className={clsx('mx-auto grid grid-cols-1 gap-px rounded-md border border-black/[0.05] sm:grid-cols-2 lg:grid-cols-4')}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 bg-white p-4 sm:px-6 sm:py-8 xl:px-8">
                  <dt className="text-sm font-medium leading-6 text-gray-500">Email</dt>
                  <dd className="w-full flex-none break-all text-sm font-medium tracking-tight text-gray-900">{proxyStatus?.email}</dd>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 bg-white p-4 sm:px-6 sm:py-8 xl:px-8">
                  <dt className="text-sm font-medium leading-6 text-gray-500">Payment</dt>
                  <dl className="w-full flex-none break-all text-sm font-medium tracking-tight text-gray-900">
                    <dt className="w-full flex-none break-all text-sm font-medium tracking-tight text-gray-900">
                      {proxyStatus?.payment?.status === 'paid' && (
                        <span className="text-sm font-medium uppercase text-green-700 ">Paid</span>
                      )}
                      {proxyStatus?.payment?.status === 'processing' && (
                        <span className="text-sm font-medium uppercase text-yellow-700 ">Processing</span>
                      )}
                      {proxyStatus.payment?.status !== 'paid' && proxyStatus.payment?.status !== 'processing' && (
                        <span className="text-sm font-medium uppercase text-red-700 ">Unpaid</span>
                      )}
                    </dt>
                  </dl>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 bg-white p-4 sm:px-6 sm:py-8 xl:px-8">
                  <dt className="text-sm font-medium leading-6 text-gray-500">Proxy</dt>
                  <dd className="w-full flex-none break-all text-sm font-medium tracking-tight text-gray-900">{proxyStatus.proxy}</dd>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 bg-white p-4 sm:px-6 sm:py-8 xl:px-8">
                  <dt className="text-sm font-medium leading-6 text-gray-500">Pool</dt>
                  <dd className="w-full flex-none break-all text-sm font-medium tracking-tight text-gray-900">
                    {proxyStatus.pool_user?.pool}
                  </dd>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 bg-white p-4 sm:px-6 sm:py-8 xl:px-8">
                  <dt className="text-sm font-medium leading-6 text-gray-500">Account</dt>
                  <dd className="w-full flex-none break-all text-sm font-medium tracking-tight text-gray-900">
                    {proxyStatus.pool_user?.username || '-'}
                  </dd>
                </div>
                {proxyStatus?.order?.status === 'delivery_ended' && (
                  <>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 bg-white p-4 sm:px-6 sm:py-8 xl:px-8">
                      <dt className="text-sm font-medium leading-6 text-gray-500">Elapsed time</dt>
                      <dd className="w-full flex-none break-all text-sm font-medium tracking-tight text-gray-900">
                        {formatSecondsToHMS(proxyStatus.elapsed_time) || '-'}
                      </dd>
                    </div>
                  </>
                )}
                {proxyStatus?.order?.status !== 'delivery_ended' && (
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 bg-white p-4 sm:px-6 sm:py-8 xl:px-8">
                    <dt className="text-sm font-medium leading-6 text-gray-500">Elapsed time</dt>
                    <dd className="w-full flex-none break-all text-sm font-medium tracking-tight text-gray-900">
                      {(proxyStatus.assigned_at && formatDistance(parseISO(proxyStatus.assigned_at), new Date())) || '-'}
                    </dd>
                  </div>
                )}
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 bg-white p-4 sm:px-6 sm:py-8 xl:px-8">
                  <dt className="text-sm font-medium leading-6 text-gray-500">Shares</dt>
                  <dd className="w-full flex-none break-all text-sm font-medium tracking-tight text-gray-900">
                    {proxyStatus.worker?.accepted_shares || '-'}
                  </dd>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 bg-white p-4 sm:px-6 sm:py-8 xl:px-8">
                  <dt className="text-sm font-medium leading-6 text-gray-500">Difficulty</dt>
                  <dd className="w-full flex-none break-all text-sm font-medium tracking-tight text-gray-900">
                    {proxyStatus.worker?.difficulty || '-'}
                  </dd>
                </div>
              </dl>
            )}

            {proxyStatus.order?.status !== 'delivery_ended' && params.url !== 'tabconf' && proxyStatus.pool_user?.username && (
              <div className="my-10 flex flex-col items-start border border-black/[0.05] bg-white p-4">
                <div className="flex w-full items-start justify-between gap-4 md:items-center">
                  <h3 className="leading-tight">Claiming your Braiins mining pool account</h3>
                  <div className="mb-2 flex h-8 items-center justify-center rounded bg-blue-400 px-3">
                    <span className="whitespace-nowrap text-sm font-semibold text-white">Next steps</span>
                  </div>
                </div>
                <p className="mt-4">
                  Your account username at Braiins is{' '}
                  <code>
                    <b>{proxyStatus.pool_user?.username || 'N/A'}</b>
                  </code>
                </p>
                <p className="mt-4">You will receive a verification email shortly with instructions on how to claim your account.</p>
                <p className="mt-4">
                  Please check your email to{' '}
                  <Link className="underline" href="https://pool.braiins.com/mining/">
                    login to Braiins
                  </Link>{' '}
                  and claim your mining rewards.
                </p>
              </div>
            )}
          </>
        </ErrorBoundary>
      )}
    </Container>
  )
}

const formatSecondsToHMS = (totalSeconds: number | undefined) => {
  if (totalSeconds === undefined) {
    return '-'
  }

  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds - hours * 3600) / 60)
  const seconds = totalSeconds - hours * 3600 - minutes * 60

  const paddedHours = String(hours).padStart(2, '0')
  const paddedMinutes = String(minutes).padStart(2, '0')
  const paddedSeconds = String(seconds).padStart(2, '0')

  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`
}
