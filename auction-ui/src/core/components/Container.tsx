import clsx from 'clsx'

export default function Container({ className, children }: { className?: string; children?: React.ReactNode }) {
  return <div className={clsx(className, 'mx-auto w-full px-4 md:w-4/5 md:px-0 2xl:w-3/5')}>{children}</div>
}
