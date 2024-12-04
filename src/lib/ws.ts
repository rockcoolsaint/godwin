/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-console */
class WS {
  socket: WebSocket | undefined
  subscriptions: { [key: string]: any }
  callbacks: { [key: number]: any }
  onConnect: () => void
  idc: number

  constructor() {
    this.socket = undefined
    this.subscriptions = {}
    this.callbacks = {}
    this.onConnect = () => {}
    this.idc = 0
  }

  connect(accountId: number, token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = process.env.NEXT_PUBLIC_APP_WS_SERVER_URL || undefined
      if (!url) {
        return reject('No valid ws url provided.')
      }

      // Close existing socket if any
      if (this.socket) {
        this.socket.close()
      }

      this.socket = new WebSocket(`${url}`)
      this.socket.onerror = reject
      this.socket.onopen = () => {
        this.emit('authorize', { account_id: accountId, token })
        this.handleConnect()
      }
      this.socket.onclose = this.handleDisconnect.bind(this)
      this.socket.onmessage = this.handleMessage.bind(this)
      this.onConnect = () => {
        resolve()
      }
    })
  }

  handleConnect() {
    console.log('connected')
  }

  handleDisconnect() {
    console.log('disconnected')
    // Clear subscriptions on disconnect
    this.subscriptions = {}
    this.callbacks = {}
  }

  handleMessage(e: any) {
    try {
      const { action, payload, request_id } = JSON.parse(e.data)
      console.log('[ws] Received message:', action, payload) // Debug log

      switch (action) {
        case 'authorized': {
          console.log('[ws] authorized')
          this.onConnect()
          this.onConnect = () => {}
          break
        }

        case 'update': {
          const { channel, update } = payload
          if (!this.subscriptions.hasOwnProperty(channel)) {
            return
          }

          const sc = this.subscriptions[channel]
          sc.forEach((sub: (update: any) => void) => sub(update))
          break
        }

        case 'result': {
          if (!this.callbacks.hasOwnProperty(request_id)) {
            return
          }

          const cb = this.callbacks[request_id]
          delete this.callbacks[request_id]

          cb(payload)
          break
        }

        case 'chat_message': {
          if (this.subscriptions.hasOwnProperty('chat_message')) {
            const handlers = this.subscriptions['chat_message']
            handlers.forEach((handler: (messages: any) => void) => {
              console.log('[ws] Sending chat message to handler:', payload)
              handler(payload)
            })
          }
          break
        }

        case 'get_chat_messages': {
          if (request_id && this.callbacks.hasOwnProperty(request_id)) {
            const cb = this.callbacks[request_id]
            delete this.callbacks[request_id]
            cb(payload)
          }
          break
        }
      }
    } catch (ex) {
      console.error('[ws] Error handling message:', ex)
    }
  }

  subscribe(channel: string, handler: (update: any) => void) {
    if (!this.subscriptions.hasOwnProperty(channel)) {
      this.subscriptions[channel] = []
    }

    this.subscriptions[channel].push(handler)

    if (this.socket?.readyState === WebSocket.OPEN) {
      this.emit('subscribe', channel)
      console.log(`[ws] subscribe ${channel}`)
    }
  }

  unsubscribe(channel: string, handler: (update: any) => void) {
    if (!this.subscriptions.hasOwnProperty(channel)) {
      return
    }

    const sc = this.subscriptions[channel]
    const idx = sc.findIndex((sub: (update: any) => void) => sub === handler)
    if (idx !== -1) {
      sc.splice(idx, 1)
      if (this.socket?.readyState === WebSocket.OPEN) {
        this.emit('unsubscribe', channel)
        console.log(`[ws] unsubscribe ${channel}`)
      }
    }
  }

  emit(action: string, payload?: any) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.warn('[ws] Cannot emit - socket not ready')
      return
    }

    this.socket.send(JSON.stringify({ action, payload }))
  }

  request(action: string, payload?: any) {
    return new Promise((resolve, reject) => {
      if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
        return reject('Socket not connected or not ready')
      }

      this.idc++
      const requestId = this.idc

      this.callbacks[requestId] = (payload: any) => {
        resolve(payload)
      }

      this.socket.send(JSON.stringify({ action, payload, request_id: requestId }))
    })
  }

  isConnected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new WS()