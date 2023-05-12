import { CheckIcon } from '@heroicons/react/24/solid'
import { SetStateAction, useState } from 'react'

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import Link from 'src/components/shared/Link'
import { useTranslation } from 'src/hooks'
import { Input } from 'src/core'
import Form from 'src/core/components/Form'

enum Step {
  SignUp = 'Rigly sign up',
  Pool = 'Pool',
  Multisig = 'Multisig',
}

export default function SignUp() {
  const DEFAULT_STEPS = [
    { id: '01', name: Step.SignUp, status: 'current' },
    { id: '02', name: Step.Pool, status: 'upcoming' },
    { id: '03', name: Step.Multisig, status: 'upcoming' },
  ]

  const [steps, setSteps] = useState(DEFAULT_STEPS)
  const [currentStep, setCurrentStep] = useState(DEFAULT_STEPS[0])
  const [poolOwner, setPoolOwner] = useState<string>('yes')
  const { t } = useTranslation()

  function handleSetCurrentStep(step: any) {
    // const currentStepIndex = this.steps.findIndex(step => step.status === 'current')
    // this.steps[currentStepIndex].status = 'complete'
    // this.steps[currentStepIndex + 1].status = 'current'
    setCurrentStep(step)
    // setSteps(steps.map(s => (s.id === step.id ? { ...s, status: 'current' } : { ...s, status: 'complete' })))
    setSteps(steps.map(s => (s.id === step.id ? { ...s, status: 'current' } : { ...s, status: 'upcoming' })))
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
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
                      <CheckIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-900">{step.name}</span>
                  </span>
                </button>
              ) : step.status === 'current' ? (
                <button className="flex items-center px-6 py-4 text-sm font-medium" aria-current="step">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-indigo-600">
                    <span className="text-indigo-600">{step.id}</span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-indigo-600">{step.name}</span>
                </button>
              ) : (
                <button onClick={() => handleSetCurrentStep(step)} className="group flex items-center">
                  <span className="flex items-center px-6 py-4 text-sm font-medium">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
                      <span className="text-gray-500 group-hover:text-gray-900">{step.id}</span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">{step.name}</span>
                  </span>
                </button>
              )}

              {stepIdx !== steps.length - 1 ? (
                <>
                  <div className=" absolute right-0 top-0 hidden h-full w-5 md:block" aria-hidden="true">
                    <svg className="h-full w-full text-gray-300" viewBox="0 0 22 80" fill="none" preserveAspectRatio="none">
                      <path d="M0 -2L20 40L0 82" vectorEffect="non-scaling-stroke" stroke="currentcolor" strokeLinejoin="round" />
                    </svg>
                  </div>
                </>
              ) : null}
            </li>
          ))}
        </ol>
      </nav>
      <div className="flex flex-col items-center ">
        {currentStep.name === 'Rigly sign up' && (
          <div className="flex w-full flex-col p-10 sm:w-3/4 lg:w-2/4 xl:w-[25vw]">
            <div className="flex items-center justify-start gap-1">
              <span className="text-base text-gray-500">Create your Rigly account</span>
            </div>

            <Form className="mt-4 items-start gap-8" onSubmit={() => {}} disabled={false}>
              <Form.Field className="w-full" required>
                <Form.Field.Label htmlFor="email">{t('registration.email')}</Form.Field.Label>
                <Input type="email" name="email" placeholder="satoshi@gmx.com" />
              </Form.Field>

              <Form.Field className="w-full">
                <Form.Field.Label htmlFor="referral_code">{t('registration.referral_code')}</Form.Field.Label>
                <Input type="text" name="referral_code" placeholder="012ABC" />
              </Form.Field>

              <Form.Submit className="w-full">Next</Form.Submit>
            </Form>

            <div className="mt-8 flex justify-center border-t border-gray-300 pt-6 text-sm">
              <Link href="/login" className="text-primary underline">
                {t('registration.has_account_already')}
              </Link>
            </div>
          </div>
        )}
        {currentStep.name === 'Pool' && (
          <div className="flex w-full flex-col p-10 sm:w-3/4 lg:w-2/4 xl:w-[25vw]">
            <div>
              <h3 className="font-medium ">Do you already own a pool account?</h3>
              <fieldset className="mb-4 mt-4">
                <legend className="sr-only">Notification method</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                  {notificationMethods.map(notificationMethod => (
                    <div key={notificationMethod.id} className="flex items-center">
                      <input
                        id={notificationMethod.id}
                        onClick={() => setPoolOwner(notificationMethod.id)}
                        name="notification-method"
                        type="radio"
                        defaultChecked={notificationMethod.id === 'yes'}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label htmlFor={notificationMethod.id} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                        {notificationMethod.title}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
            {poolOwner === 'yes' ? (
              <>
                <div className="flex items-center justify-start gap-1">
                  <span className="text-base text-gray-500">Enter your pool details</span>
                </div>
                <div className="mt-4 flex flex-wrap">
                  <Link
                    className="isolate mb-2 mr-2 inline-flex rounded-md shadow-sm"
                    href="https://app.luxor.tech/register"
                    target="_blank"
                  >
                    <button
                      type="button"
                      className="relative inline-flex items-center gap-x-1.5 rounded-lg bg-white px-3 py-2 text-sm font-normal text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                    >
                      Luxor Pool
                      <ArrowTopRightOnSquareIcon className="-mr-0.5 h-4 w-4 text-gray-400" aria-hidden="true" />
                    </button>
                  </Link>
                  <Link
                    href="https://pool.braiins.com/signup"
                    target="_blank"
                    className="isolate mb-2 mr-2 inline-flex rounded-md shadow-sm"
                  >
                    <button
                      type="button"
                      className="relative inline-flex items-center gap-x-1.5 rounded-lg bg-white px-3 py-2 text-sm font-normal text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                    >
                      Braiins Pool
                      <ArrowTopRightOnSquareIcon className="-mr-0.5 h-4 w-4 text-gray-400" aria-hidden="true" />
                    </button>
                  </Link>
                  <Link
                    href="https://www.f2pool.com/user/signup"
                    target="_blank"
                    className="isolate mb-2 mr-2 inline-flex rounded-md shadow-sm"
                  >
                    <button
                      type="button"
                      className="relative inline-flex items-center gap-x-1.5 rounded-lg bg-white px-3 py-2 text-sm font-normal text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                    >
                      F2pool
                      <ArrowTopRightOnSquareIcon className="-mr-0.5 h-4 w-4 text-gray-400" aria-hidden="true" />
                    </button>
                  </Link>
                  <Link
                    href="https://app.lincoin.com/user/login"
                    target="_blank"
                    className="isolate mb-2 mr-2 inline-flex  rounded-md shadow-sm"
                  >
                    <button
                      type="button"
                      className="relative inline-flex items-center gap-x-1.5 rounded-lg bg-white px-3 py-2 text-sm font-normal text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                    >
                      Lincoin
                      <ArrowTopRightOnSquareIcon className="-mr-0.5 h-4 w-4 text-gray-400" aria-hidden="true" />
                    </button>
                  </Link>
                  <Link href="https://solo.ckpool.org/" target="_blank" className="isolate mb-2 mr-2 inline-flex rounded-md shadow-sm">
                    <button
                      type="button"
                      className="relative inline-flex items-center gap-x-1.5 rounded-lg bg-white px-3 py-2 text-sm font-normal text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                    >
                      CKPool
                      <ArrowTopRightOnSquareIcon className="-mr-0.5 h-4 w-4 text-gray-400" aria-hidden="true" />
                    </button>
                  </Link>
                </div>

                <Form className="mt-4 items-start gap-8" onSubmit={() => {}} disabled={false}>
                  <>
                    <Form.Field className="w-full">
                      <Form.Field.Label htmlFor="mining_pool_username">{t('registration.mining_pool_username')}</Form.Field.Label>
                      <Input type="text" name="mining_pool_username" placeholder="satoshi.worker" />
                    </Form.Field>

                    <Form.Field className="w-full">
                      <Form.Field.Label htmlFor="mining_pool_address">{t('registration.mining_pool_address')}</Form.Field.Label>
                      <Input type="text" name="mining_pool_address" placeholder="stratum+tcp://stratum.braiins.com:3333" />
                    </Form.Field>
                  </>

                  <div className="flex w-full">
                    <span className="text-sm text-gray-500">{t('registration.mining_pool_details_note')}</span>
                  </div>

                  <Form.Submit className="w-full">Next</Form.Submit>
                </Form>
              </>
            ) : (
              <div>
                <Form className="mt-4 items-start gap-8" onSubmit={() => {}} disabled={false}>
                  <div className="flex w-full flex-col">
                    <p className="mb-4 text-sm text-gray-500">
                      Rigly routes hash rate directly to a stratum address that you control through a mining pool account of your choice.
                    </p>
                    <p className="mb-4 text-sm text-gray-500">
                      Mining pools servers connect directly to mining rigs to coordinate their work with others in a joint effort to find
                      blocks. Pools then distribute block rewards proportionate to the share of work each miner delivered to the pool.
                    </p>
                    <p className="text-sm text-gray-500">
                      Read more about how mining pools work{' '}
                      <Link
                        className="text-blue-700 underline"
                        href="https://braiins.com/blog/bitcoin-mining-pools-luck-shares-estimated-hashrate"
                        target="_blank"
                      >
                        here
                      </Link>
                    </p>
                  </div>

                  <Form.Submit className="w-full">Next</Form.Submit>
                </Form>
              </div>
            )}

            <div className="mt-8 flex justify-center border-t border-gray-300 pt-6 text-sm">
              <Link href="/login" className="text-primary underline">
                {t('registration.has_account_already')}
              </Link>
            </div>
          </div>
        )}
        {currentStep.name === 'Multisig' && <h1 className="h-80 p-10">Multisig</h1>}
      </div>
    </section>
  )
}

const notificationMethods = [
  { id: 'yes', title: 'Yes' },
  { id: 'no', title: 'No' },
]

export function HasPool() {
  return (
    <div>
      <label className="text-base font-semibold text-gray-900">Notifications</label>
      <p className="text-sm text-gray-500">How do you prefer to receive notifications?</p>
      <fieldset className="mt-4">
        <legend className="sr-only">Notification method</legend>
        <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
          {notificationMethods.map(notificationMethod => (
            <div key={notificationMethod.id} className="flex items-center">
              <input
                id={notificationMethod.id}
                name="notification-method"
                type="radio"
                defaultChecked={notificationMethod.id === 'email'}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label htmlFor={notificationMethod.id} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                {notificationMethod.title}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  )
}
