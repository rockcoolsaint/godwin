/* eslint-disable react/jsx-no-bind */
'use client'

import React, { ReactElement } from 'react'
import clsx from 'clsx'
import Button from './Button'

function Form({
  children,
  className,
  onSubmit,
  disabled,
}: {
  children: React.ReactNode
  className?: string
  onSubmit: (data: object) => void
  disabled?: boolean
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    onSubmit(data)
  }

  return (
    <form className={clsx('flex flex-col', className)} onSubmit={handleSubmit}>
      {React.Children.map(children, Child => {
        if (!Child) {
          return null
        }

        return React.cloneElement(Child as ReactElement, { disabled: disabled })
      })}
    </form>
  )
}

function Field({
  children,
  className,
  required,
  disabled,
  errors,
}: {
  children: React.ReactNode
  className?: string
  required?: boolean
  disabled?: boolean
  errors?: string[]
}) {
  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      {React.Children.map(children, Child => {
        if (!Child) {
          return null
        }

        return React.cloneElement(Child as ReactElement, { required, disabled, errors })
      })}

      {errors && (
        <div className="flex flex-col">
          {errors.map((err, i) => (
            <span key={i} className="text-xs text-red-500">
              {err}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function Label({
  children,
  className,
  htmlFor,
  required,
  hideSuffix,
}: {
  children: React.ReactNode
  className?: string
  htmlFor?: string
  required?: boolean
  hideSuffix?: boolean
}) {
  return (
    <label htmlFor={htmlFor} className={clsx('flex items-center justify-start gap-1 text-sm text-gray-500', className)}>
      {children}
      {!hideSuffix && required && <span className="text-red-500">*</span>}
      {!hideSuffix && !required && <span className="">(Optional)</span>}
    </label>
  )
}

function Submit({ children, className, disabled }: { children: React.ReactNode; className?: string; disabled?: boolean }) {
  return (
    <Button className={clsx(className, { 'bg-gray-300': disabled })} type="submit" disabled={disabled}>
      {children}
    </Button>
  )
}

function Section({ children, className, title }: { children: React.ReactNode; className?: string; title?: React.ReactNode }) {
  return (
    <div className={clsx(className, 'w-full border-t border-gray-300 first-of-type:border-none last-of-type:border-b last-of-type:pb-8')}>
      <div className="flex h-10 w-full items-center justify-start border-b border-gray-300 px-4">
        <span className="text-xs font-semibold text-black">{title}</span>
      </div>
      <div className="flex flex-col gap-4 px-4 pt-4">{children}</div>
    </div>
  )
}

function Horizontal({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx(className, 'flex flex-col justify-between gap-4 lg:flex-row')}>{children}</div>
}

Form.Field = Field
Form.Submit = Submit
Form.Section = Section
Form.Horizontal = Horizontal
Field.Label = Label

export default Form
