'use client'
import { useEffect } from 'react'

const chatwootToken = process.env.NEXT_PUBLIC_CHATWOOT_TOKEN

const ChatwootWidget = () => {
  useEffect(() => {
    // Chatwoot Settings
    window.chatwootSettings = {
      hideMessageBubble: false,
      position: 'right', // This can be left or right
      locale: 'en', // Language to be set
      type: 'standard', // [standard, expanded_bubble]
    }
    ;(function (d, t) {
      const BASE_URL = 'https://app.chatwoot.com'
      const g: HTMLScriptElement = d.createElement(t) as HTMLScriptElement
      const s = d.getElementsByTagName(t)[0]
      if (s) {
        g.src = BASE_URL + '/packs/js/sdk.js'
        s.parentNode?.insertBefore(g, s)
        g.async = true
        g.onload = function () {
          window.chatwootSDK.run({
            websiteToken: chatwootToken,
            baseUrl: BASE_URL,
          })
        }
      }
    })(document, 'script')
  }, [])

  return null
}

export default ChatwootWidget
