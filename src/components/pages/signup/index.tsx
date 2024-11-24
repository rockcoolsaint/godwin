'use client'

import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'
import { Fragment, useCallback, useEffect, useState } from 'react'
import clsx from 'clsx'
import { Listbox, Transition } from '@headlessui/react'
import Link from 'src/components/shared/Link'
import { useTranslation } from 'src/hooks'
import { Input, Loader } from 'src/core'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSignUpSchema } from './validation'
import { register as postRegister } from 'src/api/auth/register'
import useReturnUrl from 'src/hooks/useReturnUrl'
import { toast } from 'react-hot-toast'
import { MINING_POOLS, IMiningPool } from 'src/constants/pools'
import { SignUpPoolDetails } from './SignUpPoolDetails'
import { LocalStorageKeys } from 'src/constants/localStorage'
import { useSearchParams } from 'next/navigation';

enum Step {
  SignUp = 'Sign up',
  Pool = 'Payout Address',
}

interface FormInputs {
  email: string
  referral_code: string | undefined
  payout_address?: string
}

export default function SignUp({ setView, setEmail }: any) {
  const DEFAULT_STEPS = [
    { id: '01', name: Step.SignUp, status: 'current' },
    { id: '02', name: Step.Pool, status: 'upcoming' },
  ]

  const [steps, setSteps] = useState(DEFAULT_STEPS)
  const [currentStep, setCurrentStep] = useState(DEFAULT_STEPS[0])
  const [poolOwner, setPoolOwner] = useState<string>('yes')
  const [selectedPool, setSelectedPool] = useState(MINING_POOLS[0])
  const [code, setCode] = useState<string | undefined>('')
  const [poolAddress, setPoolAddress] = useState<string>(selectedPool.address)
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const returnUrl = useReturnUrl({ excludeKey: true, encode: true })
  const searchParams = useSearchParams()
  const referral = searchParams.get('referral')

  const signUpInfo = {
    email: '',
    referral_code: '',
    payout_address: '',
    create_pool_account: false,
  }

  const signUpSchema = useSignUpSchema(signUpInfo)

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    resetField,
    watch,
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
    const storedEmail = window.localStorage.getItem(LocalStorageKeys.Login.email)
    if (storedEmail) {
      setValue('email', storedEmail)
    }

   // Add this block to handle referral from URL
    if (referral) {
      setValue('referral_code', referral)
    }

    const code = window.localStorage.getItem(LocalStorageKeys.Referral.plebtern) || undefined
    setCode(code)
    const pool = Number(window.localStorage.getItem(LocalStorageKeys.Pool.poolValue)) || undefined
    if (pool) {
      const selectedPool = MINING_POOLS.filter(p => p.id === pool) || MINING_POOLS[0]
      handleSetSelectedPool(selectedPool[0])
    }
  }, [setValue, referral])

  const handleSetSelectedPool = (val: IMiningPool) => {
    setSelectedPool(val)
    setPoolAddress(val.address)
  }

  const handleSetCurrentStep = async (step: any) => {
    const noError = await trigger('email')
    if (!noError) {
      return
    }
    resetField('mining_pool_username', { keepDirty: false })
    setCurrentStep(step)
    setSteps(steps.map(s => (s.id === step.id ? { ...s, status: 'current' } : { ...s, status: 'upcoming' })))
  }

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
        setLoading(true)

        const [success, _] = await postRegister(
          {
            email: value.email,
            payout_address: value.payout_address,
            referral_code: value.referral_code,
            create_pool_account: false,
            code: code,
            is_demo: true,
          },
          returnUrl,
        )

        if (!success) {
          toast.error('Sign up error')
        }

        reset(
          {
            email: '',
            mining_pool_username: '',
            mining_pool_address: '',
            referral_code: '',
          },
          { keepTouched: false, keepDirty: false },
        )
        window.localStorage.removeItem(LocalStorageKeys.Referral.plebtern)
        window.localStorage.removeItem(LocalStorageKeys.Pool.poolValue)
        setSelectedPool(MINING_POOLS[0])
        setView()
        setEmail(value.email)
        toast.success('Sign up success')
        setLoading(false)
      } catch (err) {
        setLoading(false)
        toast.error('Sign up error')
      }
    },
    [code, reset, returnUrl, setEmail, setView],
  )

  const renderPoolEntry = (poolOwner: { poolOwner: 'yes' | 'no' | 'later' | string }) => {
    if (poolOwner.poolOwner === 'yes') {
      return (
        <>
          <Listbox value={selectedPool} onChange={handleSetSelectedPool}>
            {({ open }) => (
              <>
                <Listbox.Label className="flex justify-start gap-1 text-sm text-gray-500">Select Mining Pool</Listbox.Label>
                <div className="relative mt-2">
                  <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6">
                    <span className="block truncate">{selectedPool.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon className="size-5 text-gray-400" aria-hidden="true" />
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
                                  <CheckIcon className="size-5" aria-hidden="true" />
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
            <div className="mt-2 inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-normal text-gray-800 ring-1 ring-inset ring-gray-600/20">
              Only enter your pool username, do not add workername - eg. only "username", not "username.worker"
            </div>
            <Input
              className="w-full"
              id="mining_pool_address"
              type="text"
              autoComplete="off"
              autoCorrect="off"
              defaultValue={signUpInfo.mining_pool_address}
              errorMessage={errors.mining_pool_address?.message}
              placeholder="stratum.example.com:3333"
              label={t('registration.mining_pool_address')}
              {...register('mining_pool_address')}
            />
            <button
              disabled={!isDirty || !isValid || loading}
              type="submit"
              className="mt-8 flex h-12 w-full items-center justify-center rounded-lg bg-gradient px-5 text-white outline-none hover:bg-gradient-hover disabled:cursor-not-allowed disabled:bg-gradient-disabled"
            >
              {loading ? <Loader height={20} width={20} /> : <span>Submit</span>}
            </button>
          </div>
        </>
      )
    }
    if (poolOwner.poolOwner === 'no') {
      return <SignUpPoolDetails />
    }

    return (
      <div className="items-start gap-8">
        <button
          disabled={loading}
          type="submit"
          className="mt-8 flex h-12 w-full items-center justify-center rounded-lg bg-gradient px-5 text-white outline-none hover:bg-gradient-hover disabled:cursor-not-allowed disabled:bg-gradient-disabled"
        >
          {loading ? <Loader height={20} width={20} /> : <span>Continue</span>}
        </button>
      </div>
    )
  }

  return (
    <section className="">
      <nav aria-label="Progress">
        <ol role="list" className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0">
          {steps.map((step, stepIdx) => (
            <li key={step.name} className="relative md:flex md:flex-1">
              {step.status === 'complete' ? (
                <button className="group flex w-full items-center">
                  <span className="flex items-center px-6 py-4 text-sm font-medium">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary group-hover:bg-indigo-800">
                      <CheckIcon className="size-6 text-white" aria-hidden="true" />
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-900">{step.name}</span>
                  </span>
                </button>
              ) : step.status === 'current' ? (
                <button className="flex items-center px-6 py-4 text-sm font-medium" aria-current="step">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-primary">
                    <span className="text-primary">{step.id}</span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-primary">{step.name}</span>
                </button>
              ) : (
                <button onClick={() => handleSetCurrentStep(step)} className="group flex items-center">
                  <span className="flex items-center px-6 py-4 text-sm font-medium">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
                      <span className="text-gray-500 group-hover:text-gray-900">{step.id}</span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">{step.name}</span>
                  </span>
                </button>
              )}

              {stepIdx !== steps.length - 1 ? (
                <>
                  <div className=" absolute right-0 top-0 hidden h-full w-5 md:block" aria-hidden="true">
                    <svg className="size-full text-gray-300" viewBox="0 0 22 80" fill="none" preserveAspectRatio="none">
                      <path d="M0 -2L20 40L0 82" vectorEffect="non-scaling-stroke" stroke="currentcolor" strokeLinejoin="round" />
                    </svg>
                  </div>
                </>
              ) : null}
            </li>
          ))}
        </ol>
      </nav>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
        {currentStep.name === 'Sign up' && (
          <div className="flex w-full flex-col p-10 sm:w-3/4 lg:w-3/4 xl:w-[25vw]">
            <div className="flex items-center justify-start gap-1">
              <span className="text-xl text-gray-500">Create your account</span>
            </div>

            <div>
              <Input
                className="w-full"
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

            <div className="flex w-full flex-col gap-2">
              <Input
                className="w-full"
                id="referral_code"
                type="text"
                autoComplete="off"
                autoCorrect="off"
                defaultValue={signUpInfo.referral_code}
                errorMessage={errors.referral_code?.message}
                placeholder="Referral Code"
                label={t('registration.referral_code') + ' (optional)'}
                {...register('referral_code')}
              />
            </div>
            <button
              disabled={!isDirty}
              onClick={() => {
                handleSetCurrentStep(DEFAULT_STEPS[1])
                const referralCode = watch('referral_code')
                if (referralCode) {
                  toast.success(
                  <span>
                    Thanks for entering your code <strong>{referralCode}</strong>, you and your referrer will earn a day of free hashrate after your first purchase!
                  </span>, {
                    duration: 12000 // 12 seconds
                  })
              }
              }}
              className="mt-8 flex h-12 w-full items-center justify-center rounded-lg bg-gradient px-5 text-white outline-none hover:bg-gradient-hover disabled:cursor-not-allowed disabled:bg-gradient-disabled"
            >
              Next
            </button>

            <div className="mt-8 flex justify-center border-t border-gray-300 pt-6 text-sm">
              <Link href="/login" className="text-primary underline">
                {t('registration.has_account_already')}
              </Link>
            </div>
          </div>
        )}

          {currentStep.name === Step.Pool && (
            <div className="flex w-full flex-col p-10 sm:w-3/4 lg:w-3/4 xl:w-[25vw]">
              <div className="items-start gap-8">
                <Input
                  className="w-full"
                  id="payout_address"
                  type="text"
                  autoComplete="off"
                  autoCorrect="off"
                  defaultValue={signUpInfo.payout_address}
                  errorMessage={errors.payout_address?.message}
                  placeholder="bc1..."
                  label="Payout Address (optional)"
                  {...register('payout_address')}
                />
                <div className="mt-2 text-sm text-gray-500">
                  Add your bitcoin payout address, to receive your share of reward if the party finds a block. You can edit this later.
                </div>
                
                <button
                  disabled={loading}
                  type="submit"
                  className="mt-8 flex h-12 w-full items-center justify-center rounded-lg bg-gradient px-5 text-white outline-none hover:bg-gradient-hover disabled:cursor-not-allowed disabled:bg-gradient-disabled"
                >
                  {loading ? <Loader height={20} width={20} /> : <span>Submit</span>}
                </button>
              </div>

              <div className="mt-8 flex justify-center border-t border-gray-300 pt-6 text-sm">
                <Link href="/login" className="text-primary underline">
                  {t('registration.has_account_already')}
                </Link>
              </div>
            </div>
          )}
      </form>
    </section>
  )
}

const notificationMethods = [
  { id: 'yes', title: 'Yes' },
  { id: 'no', title: 'No' },
  { id: 'later', title: "I'll add later" },
]
