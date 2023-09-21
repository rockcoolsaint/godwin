'use client'
import { Container } from 'src/core'
import * as React from 'react'
import { Auction } from 'src/api/auction/types'
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, SortingState, getSortedRowModel } from '@tanstack/react-table'
import Link from 'src/components/shared/Link'
import { formatDate } from 'src/utils/date'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import { formatMoney } from 'src/utils/currency'
import { useRouter } from 'next/navigation'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { Tooltip, TooltipContent, TooltipTrigger } from 'src/components/shared/Tooltip'
import useSatsToFiat from 'src/hooks/useSatsToFiat'

export default function AuctionSchedule({ auctionsData }: { auctionsData: Auction[] }) {
  const [data, _] = React.useState(() => [...auctionsData])

  const [sorting, setSorting] = React.useState<SortingState>([])
  const columnHelper = createColumnHelper<Auction>()
  const router = useRouter()

  const columns = [
    columnHelper.accessor(row => row.epoch, {
      id: 'Epoch',
      cell: cell => {
        if (cell.row.original.epoch?.epoch_number) {
          return <p>{cell.row.original.epoch?.epoch_number}</p>
        } else {
          return <p>-</p>
        }
      },
      header: () => <span>Epoch</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.start_at, {
      id: 'start_at',
      cell: info => <p>{formatDate(info.getValue(), 'MMMM d')} </p>,
      header: () => <span>Estimated start</span>,
      footer: info => info.column.id,
    }),

    columnHelper.accessor(row => row.auction_meta.hashrate, {
      id: 'hashrate',
      cell: cell => {
        return (
          <Link className="text-primary underline" href={`${cell.row.original.slug}`}>
            {cell.row.original.auction_meta.hashrate} TH/s
          </Link>
        )
      },
      header: () => <span>Speed</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.current_bid, {
      id: 'bid',
      cell: info => {
        return <ShowToolTip bid={info.getValue()} />
      },
      header: () => <span>Bid</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('going_hashprice', {
      header: () => (
        <div className="flex flex-col">
          <span>Hashprice</span>
          <span>sats TH/s/day</span>
        </div>
      ),
      cell: cell => {
        if (cell.row.original.going_hashprice) {
          return <p>{Math.round(cell.row.original.going_hashprice)}</p>
        } else {
          return <p>-</p>
        }
      },
      footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.end_at, {
      id: 'end_at',
      cell: info => {
        const Completionist = () => (
          <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
            Auction ended
          </span>
        )

        const renderer = ({ hours, completed }: CountdownRenderProps) => {
          if (completed) {
            return <Completionist />
          } else {
            return (
              <span>
                {hours} {hours > 1 ? 'hours' : 'hour'}
              </span>
            )
          }
        }

        return <Countdown date={info.getValue()} renderer={renderer} />
      },
      header: () => <span>Time remaining</span>,
      footer: info => info.column.id,
    }),
  ]

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <Container className="w-12/12 flex items-center justify-center overflow-scroll sm:w-8/12">
      <section className="flex w-full flex-col items-center justify-center overflow-scroll pl-[30rem] sm:pl-0">
        <h1 className="mb-4">Auction Market</h1>
        <table className="w-full border border-gray-400">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <th
                      className="border-b border-r border-gray-400 px-8 py-2 text-center font-semibold"
                      key={header.id}
                      colSpan={header.colSpan}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'flex text-center justify-center items-center cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: <ChevronUpIcon className="ml-2 h-4 w-4 font-extrabold" />,
                            desc: <ChevronDownIcon className="ml-2 h-4 w-4 font-extrabold" />,
                          }[header.column.getIsSorted() as string] ?? (
                            <div className="ml-2 flex flex-col">
                              <ChevronUpIcon className="h-2 w-2" />
                              <ChevronDownIcon className="h-2 w-2" />
                            </div>
                          )}
                        </div>
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr
                className="odd:bg-white even:bg-gray-100 hover:cursor-pointer hover:bg-primary/[0.15]"
                key={row.id}
                onClick={() => router.push(`/auctions/${row.original.slug}`)}
              >
                {row.getVisibleCells().map(cell => (
                  <td className="border-r border-gray-400 p-4 text-center" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <i className="mt-8">Bitcoin&rsquo;s difficulty epochs are ~ 14 days (2,016 blocks) in duration </i>
        <Link className="mb-16 mt-4 text-primary underline" href="/collections">
          View all auctions
        </Link>
      </section>
    </Container>
  )
}

const ShowToolTip = ({ bid }: { bid: number }) => {
  const priceInFiat = useSatsToFiat({ initialValue: 0, bid })

  return (
    <Tooltip placement="left">
      <TooltipTrigger>
        <p>{formatMoney(bid)} sats</p>
      </TooltipTrigger>

      <TooltipContent className="w-max rounded bg-gray-600 px-2 py-1 text-xs font-medium text-white">
        ${formatMoney(priceInFiat)}
      </TooltipContent>
    </Tooltip>
  )
}
