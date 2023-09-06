'use client'

import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'
import { Listbox, Transition } from '@headlessui/react'
import { useTranslation } from 'src/hooks'
import { Input } from 'src/core'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { register as postRegister } from 'src/api/auth/register'
import { toast } from 'react-hot-toast'
import { MINING_POOLS, IMiningPool } from 'src/constants/pools'
import { createOrder } from 'src/api/orders/createOrder'
import createBalticPayment from 'src/api/checkout/createBalticPayment'
import { useRouter } from 'next/navigation'
import { Loader } from 'src/core'
import * as yup from 'yup'

const useSignUpSchema = () => {
  const schema = useMemo(
    () =>
      yup
        .object({
          email: yup
            .string()
            .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, () => 'Email not valid')
            .required(() => 'Email required'),
          mining_pool_username: yup
            .string()
            .trim()
            .required(() => 'Mining pool username is required'),
          mining_pool_address: yup
            .string()
            .trim()
            .required(() => 'Mining pool address is required'),
        })
        .required(),
    [],
  )

  return schema
}

interface FormInputs {
  email: string
  mining_pool_username: string
  mining_pool_address: string
}

export default function BalticSignUp() {
  const [selectedPool, setSelectedPool] = useState(MINING_POOLS[0])
  const [poolAddress, setPoolAddress] = useState<string>(selectedPool.address)
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(0)
  const router = useRouter()

  const handleSetSelectedPool = (val: IMiningPool) => {
    setSelectedPool(val)
    setPoolAddress(val.address)
  }

  const signUpInfo = {
    email: '',
    mining_pool_username: '',
    mining_pool_address: '',
  }

  const signUpSchema = useSignUpSchema()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
    setValue,
  } = useForm<FormInputs>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      ...signUpInfo,
      mining_pool_address: poolAddress,
    },
  })

  useEffect(() => {
    window.Intercom('shutdown')
    if (poolAddress) {
      setValue('mining_pool_address', poolAddress)
    } else {
      setValue('mining_pool_address', '')
    }
  }, [poolAddress, setValue])

  const onSubmit: SubmitHandler<FormInputs> = useCallback(
    async value => {
      try {
        setLoading(true)

        const [success, data] = await postRegister({
          email: value.email,
          mining_pool_username: value.mining_pool_username,
          mining_pool_address: value.mining_pool_address,
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
          payment = await createBalticPayment(order.id, `${process.env.NEXT_PUBLIC_APP_CALLBACK_URL}/tabconf/success?order_id=${order.id}`)
        }

        if (payment?.payment_id) {
          router.push(payment?.checkout_url)
        }

        if (!success) {
          toast.error('Sign up error')
        }

        reset(
          {
            email: '',
            mining_pool_username: '',
            mining_pool_address: '',
          },
          { keepTouched: false, keepDirty: false },
        )
        setSelectedPool(MINING_POOLS[0])
        toast.success('Sign up success')
        setLoading(false)
      } catch (err) {
        setLoading(false)
        toast.error('Sign up error')
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
      <div className="mt-24 flex flex-col items-center justify-center">
        <Loader />
        {renderStatus()}
      </div>
    )
  }

  return (
    <section className="">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
        <div className="w-4/5 sm:w-2/5">
          <Input
            className="mb-8"
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

                  <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
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
              defaultValue={signUpInfo.mining_pool_username}
              errorMessage={errors.mining_pool_username?.message}
              placeholder="satoshi"
              label={t('registration.mining_pool_username')}
              {...register('mining_pool_username')}
            />
            <Input
              className="w-full"
              disabled={Boolean(selectedPool.address)}
              id="mining_pool_address"
              type="text"
              autoComplete="off"
              autoCorrect="off"
              defaultValue={signUpInfo.mining_pool_address}
              errorMessage={errors.mining_pool_address?.message}
              placeholder="satoshi@gmx.com"
              label={t('registration.mining_pool_address')}
              {...register('mining_pool_address')}
            />

            <button
              disabled={!isDirty || !isValid || loading}
              type="submit"
              className="mt-8 flex h-12 w-full items-center justify-center rounded-lg bg-gradient px-5 text-white outline-none hover:bg-gradient-hover disabled:cursor-not-allowed disabled:bg-gradient-disabled"
            >
              Pay now
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}
