'use client'

import { Toaster as ReactHotToaster } from 'react-hot-toast'
import { ClientOnly } from 'src/components/shared/ClientOnly'

export default function Toaster() {
  return (
    <ClientOnly>
      <ReactHotToaster position="top-left" />
    </ClientOnly>
  )
}
