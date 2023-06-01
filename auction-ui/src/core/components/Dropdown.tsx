/* eslint-disable react/jsx-no-bind */
'use client'

import clsx from 'clsx'
import React, { ReactElement, useEffect, useRef } from 'react'
import Link from 'src/components/shared/Link'

function withinRect(pos: { x: number; y: number }, rect: DOMRect) {
  return pos.x >= rect.left && pos.x <= rect.right && pos.y >= rect.top && pos.y <= rect.bottom
}

interface Orientation {
  vertical: 'top' | 'bottom' | 'center'
  horizontal: 'left' | 'right' | 'center'
}

function Dropdown({
  children,
  className,
  target,
  active,
  onClose,
  anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
  transformOrigin = { vertical: 'top', horizontal: 'left' },
  matchWidth,
}: {
  children?: React.ReactNode
  className?: string
  target: string
  active: boolean
  onClose?: () => void
  anchorOrigin: Orientation
  transformOrigin: Orientation
  matchWidth?: boolean
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

      let x = 0
      let y = 0

      if (anchorOrigin.vertical === 'top' && transformOrigin.vertical === 'top') {
        y = targetRect.top
      }

      if (anchorOrigin.vertical === 'bottom' && transformOrigin.vertical === 'bottom') {
        y = targetRect.bottom - dropdownRect.height
      }

      if (anchorOrigin.horizontal === 'left' && transformOrigin.horizontal === 'left') {
        x = targetRect.left
      }

      if (anchorOrigin.horizontal === 'right' && transformOrigin.horizontal === 'right') {
        x = targetRect.right - dropdownRect.width
      }

      if (anchorOrigin.vertical === 'top' && transformOrigin.vertical === 'bottom') {
        y = targetRect.top - dropdownRect.height
      }

      if (anchorOrigin.vertical === 'bottom' && transformOrigin.vertical === 'top') {
        y = targetRect.bottom
      }

      if (anchorOrigin.horizontal === 'left' && transformOrigin.horizontal === 'right') {
        x = targetRect.left - dropdownRect.width
      }

      if (anchorOrigin.horizontal === 'right' && transformOrigin.horizontal === 'left') {
        x = targetRect.right
      }

      if (anchorOrigin.horizontal === 'center' && transformOrigin.horizontal === 'center') {
        const htw = targetRect.width / 2
        const hdw = dropdownRect.width / 2
        x = matchWidth ? targetRect.x : targetRect.x + htw - hdw
      }

      dropdownEl.style.transform = `translate3d(${x}px, ${y}px, 0)`

      if (matchWidth) {
        dropdownEl.style.width = `${targetRect.width}px`
      }
    }
  }, [active, target, dropdownRef, anchorOrigin, transformOrigin, matchWidth])

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
      className={clsx(
        'absolute left-0 top-0 z-10 min-w-[200px] rounded-lg border border-gray-300 bg-white text-gray-600 shadow-lg',
        className,
        {
          'pointer-events-all visible': active,
          'pointer-events-none invisible': !active,
        },
      )}
    >
      {React.Children.map(children, Child => {
        return React.cloneElement(Child as ReactElement, { close: onClose })
      })}
    </div>
  )
}

Dropdown.Item = function DropdownItem({
  children,
  className,
  onClick,
  href,
  close,
}: {
  children?: React.ReactNode
  className?: string
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
        className={clsx(
          'flex cursor-pointer items-center justify-start gap-3 rounded bg-transparent bg-opacity-0 hover:bg-black hover:bg-opacity-5',
          className,
        )}
        onClick={handleClick}
      >
        {children}
      </Link>
    )
  }

  return (
    <div
      onClick={handleClick}
      className={clsx(
        'flex cursor-pointer items-center justify-start gap-3 rounded bg-transparent bg-opacity-0 hover:bg-black hover:bg-opacity-5',
        className,
      )}
    >
      {children}
    </div>
  )
}

Dropdown.Seperator = function DropdownSeperator() {
  return <div className="w-full border-t border-gray-300" />
}

export default Dropdown
