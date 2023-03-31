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
      this.socket = new WebSocket(`${process.env.NEXT_PUBLIC_APP_WS_SERVER_URL}/ws/socket_server/`)
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
  }

  handleMessage(e: any) {
    try {
      const { action, payload, request_id } = JSON.parse(e.data)

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
      }
    } catch (ex) {}
  }

  subscribe(channel: string, handler: (update: any) => void) {
    if (!this.subscriptions.hasOwnProperty(channel)) {
      this.subscriptions[channel] = []
    }

    this.subscriptions[channel].push(handler)

    this.emit('subscribe', channel)

    console.log(`[ws] subscribe ${channel}`)
  }

  unsubscribe(channel: string, handler: (update: any) => void) {
    if (!this.subscriptions.hasOwnProperty(channel)) {
      return
    }

    const sc = this.subscriptions[channel]
    const idx = sc.findIndex((sub: (update: any) => void) => sub === handler)
    sc.splice(idx, 1)

    this.emit('unsubscribe', channel)

    console.log(`[ws] unsubscribe ${channel}`)
  }

  emit(action: string, payload?: any) {
    if (!this.socket) {
      return
    }

    this.socket.send(JSON.stringify({ action, payload }))
  }

  request(action: string, payload?: any) {
    return new Promise((resolve, reject) => {
      if (!this.socket) {
        return reject('Invalid socket')
      }

      this.idc++
      const requestId = this.idc

      this.callbacks[requestId] = (payload: any) => {
        resolve(payload)
      }

      this.socket.send(JSON.stringify({ action, payload, request_id: this.idc }))
    })
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new WS()
