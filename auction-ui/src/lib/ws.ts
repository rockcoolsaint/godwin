class WS {
  socket: WebSocket | undefined
  subscriptions: { [key: string]: any }

  constructor() {
    this.socket = undefined
    this.subscriptions = {}
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket = new WebSocket('ws://localhost:8000/ws/socket_server/')
      this.socket.onerror = reject
      this.socket.onopen = () => {
        this.handleConnect()
        resolve()
      }
      this.socket.onclose = this.handleDisconnect.bind(this)
      this.socket.onmessage = this.handleMessage.bind(this)
    })
  }

  handleConnect() {
    // console.log('connected')
  }

  handleDisconnect() {
    // console.log('disconnected')
  }

  handleMessage(e: any) {
    try {
      const { action, payload } = JSON.parse(e.data)

      switch (action) {
        case 'connect': {
          // console.log('connected')
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

        case 'place_bid_ack': {
          console.log('bid placed')
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
  }

  unsubscribe(channel: string, handler: (update: any) => void) {
    if (!this.subscriptions.hasOwnProperty(channel)) {
      return
    }

    const sc = this.subscriptions[channel]
    const idx = sc.findIndex((sub: (update: any) => void) => sub === handler)
    sc.splice(idx, 1)

    this.emit('unsubscribe', channel)
  }

  emit(action: string, payload?: any) {
    if (!this.socket) {
      return
    }

    this.socket.send(JSON.stringify({ action, payload }))
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new WS()
