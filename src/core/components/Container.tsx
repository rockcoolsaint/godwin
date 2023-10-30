import clsx from 'clsx'

export default function Container({ id, className, children }: { id?: string; className?: string; children?: React.ReactNode }) {
  return (
    <div id={id} className={clsx(className, 'mx-auto w-full max-w-screen-2xl px-5 md:w-4/5 md:px-0 lg:w-11/12')}>
      {children}
    </div>
  )
}
