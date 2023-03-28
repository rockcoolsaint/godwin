import clsx from 'clsx'
import * as icons from './icons'

export default function Icon({ className, icon }: { className?: string; icon: string }) {
  if (!(icon in icons)) {
    return null
  }

  const Component = (icons as any)[icon]

  return (
    <div className={clsx(className, 'h-4 w-4 text-black')}>
      <Component />
    </div>
  )
}
