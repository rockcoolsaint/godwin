import 'src/styles/globals.css'
import 'react-medium-image-zoom/dist/styles.css'

import { PropsWithChildren } from 'react'
import Header from 'src/components/shared/Header'
import Footer from 'src/components/shared/Footer'
import AccountProvider from 'src/providers/AccountProvider'
import NotificationProvider from 'src/core/providers/NotificationProvider'
import WebsocketProvider from 'src/providers/WebsocketProvider'

export default function RootLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <html lang="en" className="bg-page-background">
      <head>
        <title>Rigly</title>
      </head>
      <body>
        <NotificationProvider>
          <AccountProvider>
            <WebsocketProvider>
              <div className="flex flex-col justify-between">
                <Header />
                {children}
                <Footer />
              </div>
            </WebsocketProvider>
          </AccountProvider>
        </NotificationProvider>
      </body>
    </html>
  )
}
