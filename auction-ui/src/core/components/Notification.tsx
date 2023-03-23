/* eslint-disable react/jsx-no-bind */
import clsx from 'clsx'
import { NotificationData, NotificationType, useNotificationContext } from 'src/core/providers/NotificationProvider'

export default function Notification({ id, title, content, type }: NotificationData) {
  const { close, pause, resume } = useNotificationContext()

  return (
    <div
      className={clsx('pointer-events-auto flex max-w-[300px] flex-col rounded-lg text-xs shadow-md', {
        'bg-blue-500': type === NotificationType.Info,
        'bg-green-500': type === NotificationType.Success,
        'bg-red-500': type === NotificationType.Error,
      })}
      onMouseEnter={() => pause(id)}
      onMouseLeave={() => resume(id)}
    >
      <div className="flex h-10 items-center justify-between border-b border-white border-opacity-20 px-3">
        <span className="font-bold text-white">{title}</span>
        <button
          onClick={() => close(id)}
          className="flex h-5 w-5 items-center justify-center rounded bg-black bg-opacity-20 hover:bg-opacity-10"
        />
      </div>
      <div className="p-3">
        <span className="leading-6 text-white">{content}</span>
      </div>
    </div>
  )
}
