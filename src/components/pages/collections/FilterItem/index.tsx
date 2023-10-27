'use client'
import clsx from 'clsx'
import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'src/components/shared/Link'
import { createUrl } from 'utils'
import type { AuctionSortFilterItem, AuctionStatusFilterItem, AuctionTypeFilterItem } from 'src/utils/constants'
import FilterItemDropdown from './dropdown'

export interface PathFilterItem {
  title: string
  path: string
}

export function PathFilterItem({ item }: { item: PathFilterItem }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const active = pathname === item.path
  const newParams = new URLSearchParams(searchParams.toString())
  const DynamicTag = active ? 'p' : Link

  newParams.delete('q')

  return (
    <li className="mt-2 flex text-black " key={item.title}>
      <DynamicTag
        href={createUrl(item.path, newParams)}
        className={clsx('w-full text-sm underline-offset-4 hover:text-neutral-600 hover:underline', {
          'underline underline-offset-4': active,
        })}
      >
        {item.title}
      </DynamicTag>
    </li>
  )
}

export interface PathFilterItem {
  title: string
  path: string
}

function SortFilterItem({ item }: { item: AuctionSortFilterItem }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const active = searchParams.get('sort') === item.slug
  const q = searchParams.get('auction_type')
  const next = searchParams.get('next')
  const href = createUrl(
    pathname,
    new URLSearchParams({
      ...(q && { auction_type: q }),
      ...(next && { next: next }),
      ...(item.slug && item.slug.length && { sort: item.slug }),
    }),
  )
  const DynamicTag = active ? 'p' : Link

  return (
    <li className="mt-2 flex text-sm text-black " key={item.title}>
      <DynamicTag
        prefetch={!active ? false : undefined}
        href={href}
        className={clsx('w-full hover:underline hover:underline-offset-4', {
          'underline underline-offset-4': active,
        })}
      >
        {item.title}
      </DynamicTag>
    </li>
  )
}

function AuctionTypeFilterItem({ item }: { item: AuctionTypeFilterItem }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const active = searchParams.get('auction_type') === item.slug
  const q = searchParams.get('sort')
  const next = searchParams.get('next')
  const href = createUrl(
    pathname,
    new URLSearchParams({
      ...(q && { sort: q }),
      ...(next && { next: next }),
      ...(item.slug && item.slug.length && { auction_type: item.slug }),
    }),
  )
  const DynamicTag = active ? 'p' : Link

  return (
    <li className="mt-2 flex text-sm text-black " key={item.title}>
      <DynamicTag
        prefetch={!active ? false : undefined}
        href={href}
        className={clsx('w-full hover:underline hover:underline-offset-4', {
          'underline underline-offset-4': active,
        })}
      >
        {item.title}
      </DynamicTag>
    </li>
  )
}

export type ListItem = AuctionSortFilterItem | AuctionStatusFilterItem | AuctionTypeFilterItem

export default function FilterItem({ item }: { item: ListItem }) {
  if ('path' in item) {
    return <PathFilterItem item={item} />
  }
  if ('filterKey' in item) {
    return <AuctionTypeFilterItem item={item} />
  }
  if ('sortKey' in item) {
    return <SortFilterItem item={item} />
  }
}

export function FilterList({ list, title }: { list: ListItem[]; title?: string }) {
  return (
    <>
      <nav>
        {title ? <h3 className="hidden text-xs font-medium text-neutral-500 lg:block">{title}</h3> : null}
        <ul className="hidden lg:block">
          <FilterItemList list={list} />
        </ul>
        <ul className="px-5 md:px-0 lg:hidden">
          <FilterItemDropdown list={list} />
        </ul>
      </nav>
    </>
  )
}

function FilterItemList({ list }: { list: ListItem[] }) {
  return (
    <>
      {list.map((item: ListItem, i) => (
        <FilterItem key={i} item={item} />
      ))}
    </>
  )
}
