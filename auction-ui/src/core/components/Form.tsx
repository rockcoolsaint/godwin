/* eslint-disable react/jsx-no-bind */
'use client'

import React, { ReactElement } from 'react'
import clsx from 'clsx'
import Button from './Button'

function Form({ children, className, onSubmit }: { children: React.ReactNode; className?: string; onSubmit: (data: object) => void }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    onSubmit(data)
  }

  return (
    <form className={clsx('flex flex-col gap-8', className)} onSubmit={handleSubmit}>
      {React.Children.map(children, Child => {
        return React.cloneElement(Child as ReactElement, {})
      })}
    </form>
  )
}

function Field({ children, className, required }: { children: React.ReactNode; className?: string; required?: boolean }) {
  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      {React.Children.map(children, Child => {
        return React.cloneElement(Child as ReactElement, { required })
      })}
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

function Submit({ children, className }: { children: React.ReactNode; className?: string }) {
  // const handleClick = () => {
  //   console.log('submit')
  // }

  return (
    <Button className={clsx(className)} type="submit">
      {children}
    </Button>
  )
}

Form.Field = Field
Form.Submit = Submit
Field.Label = Label

export default Form
