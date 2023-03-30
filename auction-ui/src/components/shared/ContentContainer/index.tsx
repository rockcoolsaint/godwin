import { twMerge } from 'tailwind-merge'

interface Props {
  children: React.ReactNode
  className?: string
  title?: string
}

export default function ContentContainer({ children, className = '', title }: Props) {
  return (
    <div className={twMerge(`shadow-level-2 w-full rounded-3xl bg-white p-6 py-40 lg:px-40`, className)}>
      {title && <h1 className="text-title-2 mb-4 flex-1 text-center text-5xl text-black">{title}</h1>}
      {children}
    </div>
  )
}
