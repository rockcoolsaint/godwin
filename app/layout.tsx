/* eslint-disable @next/next/inline-script-id */
import 'src/styles/globals.css'
import 'react-medium-image-zoom/dist/styles.css'
import 'node_modules/react-modal-video/css/modal-video.min.css'
import 'animate.css'
import { PropsWithChildren } from 'react'
import AccountProvider from 'src/providers/AccountProvider'
import WebsocketProvider from 'src/providers/WebsocketProvider'
import Toaster from 'src/components/shared/Toaster'
import Script from 'next/script'
import GoogleAnalytics from 'src/components/shared/GoogleAnalytics'
import NotificationsProvider from 'src/providers/NotificationsProvider'
import Notifier from 'src/components/shared/Notifier'
import { epilogue, chakra } from './fonts'
import ChatwootWidget from 'src/lib/chatwoot'

export const metadata = {
  metadataBase: new URL('https://rigly.io'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
}

export default function RootLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <html lang="en" className={`${epilogue.variable} ${chakra.variable}`}>
      <head>
        <GoogleAnalytics />
        <title>Rigly</title>
        <link rel="icon" href="/icon.png?latest" type="image/png" sizes="32x32" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/plotly.js/1.33.1/plotly.min.js" />
      </head>
      <body>
        <ChatwootWidget />
        <AccountProvider>
          <Toaster />
          <WebsocketProvider>
            <NotificationsProvider>
              <Notifier />
              <div className="flex flex-col justify-between overflow-x-hidden">{children}</div>
            </NotificationsProvider>
          </WebsocketProvider>
        </AccountProvider>
      </body>
    </html>
  )
}
