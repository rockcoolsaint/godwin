'use client'

import * as React from 'react'
import { Auction } from 'src/api/auction/types'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel,
  VisibilityState,
} from '@tanstack/react-table'
import Link from 'src/components/shared/Link'
import { formatDate } from 'src/utils/date'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import { formatMoney } from 'src/utils/currency'
import { useRouter } from 'next/navigation'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { Tooltip, TooltipContent, TooltipTrigger } from 'src/components/shared/Tooltip'
import useSatsToFiat from 'src/hooks/useSatsToFiat'
import { useMobileScreen } from 'src/hooks/useIsMobile'
import { useMemo } from 'react'

export default function AuctionSchedule({ auctionsData }: { auctionsData: Auction[] }) {
  const initialSorting = useMemo(() => {
    return [
      {
        id: 'epoch',
        desc: false, // columns sorting are inverted - so this is actually descending
      },
    ]
  }, [])

  const [data, _] = React.useState(() => [...auctionsData])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [sorting, setSorting] = React.useState<SortingState>(initialSorting)
  const isMobile = useMobileScreen()
  const columnHelper = createColumnHelper<Auction>()
  const router = useRouter()

  const columns = [
    columnHelper.accessor(row => row.epoch?.epoch_number, {
      id: 'epoch',
      cell: cell => {
        if (cell.row.original.epoch?.epoch_number) {
          return (
            <p className="flex flex-col">
              <span className="text-xs font-medium text-gray-500/[.85]">Epoch {cell.row.original.epoch?.epoch_number}</span>
              {formatDate(cell.row.original.epoch?.start_time, 'MMM d')} - {formatDate(cell.row.original.epoch?.end_time, 'MMM d')}
            </p>
          )
        } else {
          return <p>N/A</p>
        }
      },
      header: () => (
        <Tooltip placement="top">
          <TooltipTrigger>
            <p className="flex items-center">Epoch</p>
          </TooltipTrigger>

          <TooltipContent className="w-max rounded bg-gray-600 px-2 py-1 text-xs font-medium text-white">
            Bitcoin’s difficulty epochs are ~ 14 days (2,016 blocks) in duration
          </TooltipContent>
        </Tooltip>
      ),
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
      enableSorting: false,
    }),
    columnHelper.accessor(row => row.current_bid, {
      id: 'bid',
      cell: info => {
        return <ShowToolTip bid={info.getValue()} />
      },
      header: () => <span>Bid (sats)</span>,
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
          return <p>N/A</p>
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

        const renderer = ({ days, hours, minutes, seconds, completed }: CountdownRenderProps) => {
          if (completed) {
            return <Completionist />
          } else {
            return (
              <div className="font-medium text-green-700">
                {days >= 1 && (
                  <span>
                    {days} {days > 1 ? 'days' : 'day'}
                  </span>
                )}{' '}
                {hours >= 1 ? (
                  <span>
                    {hours} {hours > 1 ? 'hours' : 'hour'}
                  </span>
                ) : (
                  <span>
                    {minutes} {minutes > 1 ? 'minutes' : 'minute'}
                  </span>
                )}
                {hours < 1 && minutes < 1 && (
                  <span>
                    {seconds} {seconds > 1 ? 'seconds' : 'second'}
                  </span>
                )}
              </div>
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
      columnVisibility: {
        ...columnVisibility,
        end_at: !isMobile,
      },
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  if (data.length === 0) {
    return null
  }

  return (
    <>
      <h1 className="font-chakra text-7xl text-white">Bid, win, hash.</h1>
      <p className="my-10 w-11/12 text-center font-epilogue text-4xl text-white">
        Buy hashrate at auction, and send it to the pool of your choice.
      </p>
      <Link href="/auction-market" className="self-end rounded-xl bg-white p-4 font-epilogue text-sm font-bold text-navy">
        Explore Auctions
      </Link>
      <div className="mt-4 block w-full overflow-hidden rounded-lg bg-white">
        <table className="w-full border border-gray-400">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <th
                      className="border-b border-r border-gray-400 p-2 text-center text-xs font-semibold text-primary sm:px-8 sm:text-sm"
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
                              {header.column.getCanSort() && (
                                <>
                                  <ChevronUpIcon className="h-2 w-2" />
                                  <ChevronDownIcon className="h-2 w-2" />
                                </>
                              )}
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
                  <td className="border-r border-gray-400 p-2 text-center text-[0.6875rem] sm:p-4 sm:text-sm" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

const ShowToolTip = ({ bid }: { bid: number }) => {
  const priceInFiat = useSatsToFiat({ initialValue: 0, bid })

  return (
    <Tooltip placement="left">
      <TooltipTrigger>
        <p className="flex items-center">{formatMoney(bid)}</p>
      </TooltipTrigger>

      <TooltipContent className="w-max rounded bg-gray-600 px-2 py-1 text-xs font-medium text-white">
        ${formatMoney(priceInFiat)}
      </TooltipContent>
    </Tooltip>
  )
}
