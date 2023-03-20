import clsx from 'clsx'

export default function Container({ className, children }: { className?: string; children?: React.ReactNode }) {
  return <div className={clsx(className, 'mx-auto w-4/5')}>{children}</div>
}
