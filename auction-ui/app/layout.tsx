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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Rigly</title>
      </head>
      <body>
        <NotificationProvider>
          <AccountProvider>
            <WebsocketProvider>
              <section className="flex h-screen w-screen flex-col justify-between">
                <Header />
                <div className="mb-auto grow bg-white">{children}</div>
                <Footer />
              </section>
            </WebsocketProvider>
          </AccountProvider>
        </NotificationProvider>
      </body>
    </html>
  )
}
