'use client'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ShieldExclamationIcon } from '@heroicons/react/24/outline'
import Link from 'src/components/shared/Link'

export default function DemoModal() {
  const [open, setOpen] = useState(true)

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ShieldExclamationIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900">
                      Welcome to the Rigly demo!
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Get hashrate for testing our product.</p>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">To participate you need to:</p>
                      <ol className="list-decimal pl-8 pt-2">
                        <li className="text-sm text-gray-500">Sign up with Rigly</li>
                        <li className="text-sm text-gray-500">Provide a mining pool account username</li>
                      </ol>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        After signup, place fake bids in a dummy auction that you <b>WON&apos;T</b> have to pay for
                      </p>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Once the auction is complete, check email to buy hashrate for a day: Pay 5000 sats to mine ~30,000 sats.
                      </p>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Please reach out to{' '}
                        <Link className="hover:underline" href="mailto:karo@rigly.io">
                          karo@rigly.io
                        </Link>{' '}
                        or{' '}
                        <Link className="hover:underline" href="mailto:damian@rigly.io">
                          damian@rigly.io
                        </Link>{' '}
                        if you have any questions.
                      </p>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Thank you and enjoy your fresh sats!</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
