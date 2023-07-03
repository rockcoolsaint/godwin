import clsx from 'clsx'
import React from 'react'
import * as icons from './icons'

export default function Icon({ className, icon }: { className?: string; icon: string | React.ElementType }) {
  if (typeof icon !== 'string') {
    const Icon = icon

    return Icon
  }

  const Component = (icons as any)[icon]

  return (
    <div className={clsx(className, 'flex items-center justify-center text-black')}>
      <Component className="h-full w-full" />
    </div>
  )
}
