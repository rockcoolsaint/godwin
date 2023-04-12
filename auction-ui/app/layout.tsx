import 'src/styles/globals.css'
import 'react-medium-image-zoom/dist/styles.css'

import { PropsWithChildren } from 'react'
import Header from 'src/components/shared/Header'
import Footer from 'src/components/shared/Footer'
import AccountProvider from 'src/providers/AccountProvider'
import NotificationProvider from 'src/core/providers/NotificationProvider'
import WebsocketProvider from 'src/providers/WebsocketProvider'
import Root from 'src/components/Root'

export default function RootLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <html lang="en" className="bg-page-background">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Rigly</title>
      </head>
      <body>
        <NotificationProvider>
          <AccountProvider>
            <WebsocketProvider>
              <Root>
                <section className="flex h-screen flex-col justify-between">
                  <Header />
                  {children}
                  <Footer />
                </section>
              </Root>
            </WebsocketProvider>
          </AccountProvider>
        </NotificationProvider>
      </body>
    </html>
  )
}
