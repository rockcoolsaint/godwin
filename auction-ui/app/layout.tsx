import 'src/styles/globals.css'
import 'react-medium-image-zoom/dist/styles.css'

// import Script from 'next/script'
import { PropsWithChildren } from 'react'
import Header from 'src/components/shared/Header'
import Footer from 'src/components/shared/Footer'
import AccountProvider from 'src/providers/AccountProvider'
import WebsocketProvider from 'src/providers/WebsocketProvider'
import { Poppins } from 'next/font/google'
import Toaster from 'src/components/shared/Toaster'
import Script from 'next/script'

const poppins = Poppins({
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
})

export default function RootLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <html lang="en" className={poppins.className}>
      <head>
        <title>Rigly</title>
        <link rel="icon" href="/icon.png?latest" type="image/png" sizes="32x32" />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-ZGN73NY72S" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-ZGN73NY72S');
          `}
        </Script>
        <Script src="https://cdn.plot.ly/plotly-2.24.1.min.js" />
      </head>
      <body>
        <AccountProvider>
          <Toaster />
          <WebsocketProvider>
            <div className="flex flex-col justify-between">
              <Header />
              {children}
              <Footer />
            </div>
          </WebsocketProvider>
        </AccountProvider>
      </body>
    </html>
  )
}
