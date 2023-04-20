import clsx from 'clsx'

export default function Container({ className, children }: { className?: string; children?: React.ReactNode }) {
  return <div className={clsx(className, 'mx-auto w-full px-5 md:w-4/5 md:px-0')}>{children}</div>
}
