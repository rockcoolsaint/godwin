/* eslint-disable react/jsx-no-bind */
'use client'

import clsx from 'clsx'
import React, { ReactElement, useEffect, useRef } from 'react'
import Link from 'src/components/shared/Link'

function withinRect(pos: { x: number; y: number }, rect: DOMRect) {
  return pos.x >= rect.left && pos.x <= rect.right && pos.y >= rect.top && pos.y <= rect.bottom
}

function Dropdown({
  children,
  target,
  active,
  onClose,
}: {
  children?: React.ReactNode
  target: string
  active: boolean
  onClose?: () => void
}) {
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (active && dropdownRef.current) {
      const targetEl = document.getElementById(target)
      const dropdownEl = dropdownRef.current as HTMLElement

      if (!targetEl || !dropdownEl) {
        return
      }

      const targetRect = targetEl.getBoundingClientRect()
      const dropdownRect = dropdownEl.getBoundingClientRect()

      const x = targetRect.right - dropdownRect.width
      const y = targetRect.top

      dropdownEl.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }
  }, [active, target, dropdownRef])

  useEffect(() => {
    const handleClick = (e: any) => {
      const dropdownEl = dropdownRef.current
      if (!dropdownEl || !active) {
        return
      }

      const dropdownRect = (dropdownEl as HTMLElement).getBoundingClientRect()

      const mousePos = { x: e.clientX, y: e.clientY }
      const isWithinDropdown = withinRect(mousePos, dropdownRect)

      if (!isWithinDropdown && typeof onClose === 'function') {
        onClose()
      }
    }

    window.addEventListener('mouseup', handleClick)

    return () => {
      window.removeEventListener('mouseup', handleClick)
    }
  }, [active, dropdownRef, onClose])

  return (
    <div
      ref={dropdownRef}
      className={clsx('absolute top-0 left-0 z-10 min-w-[200px] rounded-lg border border-gray-300 bg-white text-gray-600 shadow-lg', {
        'pointer-events-all visible': active,
        'pointer-events-none invisible': !active,
      })}
    >
      {React.Children.map(children, Child => {
        return React.cloneElement(Child as ReactElement, { close: onClose })
      })}
    </div>
  )
}

Dropdown.Item = function DropdownItem({
  children,
  onClick,
  href,
  close,
}: {
  children?: React.ReactNode
  onClick?: () => void
  href?: string
  close?: () => void
}) {
  const handleClick = () => {
    if (typeof onClick === 'function') {
      onClick()
    }

    if (typeof close === 'function') {
      close()
    }
  }

  if (href) {
    return (
      <Link
        href={href}
        className="flex h-8 cursor-pointer items-center justify-start gap-3 rounded bg-transparent bg-opacity-0 px-3 hover:bg-black hover:bg-opacity-5"
        onClick={handleClick}
      >
        {children}
      </Link>
    )
  }

  return (
    <div
      onClick={handleClick}
      className="flex h-8 cursor-pointer items-center justify-start gap-3 rounded bg-transparent bg-opacity-0 px-3 hover:bg-black hover:bg-opacity-5"
    >
      {children}
    </div>
  )
}

Dropdown.Seperator = function DropdownSeperator() {
  return <div className="w-full border-t border-gray-300" />
}

export default Dropdown
