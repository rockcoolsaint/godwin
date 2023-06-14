'use client'

import React, { ReactNode } from 'react'
import clsx from 'clsx'

import Icon from './Icon'

interface ModalContext {
  open: boolean
  close: () => void
}

function Modal({
  children,
  open,
  onClose,
  className = 'w-full md:w-auto',
}: {
  children?: ReactNode
  open: boolean
  onClose: () => void
  className?: string
}) {
  const close = () => onClose()

  const modal: ModalContext = { open, close }

  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-40 p-4">
      <div className={clsx('rounded-lg bg-white shadow-lg', className)}>
        {React.Children.map(children, (Child: any) => {
          return React.cloneElement(Child, { modal })
        })}
      </div>
    </div>
  )
}

Modal.Header = function ModalHeader({ children, modal }: { children?: ReactNode; modal?: ModalContext }) {
  return (
    <div className="flex h-12 w-full items-center justify-between border-b border-gray-300 px-4">
      {React.Children.map(children, (Child: any) => {
        return React.cloneElement(Child, { modal })
      })}
    </div>
  )
}

Modal.Title = function ModalTitle({ children }: { children?: ReactNode }) {
  return <span className="font-bold">{children}</span>
}

Modal.Close = function ModalClose({ modal }: { modal?: ModalContext }) {
  return (
    <button onClick={modal?.close}>
      <Icon icon="times" className="h-5 w-5 text-black" />
    </button>
  )
}

Modal.Content = function ModalContent({ children, className }: { children?: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>
}

Modal.Footer = function ModalFooter({ children }: { children?: ReactNode }) {
  return <div className="flex h-12 w-full items-center justify-between border-t border-gray-300 px-4">{children}</div>
}

export default Modal
