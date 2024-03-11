/* eslint-disable react/jsx-no-bind */
'use client'

import { useEffect, useState, Fragment, useMemo, useCallback } from 'react'
import toast from 'react-hot-toast'
import { updateAccount } from 'src/api/auth/updateAccount'
import AccountView from 'src/components/pages/account/AccountView'
import { Form, Input, Loader } from 'src/core'
import { useAccountContext } from 'src/providers/AccountProvider'
import protect from 'src/hoc/protect'
import { getPoolInfo } from 'src/api/account/getPoolInfo'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'
import { MINING_POOLS, IMiningPool } from 'src/constants/pools'
import clsx from 'clsx'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useSearchParams } from 'next/navigation'
import Link from 'src/components/shared/Link'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { getPoolAccount } from 'src/api/auth/getPoolAccount'

interface PoolInfoModel {
  has_ongoing_deliveries: boolean
  has_pool_account: boolean
  has_queued_deliveries: boolean
}

interface PoolAccount {
  pool: string
  username: string
  is_default: boolean
}

interface PoolAccountModel {
  count: number
  next: string | null
  previous: string | null
  results: PoolAccount[]
}

interface FormInputs {
  mining_pool_username: string | undefined
  mining_pool_address: string | undefined
}

const useHashrateSchema = () => {
  const schema = useMemo(
    () =>
      yup
        .object({
          mining_pool_username: yup.string(),
          mining_pool_address: yup.string().trim(),
        })
        .required(),
    [],
  )

  return schema
}

function Hashrate() {
  const { account, isLoading: isAccountLoading, token, refresh } = useAccountContext()

  const [loading, setLoading] = useState<boolean>(false)
  const [poolInfo, setPoolInfo] = useState<PoolInfoModel>({
    has_ongoing_deliveries: false,
    has_pool_account: false,
    has_queued_deliveries: false,
  })
  const [selectedPool, setSelectedPool] = useState(MINING_POOLS[0])
  const [poolAddress, setPoolAddress] = useState<string>(selectedPool.address)
  const [poolAccount, setPoolAccount] = useState<PoolAccountModel>({
    count: 0,
    next: null,
    previous: null,
    results: [
      {
        pool: '',
        username: '',
        is_default: false,
      },
    ],
  })
  const [defaultPoolAccount, setDefaultPoolAccount] = useState<PoolAccount>({
    pool: '',
    username: '',
    is_default: false,
  })

  const params = useSearchParams()
  const hasProxyStatus = params?.get('proxy_status') || ''

  const handleFormSubmit = async (data: object) => {
    if (!token) {
      return
    }

    try {
      setLoading(true)
      const updateSuccess = await updateAccount(data, token)
      if (updateSuccess) {
        toast.success('Your changes have been saved.')
        const res = await getPoolAccount(token)
        setPoolAccount(res)
        await refresh()
      }
    } catch (ex: any) {
      toast.error(ex.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const loadHashrateDeliveriesAndPoolInfo = async () => {
      if (!token) {
        return
      }

      try {
        setLoading(true)
        const data = await getPoolInfo(token)
        const res = await getPoolAccount(token)
        setPoolInfo(data)
        setPoolAccount(res)
      } catch (ex) {
        console.error(ex)
      } finally {
        setLoading(false)
      }
    }
    loadHashrateDeliveriesAndPoolInfo()
  }, [token])

  const handleSetSelectedPool = (val: IMiningPool) => {
    setSelectedPool(val)
    setPoolAddress(val.address)
  }

  function filterDefaultPools(poolAccounts: any[]) {
    return poolAccounts.filter(account => account.is_default === true)
  }

  useEffect(() => {
    const defaultPool = filterDefaultPools(poolAccount.results)
    setDefaultPoolAccount(defaultPool[0])
  }, [poolAccount.results, poolAccount])

  const canUpdate = poolInfo.has_ongoing_deliveries || poolInfo.has_queued_deliveries || poolInfo.has_ongoing_deliveries

  const hashrateInfo = {
    mining_pool_username: '',
    mining_pool_address: '',
  }

  const signUpSchema = useHashrateSchema()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
    setValue,
  } = useForm<FormInputs>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      ...hashrateInfo,
      mining_pool_address: defaultPoolAccount?.pool,
      mining_pool_username: defaultPoolAccount?.username,
    },
  })

  useEffect(() => {
    if (poolAddress) {
      setValue('mining_pool_address', poolAddress)
    } else {
      setValue('mining_pool_address', '')
    }
  }, [poolAddress, setValue])

  const onSubmit: SubmitHandler<FormInputs> = useCallback(
    async value => {
      try {
        if (!token) {
          return
        }

        setLoading(true)

        const updateSuccess = await updateAccount(
          {
            mining_pool_username: value.mining_pool_username,
            mining_pool_address: value.mining_pool_address,
          },
          token,
        )
        toast.success('Pool account added!')

        if (!updateSuccess) {
          toast.error('Unable to add pool account')
        }

        reset(
          {
            mining_pool_username: '',
            mining_pool_address: '',
          },
          { keepTouched: false, keepDirty: false },
        )
        setSelectedPool(MINING_POOLS[0])
        setLoading(false)
      } catch (err) {
        setLoading(false)
        toast.error('Error adding pool account')
      }
    },
    [reset, token],
  )

  if (isAccountLoading || loading) {
    return (
      <AccountView>
        <div className="flex items-center justify-center py-12">
          <Loader />
        </div>
      </AccountView>
    )
  }

  if (!account) {
    return <AccountView>Unauthorized</AccountView>
  }

  return (
    <AccountView>
      {poolInfo.has_pool_account ? (
        <Form className="items-start gap-4" onSubmit={handleFormSubmit} disabled={loading}>
          <Form.Section title="Mining Pool">
            <Form.Field className="w-full flex-col">
              <Form.Field.Label htmlFor="mining_pool_username">Mining Pool Username</Form.Field.Label>
              <Input
                type="text"
                name="mining_pool_username"
                defaultValue={defaultPoolAccount?.username}
                placeholder="satoshi"
                isDisabled={canUpdate || loading}
              />
            </Form.Field>
            <Form.Field className="w-full flex-col">
              <Form.Field.Label htmlFor="mining_pool_address">Mining Pool Address</Form.Field.Label>
              <Input
                type="text"
                name="mining_pool_address"
                defaultValue={defaultPoolAccount?.pool}
                placeholder="stratum+tcp://stratum.braiins.com:3333"
                isDisabled={canUpdate || loading}
              />
            </Form.Field>
          </Form.Section>

          <div className="flex w-full justify-start px-4 pb-4">
            <Form.Submit disabled={canUpdate || loading}>Save</Form.Submit>
          </div>

          {canUpdate ? (
            <div className="flex w-full justify-start px-4 pb-4">
              <span className="inline-flex items-center gap-x-1.5 rounded-md bg-yellow-50/40 px-2 py-4 text-sm font-normal text-gray-600 ring-1 ring-inset ring-yellow-600/20">
                <svg className="h-1.5 w-1.5 fill-yellow-500" viewBox="0 0 6 6" aria-hidden="true">
                  <circle cx="3" cy="3" r="3" />
                </svg>
                You cannot change pools while hash rate is being delivered. Please contact us via Intercom if you need to change pools
              </span>
            </div>
          ) : null}
        </Form>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-start px-8 py-12">
          <div>
            <span className="text-xl text-gray-500">Do you already own a pool account?</span>
            <Listbox value={selectedPool} onChange={handleSetSelectedPool}>
              {({ open }) => (
                <>
                  <Listbox.Label className="flex justify-start gap-1 text-sm text-gray-500">Select Mining Pool</Listbox.Label>
                  <div className="relative mt-2">
                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6">
                      <span className="block truncate">{selectedPool.name}</span>
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
                      <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/50 focus:outline-none sm:text-sm">
                        {MINING_POOLS.map(value => (
                          <Listbox.Option
                            key={value.id}
                            className={({ active }) =>
                              clsx(active ? 'bg-primary text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9')
                            }
                            value={value}
                          >
                            {({ selected, active }) => (
                              <>
                                <span className={clsx(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>{value.name}</span>

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
                </>
              )}
            </Listbox>

            <div className="items-start gap-8">
              <Input
                className="w-full"
                id="mining_pool_username"
                type="text"
                autoComplete="off"
                autoCorrect="off"
                defaultValue={hashrateInfo.mining_pool_username}
                errorMessage={errors.mining_pool_username?.message}
                placeholder="satoshi"
                label="Mining pool username"
                {...register('mining_pool_username')}
              />
              <div className="mt-2 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-normal text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                Please double check spelling and capitalization on your username
              </div>

              <Input
                className="w-full"
                disabled={Boolean(selectedPool.address)}
                id="mining_pool_address"
                type="text"
                autoComplete="off"
                autoCorrect="off"
                defaultValue={hashrateInfo.mining_pool_address}
                errorMessage={errors.mining_pool_address?.message}
                placeholder="satoshi@gmx.com"
                label="Mining pool address"
                {...register('mining_pool_address')}
              />

              <button
                disabled={!isDirty || !isValid || loading}
                type="submit"
                className="mt-8 flex h-12 w-full items-center justify-center rounded-lg bg-gradient px-5 text-white outline-none hover:bg-gradient-hover disabled:cursor-not-allowed disabled:bg-gradient-disabled"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
      {Boolean(hasProxyStatus) ? (
        <Link
          href={`/direct-order/success?order_id=${hasProxyStatus}`}
          target="_blank"
          className="mb-12 flex items-center justify-start px-8 text-primary underline hover:no-underline"
        >
          View proxy status here <ArrowTopRightOnSquareIcon className="ml-1 h-4 w-4" />
        </Link>
      ) : null}
    </AccountView>
  )
}

export default protect(Hashrate)
