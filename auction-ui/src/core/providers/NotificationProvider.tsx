/* eslint-disable @typescript-eslint/no-empty-function */
'use client'

import React, { createContext, useContext, useState } from 'react'
import Notification from 'src/core/components/Notification'

export enum NotificationType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
}

export interface NotificationData {
  id?: number
  title: string
  content: string
  timeout?: ReturnType<typeof setTimeout>
  type?: NotificationType
}

interface NotificationContextType {
  notifications: NotificationData[]
  success: (notification: NotificationData) => void
  error: (notification: NotificationData) => void
  info: (notification: NotificationData) => void
  close: (id: number | undefined) => void
  pause: (id: number | undefined) => void
  resume: (id: number | undefined) => void
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  success: () => {},
  error: () => {},
  info: () => {},
  close: () => {},
  pause: () => {},
  resume: () => {},
})

const timeoutDuration = 5000
let idCounter = 0

export const useNotificationContext = () => useContext(NotificationContext)

export default function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationData[]>([])

  const notify = (title: string, content: string, type: NotificationType) => {
    const id = idCounter++
    const timeout = setTimeout(() => close(id), timeoutDuration)
    setNotifications([...notifications, { id, title, content, timeout, type }])
  }

  const success = (notification: { title: string; content: string }) => {
    notify(notification.title, notification.content, NotificationType.Success)
  }

  const error = (notification: { title: string; content: string }) => {
    notify(notification.title, notification.content, NotificationType.Error)
  }

  const info = (notification: { title: string; content: string }) => {
    notify(notification.title, notification.content, NotificationType.Info)
  }

  const close = (id: number | undefined) => {
    if (id === undefined) {
      return
    }

    const newNotifications = [...notifications]
    const idx = newNotifications.findIndex(n => n.id === id)
    newNotifications.splice(idx, 1)
    setNotifications(newNotifications)
  }

  const pause = (id: number | undefined) => {
    if (id === undefined) {
      return
    }

    const newNotifications = [...notifications]
    const idx = newNotifications.findIndex(n => n.id === id)
    const notification = newNotifications[idx]
    clearTimeout(notification.timeout)
  }

  const resume = (id: number | undefined) => {
    if (id === undefined) {
      return
    }

    const newNotifications = [...notifications]
    const idx = newNotifications.findIndex(n => n.id === id)
    const notification = newNotifications[idx]
    // TODO: Replace timeoutDuration with remaining time.
    notification.timeout = setTimeout(() => close(id), timeoutDuration)
    setNotifications(newNotifications)
  }

  return (
    <NotificationContext.Provider value={{ notifications, success, error, info, close, pause, resume }}>
      <div className="pointer-events-none fixed inset-0 top-20 flex flex-col items-end justify-start gap-4 p-8" id="notifications">
        {notifications.map((notification, i) => {
          return <Notification key={i} {...notification} />
        })}
      </div>
      <>{children}</>
    </NotificationContext.Provider>
  )
}
