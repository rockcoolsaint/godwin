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
  const [error, setError] = useState<string | null>(null)
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
    console.log('[ChatWall] Socket state:', socket?.isConnected())
    
    if (!socket) {
      setError('Chat connection unavailable')
      setLoading(false)
      return
    }

    const loadMessages = async () => {
      try {
        console.log('[ChatWall] Requesting chat messages...')
        const response = await Promise.race([
          socket.request('get_chat_messages'),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Request timeout')), 9000)
          )
        ])
        
        console.log('[ChatWall] Received response:', response)
        
        if (response && Array.isArray(response.messages)) {
          setMessages(response.messages)
          setError(null)
        } else {
          console.error('[ChatWall] Invalid response format:', response)
          setError('Unable to load messages')
        }
      } catch (error) {
        console.error('[ChatWall] Failed to load messages:', error)
        setError('Failed to load messages. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    // Message handler for new messages
    const handleNewMessage = (data: any) => {
      console.log('[ChatWall] Received new message data:', data)
      if (data && Array.isArray(data.messages)) {
        setMessages(data.messages)
        setError(null)
      } else {
        console.error('[ChatWall] Invalid message data format:', data)
      }
    }

    // Load initial messages
    loadMessages()

    // Subscribe to chat messages
    socket.subscribe('chat_message', handleNewMessage)

    // Cleanup
    return () => {
      socket.unsubscribe('chat_message', handleNewMessage)
    }
  }, [socket])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim().length > 0 && newMessage.length <= 100 && account && socket) {
      try {
        console.log('[ChatWall] Sending new message:', newMessage)
        await socket.emit('chat_message', {
          message: newMessage.trim()
        })
        console.log('[ChatWall] Message sent successfully')
        setNewMessage('')
        setError(null)
      } catch (error) {
        console.error('[ChatWall] Error sending message:', error)
        setError('Failed to send message. Please try again.')
      }
    }
  }

  return (
    <div className="mt-2 p-4 border rounded-xl">      
      <div className="h-[225px] overflow-y-auto mb-4">
        {loading ? (
          <div className="text-center text-gray-500">Loading messages...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-500">
            {account ? 'No messages yet' : 'Sign up or login to view the bidder chat wall.'}
          </div>
        ) : (
          <div className="flex flex-col-reverse">
            {messages.map((msg, idx) => (
              <div key={`${msg.timestamp}-${idx}`} className="mb-2">
                <span className="text-gray-500 text-sm">
                  {formatMessageTime(msg.timestamp)}:{' '}
                </span>
                {msg.message}
              </div>
            ))}
          </div>
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
            disabled={!socket?.isConnected() || newMessage.trim().length === 0}
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