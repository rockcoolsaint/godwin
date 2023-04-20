/* eslint-disable react/jsx-no-bind */
import clsx from 'clsx'
import { NotificationData, NotificationType, useNotificationContext } from 'src/core/providers/NotificationProvider'
import Icon from './Icon'

export default function Notification({ id, title, content, type }: NotificationData) {
  const { close, pause, resume } = useNotificationContext()

  return (
    <div
      className={clsx(
        'pointer-events-auto flex min-w-[260px] max-w-[300px] flex-col rounded-lg border border-gray-300 bg-white text-xs shadow-lg',
      )}
      onMouseEnter={() => pause(id)}
      onMouseLeave={() => resume(id)}
    >
      <div className="flex h-10 items-center justify-between border-b border-gray-300 pl-3 pr-2">
        <span className="font-bold text-gray-600">{title}</span>
        <button
          onClick={() => close(id)}
          className="group flex h-5 w-5 items-center justify-center rounded hover:bg-black hover:bg-opacity-10"
        >
          <Icon icon="times" className="h-2 w-2 text-gray-600" />
        </button>
      </div>
      <div className="flex items-center justify-start gap-3 p-3">
        <div
          className={clsx('flex h-6 w-6 items-center justify-center rounded-full', {
            'bg-blue-500': type === NotificationType.Info,
            'bg-green-700': type === NotificationType.Success,
            'bg-red-700': type === NotificationType.Error,
          })}
        >
          <Icon
            icon={clsx({
              info: type === NotificationType.Info,
              check: type === NotificationType.Success,
              times: type === NotificationType.Error,
            })}
            className="h-3 w-3 text-white"
          />
        </div>
        <span className="leading-6 text-gray-600">{content}</span>
      </div>
    </div>
  )
}
