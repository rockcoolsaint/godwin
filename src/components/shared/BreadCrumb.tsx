'use client'

import React, { ReactNode } from 'react'

import { usePathname } from 'next/navigation'
import Link from './Link'

interface Props {
  homeElement: ReactNode
  separator: ReactNode
  containerClasses?: string
  listClasses?: string
  activeClasses?: string
  capitalizeLinks?: boolean
}

const BreadCrumb = ({ homeElement, separator, containerClasses, listClasses, activeClasses, capitalizeLinks }: Props) => {
  const paths = usePathname()
  const pathNames = paths.split('/').filter(path => path)

  return (
    <div>
      <ul className={containerClasses}>
        <li className={listClasses}>
          <Link href={'/'}>{homeElement}</Link>
        </li>
        {pathNames.length > 0 && separator}
        {pathNames.map((link, index) => {
          let href = `/${pathNames.slice(0, index + 1).join('/')}`

          const itemClasses = paths === href ? `${listClasses} ${activeClasses}` : listClasses
          const itemLink = capitalizeLinks ? link[0].toUpperCase() + link.slice(1, link.length) : link

          if (itemLink === 'auctions') {
            href = '/auction-market'
          }

          return (
            <React.Fragment key={index}>
              <li className={itemClasses}>
                <Link href={href}>{itemLink}</Link>
              </li>
              {pathNames.length !== index + 1 && separator}
            </React.Fragment>
          )
        })}
      </ul>
    </div>
  )
}

export default BreadCrumb
