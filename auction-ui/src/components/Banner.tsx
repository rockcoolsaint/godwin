import React from 'react'

export default function Banner({ children }: { children?: React.ReactNode }) {
  return <div className="flex min-h-[40px] w-full items-center justify-center bg-gradient">{children}</div>
}
