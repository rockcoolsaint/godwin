'use client'
import { Container } from 'src/core'
import * as React from 'react'
import { Auction } from 'src/api/auction/types'
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, SortingState, getSortedRowModel } from '@tanstack/react-table'
import Link from 'src/components/shared/Link'
import { formatDate } from 'src/utils/date'
import Countdown, { CountdownRenderProps } from 'react-countdown'

export default function AuctionSchedule({ auctionsData }: { auctionsData: Auction[] }) {
  const [data, setData] = React.useState(() => [...auctionsData])

  const [sorting, setSorting] = React.useState<SortingState>([])
  const columnHelper = createColumnHelper<Auction>()

  const columns = [
    columnHelper.accessor(row => row.epoch?.epoch_number, {
      id: 'Epoch',
      cell: info => <p>{info.getValue()}</p>,
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
      cell: info => {
        return <b>{info.getValue()} TH/s</b>
      },
      header: () => <span>Speed</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.current_bid, {
      id: 'bid',
      cell: info => <p>{info.getValue()} TH/s</p>,
      header: () => <span>Bid</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('auction_meta.current_hash_price', {
      header: () => 'Hashprice',
      cell: info => info.renderValue(),
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

  console.log('data is ', data)

  return (
    <Container className="flex h-screen items-center justify-center md:w-6/12">
      <section className="flex w-full flex-col items-center justify-center">
        <h1 className="mb-4">Auction Market</h1>
        <table className="border border-gray-400">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <th className="border-b border-r border-gray-400 p-4" key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted() as string] ?? null}
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
              <tr className="odd:bg-white even:bg-gray-100" key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td className="border-r border-gray-400 p-4" key={cell.id}>
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
