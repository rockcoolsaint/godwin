'use client'

import { useEffect, useState } from 'react'
import { useWebsocketContext } from 'src/providers/WebsocketProvider'
import { useAccountContext } from 'src/providers/AccountProvider'
import { formatDistanceToNow } from 'date-fns'

interface Message {
  message: string
  timestamp: string
}

const ChatWall = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const { socket } = useWebsocketContext()
  const { account } = useAccountContext()

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp + 'Z')
    return formatDistanceToNow(date, {
      addSuffix: true,
      includeSeconds: true
    })
  }

  useEffect(() => {
    if (socket) {
      const loadMessages = async () => {
        try {
          console.log('[ChatWall] Requesting chat messages...')
          const response = await socket.request('get_chat_messages')
          console.log('[ChatWall] Received response:', response)
          if (response && response.messages) {
            setMessages(response.messages)
          }
        } catch (error) {
          console.error('Failed to load messages:', error)
        } finally {
          setLoading(false)
        }
      }

      // Load initial messages
      loadMessages()

      // Message handler
      const handleNewMessage = (data: any) => {
        console.log('[ChatWall] Received new message data:', data)
        if (data && data.messages) {
          setMessages(data.messages)
        }
      }

      // Subscribe to chat messages
      socket.subscribe('chat_message', handleNewMessage)

      return () => {
        socket.unsubscribe('chat_message', handleNewMessage)
      }
    }
  }, [socket])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.length <= 100 && account && socket) {
      console.log('[ChatWall] Sending new message:', newMessage)
      socket.emit('chat_message', {
        message: newMessage
      })
      setNewMessage('')
    }
  }

  return (
    <div className="mt-2 p-4 border rounded-xl">      
      <div className="h-[225px] overflow-y-auto mb-4">
        {loading ? (
          <div className="text-center text-gray-500">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-500">Sign up or login to view the bidder chat wall.</div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className="mb-2">
              <span className="text-gray-500 text-sm">
                {formatMessageTime(msg.timestamp)}:{' '}
              </span>
              {msg.message}
            </div>
          ))
        )}
      </div>

      {account ? (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            maxLength={100}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="Write your message to other bidders..."
          />
          <button 
            type="submit"
            disabled={!socket?.isConnected() || newMessage.length === 0}
            className="px-4 py-2 bg-orange-500 text-white rounded disabled:bg-gray-400"
          >
            Send
          </button>
        </form>
      ) : (
        <p className="text-center text-gray-500">Login to write messages</p>
      )}
    </div>
  )
}

export default ChatWall

