import clsx from 'clsx'
import React from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { formatMoney } from 'src/utils/currency'
import Link from 'src/components/shared/Link'
import mempoolTxUrl from 'src/utils/mempoolUrl'
import { formatOrderStatus } from 'app/(live)/account/orders/page'
import SatsSvg from 'src/assets/svg/sats.svg'

export interface TableColumn {
  title: string
  name: string
  align?: string
}

function Table({
  cols,
  data,
  row,
  empty,
}: {
  cols: TableColumn[]
  data: any
  row: (item: any, col: string, i: number) => React.ReactNode
  empty: () => React.ReactNode
}) {
  return (
    <>
      <table className="w-full">
        <TableHead cols={cols} />
        {data.length > 0 && (
          <>
            {data.map((item: any, i: number) => {
              return (
                <>
                  <tr key={i}>
                    <Table.Row>
                      {cols.map((col, j) => {
                        return (
                          <td key={j} className="text-left text-sm first-of-type:pl-4 last-of-type:pr-4">
                            {row(item, col.name, i)}
                          </td>
                        )
                      })}
                    </Table.Row>
                  </tr>
                  {item?.payments?.length > 0 && (
                    <tr>
                      <td colSpan={6}>
                        <Dropdown>
                          <Table
                            data={item.payments}
                            cols={[
                              { title: 'ID', name: 'id' },
                              { title: 'Amount', name: 'amount' },
                              { title: 'Provider', name: 'provider' },
                              { title: 'Status', name: 'status' },
                              { title: 'Tx ID', name: 'tx_id' },
                            ]}
                            row={(payment, col) => {
                              switch (col) {
                                case 'id': {
                                  return <div className="flex h-12 items-center">{payment.id}</div>
                                }
                                case 'amount': {
                                  return (
                                    <div className="flex h-12 items-center">
                                      {formatMoney(payment.amount)} <SatsSvg className="ml-2" />
                                    </div>
                                  )
                                }
                                case 'provider': {
                                  return <div className="flex h-12 items-center">{payment.provider}</div>
                                }
                                case 'status': {
                                  return <div className="flex h-12 items-center">{formatOrderStatus(payment.status)}</div>
                                }
                                case 'tx_id': {
                                  return (
                                    <>
                                      {payment.tx_id ? (
                                        <Link
                                          target="_blank"
                                          href={mempoolTxUrl(payment.tx_id)}
                                          className="flex h-12 items-center text-blue-500 underline hover:no-underline"
                                        >
                                          {payment.tx_id}
                                        </Link>
                                      ) : (
                                        'N/A'
                                      )}
                                    </>
                                  )
                                }
                              }
                            }}
                            empty={() => <span className="text-sm text-gray-500">No payments recorded</span>}
                          />
                        </Dropdown>
                      </td>
                    </tr>
                  )}
                </>
              )
            })}
          </>
        )}
      </table>
      {data.length === 0 && <div className="flex h-[10vh] items-center justify-center">{empty()}</div>}
    </>
  )
}

function TableHead({ cols }: { cols: TableColumn[] }) {
  return (
    <tr className="border-b border-gray-300">
      {cols.map((col, i) => {
        return (
          <th
            key={i}
            className={clsx('py-4 text-sm first-of-type:pl-4 last-of-type:pr-4', {
              'text-right': col.align === 'right',
              'text-left': col.align !== 'right',
            })}
          >
            {col.title}
          </th>
        )
      })}
    </tr>
  )
}

function Row({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}

Table.Row = Row

export default Table

function Dropdown({ children }: { children?: React.ReactNode }) {
  return (
    <Disclosure>
      {({ open }) => (
        <div className="w-full">
          <Disclosure.Button className="flex w-full items-center justify-between bg-primary/[0.1] px-4 py-2 text-left font-medium  hover:bg-primary/[0.3] ">
            <span className="text-xs text-gray-500">View order payments</span>
            <ChevronUpIcon className={`${open ? 'rotate-180' : ''} h-5 w-5 text-primary/[0.5]`} />
          </Disclosure.Button>
          <Disclosure.Panel className="w-full bg-primary/[0.1] px-4 pb-2 pt-4 text-sm text-gray-500">{children}</Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  )
}
