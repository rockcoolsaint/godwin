'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import ws from 'src/lib/ws'
import { useAccountContext } from './AccountProvider'

interface WebsocketContextType {
  isSocketReady: boolean
  socket: any
}

const WebsocketContext = createContext<WebsocketContextType>({
  isSocketReady: false,
  socket: undefined,
})

export const useWebsocketContext = () => useContext(WebsocketContext)

export default function WebsocketProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState<boolean>(false)
  const { account, token } = useAccountContext()

  useEffect(() => {
    const prepare = async () => {
      if (ready || !account || !token) {
        return
      }

      try {
        await ws.connect(account.id, token)

        setReady(true)
      } catch (ex: any) {
        console.error(ex.message)
      }
    }

    prepare()
  }, [ready, account, token])

  return <WebsocketContext.Provider value={{ isSocketReady: ready, socket: ws }}>{children}</WebsocketContext.Provider>
}
