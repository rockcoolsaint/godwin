import 'src/styles/globals.css'
import 'react-medium-image-zoom/dist/styles.css'

import { PropsWithChildren } from 'react'
import Footer from 'src/components/shared/Footer'
import AccountProvider from 'src/providers/AccountProvider'
import WebsocketProvider from 'src/providers/WebsocketProvider'
import { Poppins } from 'next/font/google'
import Toaster from 'src/components/shared/Toaster'
import Script from 'next/script'
import GoogleAnalytics from 'src/components/shared/GoogleAnalytics'

const poppins = Poppins({
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
})

export default function RootLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <html lang="en" className={poppins.className}>
      <head>
        <GoogleAnalytics />
        <title>Rigly</title>
        <link rel="icon" href="/icon.png?latest" type="image/png" sizes="32x32" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/plotly.js/1.33.1/plotly.min.js" />
      </head>
      <body>
        <AccountProvider>
          <Toaster />
          <WebsocketProvider>
            <div className="flex flex-col justify-between">
              {children}
              <Footer />
            </div>
          </WebsocketProvider>
        </AccountProvider>
      </body>
    </html>
  )
}
