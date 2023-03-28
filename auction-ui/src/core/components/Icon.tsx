import clsx from 'clsx'
import * as icons from './icons'

export default function Icon({ className, icon }: { className?: string; icon: string }) {
  if (!(icon in icons)) {
    return null
  }

  const Component = (icons as any)[icon]

  return (
    <div className={clsx(className, 'flex items-center justify-center text-black')}>
      <Component className="h-full w-full" />
    </div>
  )
}
