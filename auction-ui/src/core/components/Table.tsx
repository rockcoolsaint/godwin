import clsx from 'clsx'
import React from 'react'

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
          <tbody>
            {data.map((item: any, i: number) => {
              return (
                <Table.Row key={i}>
                  {cols.map((col, j) => {
                    return (
                      <td key={j} className="text-left text-sm first-of-type:pl-4 last-of-type:pr-4">
                        {row(item, col.name, i)}
                      </td>
                    )
                  })}
                </Table.Row>
              )
            })}
          </tbody>
        )}
      </table>
      {data.length === 0 && <div className="flex h-[10vh] items-center justify-center">{empty()}</div>}
    </>
  )
}

function TableHead({ cols }: { cols: TableColumn[] }) {
  return (
    <thead>
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
    </thead>
  )
}

function Row({ children }: { children?: React.ReactNode }) {
  return <tr className="border-b border-gray-300">{children}</tr>
}

Table.Row = Row

export default Table
