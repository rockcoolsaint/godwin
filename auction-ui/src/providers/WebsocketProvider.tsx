'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import ws from 'src/lib/ws'

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

  useEffect(() => {
    const prepare = async () => {
      try {
        await ws.connect()

        setReady(true)
      } catch (ex: any) {
        console.error(ex.message)
      }
    }
    prepare()
  }, [])

  return <WebsocketContext.Provider value={{ isSocketReady: ready, socket: ws }}>{children}</WebsocketContext.Provider>
}
