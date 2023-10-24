'use client'
import { Fragment, useEffect, useState } from 'react'
import { Listbox, Tab, Transition } from '@headlessui/react'
import { CheckCircleIcon, CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { formatMoney } from 'src/utils/currency'
import { useAccountContext } from 'src/providers/AccountProvider'
import BlockPartyDetails from 'src/components/pages/block-party/Details'
import BlockPartyBuyers from 'src/components/pages/block-party/Buyers'
import BlockPartyOnchainDetails from 'src/components/pages/block-party/OnchainDetails'
import ZapOff from 'src/assets/svg/zap_off.svg'
import { Loader } from 'src/core'
import { createOrder } from 'src/api/block-party/createOrder'
import { useRouter } from 'next/navigation'
import Confetti from 'react-confetti'
import createDirectOrderPayment from 'src/api/checkout/createDirectOrderPayment'
import { getBlockParty } from 'src/api/block-party/getBlockParty'
import { BlockParty, BlockPartyOnchain, BlockPartyOrder } from 'src/types'
import { useQueryState } from 'src/hooks/useQueryState'
import { formatDate } from 'src/utils/date'
import DetailsModal from 'src/components/pages/block-party/DetailsModal'

const DURATION = [
  { name: 'slow', value: 21, amount: 5500 },
  { name: 'medium', value: 100, amount: 10500 },
  { name: 'fast', value: 210, amount: 20500 },
]

function BlockPartyPage() {
  const [_, setCurrentTab] = useState(0)
  const [selectDuration, setSelectDuration] = useState(DURATION[0])
  const { token, account } = useAccountContext()
  const [blockParty, setBlockParty] = useState<BlockParty | null>(null)
  const [blockPartyOrders, setBlockPartyOrders] = useState<BlockPartyOrder[]>([])
  const [blockPartyOnchain, setBlockPartyOnchain] = useState<BlockPartyOnchain | undefined>(undefined)
  const [terahasToGoal, setTerahashToGoal] = useState<number>(0)
  const [payment, setPayment] = useState(false)
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(false)
  const router = useRouter()
  const [paidOrder] = useQueryState<string>('paid_order')
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)

  const handleSelectDuration = (val: any) => {
    setSelectDuration(val)
  }

  useEffect(() => {
    if (paidOrder && blockParty) {
      setPayment(true)
      router.replace('/block-party', { shallow: true })

      setTimeout(() => {
        setPayment(false)
      }, 4000)
    }
  }, [blockParty, paidOrder, router])

  useEffect(() => {
    const fetchBlockParties = async () => {
      setPageLoading(true)

      const data = await getBlockParty({ id: 1 })
      setBlockParty(data.block_party)
      setBlockPartyOrders(data.orders)
      setBlockPartyOnchain(data.onchain)
      setTerahashToGoal(data.terahash_to_goal)
      setPageLoading(false)
    }

    fetchBlockParties()
  }, [token])

  const handleCreateOrder = async () => {
    setPayment(false)
    setLoading(true)

    if (!token) {
      router.push('/login')

      return
    }

    if (!blockParty || !account) {
      return
    }

    if (!Boolean(account.username) || !Boolean(account.refund_address)) {
      setLoading(false)
      setDetailsModalOpen(true)

      return
    }

    const order = await createOrder({
      account_id: account?.id,
      block_party_id: blockParty.id,
      order_type: 'block_party',
      block_party_speed: selectDuration.name.toLocaleLowerCase(),
    })

    let payment = undefined
    if (order?.id) {
      payment = await createDirectOrderPayment(order.id, `${process.env.NEXT_PUBLIC_APP_CALLBACK_URL}/block-party?paid_order=${order.id}`)

      if (payment?.payment_id) {
        router.push(payment?.checkout_url)
      }
      if (order.checkout_url) router.push(order?.checkout_url)
      setLoading(false)
    }
  }

  const renderConfetti = () => {
    if (payment) {
      return (
        <Confetti
          recycle={false}
          numberOfPieces={1000}
          width={window.outerHeight}
          height={window.outerWidth}
          gravity={0.2}
          style={{ zIndex: 100, position: 'fixed', right: 0, left: 0, width: '100%' }}
        />
      )
    }

    return null
  }

  if (pageLoading || !blockParty) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <Loader />
        <p className="m-1 animate-pulse text-gray-600">Loading block party details...</p>
      </div>
    )
  }

  return (
    <section className="relative mx-auto my-16 flex max-w-7xl flex-col px-4 sm:px-0">
      {payment && (
        <span className="absolute left-1/3 mx-auto inline-flex items-center rounded-md bg-green-500/10 p-2 px-4 text-base font-medium text-green-800 ring-1 ring-inset ring-green-500/20">
          <CheckCircleIcon className="-ml-0.5 mr-1 h-5 w-5" aria-hidden="true" />
          You just purchased a block party order 🎉🎉🎉
        </span>
      )}
      <div className=" mt-8 flex flex-col justify-center gap-12 py-6 sm:flex-row sm:gap-36">
        <div className="h-96 overflow-hidden bg-white shadow-xl sm:w-2/5 sm:rounded-lg">
          <Tab.Group onChange={setCurrentTab}>
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
              <Tab
                className={({ selected }) =>
                  `flex-1 ${
                    selected ? 'bg-blue-900 text-white' : 'text-blue-900 hover:text-blue-900'
                  } rounded-xl px-4 py-2 text-center text-sm font-medium tracking-wider`
                }
              >
                Details
              </Tab>
              <Tab
                className={({ selected }) =>
                  `flex-1 ${
                    selected ? 'bg-blue-900 text-white' : 'text-blue-900 hover:text-blue-900'
                  } rounded-xl px-4 py-2 text-center text-sm font-medium tracking-wider`
                }
              >
                Buyers
              </Tab>
              <Tab
                className={({ selected }) =>
                  `flex-1 ${
                    selected ? 'bg-blue-900 text-white' : 'text-blue-900 hover:text-blue-900'
                  } rounded-xl px-4 py-2 text-center text-sm font-medium tracking-wider`
                }
              >
                Onchain
              </Tab>
              <Tab
                className={({ selected }) =>
                  `flex-1 ${
                    selected ? 'bg-blue-900 text-white' : 'text-blue-900 hover:text-blue-900'
                  } rounded-xl px-4 py-2 text-center text-sm font-medium tracking-wider`
                }
              >
                Live feed
              </Tab>
            </Tab.List>
            <Tab.Panels className="scrollbar-hide mt-2 h-full overflow-scroll pb-16">
              <Tab.Panel className="w-full rounded-xl bg-white p-3">
                <BlockPartyDetails blockParty={blockParty} blockPartyOrders={blockPartyOrders} valueToGoal={terahasToGoal} />
              </Tab.Panel>
              <Tab.Panel className="rounded-xl bg-white p-3">
                <BlockPartyBuyers blockPartyOrders={blockPartyOrders} />
              </Tab.Panel>
              <Tab.Panel className="rounded-xl bg-white px-3">
                <BlockPartyOnchainDetails onchain={blockPartyOnchain} />
              </Tab.Panel>
              <Tab.Panel className="rounded-xl bg-white p-3">
                <div className="flex h-full flex-col items-center justify-center">
                  <ZapOff className="mt-10 h-24 w-24 text-dark-100" />
                  <p className="ml-2 text-center text-gray-500">Live feed available when mining begins</p>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>

        <div className="">
          <h1>Block Party</h1>
          <p className="mt-4 text-sm">Happy White Paper Day!</p>
          <p className="text-sm">Solo mine with Rigly - Learn more</p>
          <aside className="mt-2">
            <div className="mb-6 grid gap-2">
              <div className="grid grid-cols-2 text-sm">
                <p>Hashrate goal</p>
                <p className="font-bold">{formatMoney(blockParty?.hashrate_ths)} TH/s</p>
              </div>
              <div className="grid grid-cols-2 text-sm">
                <p>Hashprice</p>
                <p className="font-bold">{blockParty?.hashprice} sats per TH/s/day</p>
              </div>
              <div className="grid grid-cols-2 text-sm">
                <p>Duration</p>
                <p className="font-bold">
                  {blockParty?.duration_seconds / 3600} hrs - {formatDate(blockParty.hashrate_end, 'MMM dd, yyyy H:mmaa')}
                </p>
              </div>
              <div className="grid grid-cols-2 text-sm">
                <p></p>
                <Listbox value={selectDuration} onChange={handleSelectDuration}>
                  {({ open }) => (
                    <div className="relative">
                      <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary sm:w-11/12 sm:text-sm sm:leading-6">
                        <span className="block truncate capitalize">
                          {selectDuration.name} ({selectDuration.value} TH/s)
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/50 focus:outline-none sm:w-11/12 sm:text-sm">
                          {DURATION.map(value => (
                            <Listbox.Option
                              key={value.name}
                              className={({ active }) =>
                                clsx(
                                  active ? 'bg-primary text-white' : 'text-gray-900',
                                  'relative cursor-default select-none py-2 pl-3 pr-9 text-xs sm:text-sm',
                                )
                              }
                              value={value}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span className={clsx(selected ? 'font-semibold' : 'font-normal', 'block truncate capitalize')}>
                                    {value.name} ({value.value} TH/s)
                                  </span>

                                  {selected ? (
                                    <span
                                      className={clsx(
                                        active ? 'text-white' : 'text-primary',
                                        'absolute inset-y-0 right-0 flex items-center pr-4',
                                      )}
                                    >
                                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  )}
                </Listbox>
              </div>
            </div>
            <button
              disabled={loading}
              onClick={handleCreateOrder}
              className="relative flex w-full flex-1 items-center justify-center gap-x-1.5 rounded-lg bg-gradient p-4 text-sm font-semibold capitalize text-white hover:bg-gray-50 hover:bg-gradient-hover focus:z-10 disabled:bg-gradient-disabled sm:w-8/12"
            >
              {loading ? (
                <Loader height={20} width={20} />
              ) : (
                <>
                  {selectDuration.name} - {formatMoney(selectDuration.amount)} sats - Buy now{' '}
                </>
              )}
            </button>
          </aside>
        </div>

        {renderConfetti()}
      </div>

      <DetailsModal isOpen={detailsModalOpen} onClose={() => setDetailsModalOpen(false)} />
    </section>
  )
}

export default BlockPartyPage
