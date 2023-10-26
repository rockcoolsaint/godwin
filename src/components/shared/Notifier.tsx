'use client'

import { useCallback, useEffect } from 'react'
import { ClientOnly } from 'src/components/shared/ClientOnly'
import { useNotificationsContext } from 'src/providers/NotificationsProvider'
import useSound from 'use-sound'
import winSfx from 'src/assets/audio/win.mp3'
import { AuctionStatus } from 'src/api/auction/types'

export default function Notifier() {
  const { showAuctionNotification, auctionStatus, showCheckoutNotification, auctionEndNotification, checkoutNotification } =
    useNotificationsContext()
  const [playOn] = useSound(winSfx)

  const handleShow = useCallback(() => {
    if (auctionEndNotification) {
      playOn()
      showAuctionNotification()
    }
    if (checkoutNotification) {
      showCheckoutNotification()
    }
  }, [auctionEndNotification, checkoutNotification, playOn, showAuctionNotification, showCheckoutNotification])

  useEffect(() => {
    if (auctionStatus === AuctionStatus.Completed) {
      handleShow()
    }
  }, [auctionStatus, handleShow])

  return (
    <ClientOnly>
      <div />
    </ClientOnly>
  )
}
