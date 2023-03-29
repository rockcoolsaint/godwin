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

        return React.cloneElement(Child as ReactElement, { disabled })
      })}
    </form>
  )
}

function Field({
  children,
  className,
  required,
  errors,
}: {
  children: React.ReactNode
  className?: string
  required?: boolean
  errors?: string[]
}) {
  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      {React.Children.map(children, Child => {
        if (!Child) {
          return null
        }

        return React.cloneElement(Child as ReactElement, { required, errors })
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
}: {
  children: React.ReactNode
  className?: string
  htmlFor: string
  required?: boolean
}) {
  return (
    <label htmlFor={htmlFor} className={clsx('flex justify-start gap-1 text-sm text-gray-500', className)}>
      {children}
      {required && <span className="text-red-500">*</span>}
      {!required && <span className="">(Optional)</span>}
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

Form.Field = Field
Form.Submit = Submit
Field.Label = Label

export default Form
