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
import { epilogue, chakra } from './fonts'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const NotificationsProvider = dynamic(() => import('src/providers/NotificationsProvider'), {
  ssr: false,
})

const Notifier = dynamic(() => import('src/components/shared/Notifier'), {
  ssr: false,
})

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
      <Head>
        <GoogleAnalytics />
        <title>Rigly</title>
        <link rel="icon" href="/icon.png?latest" type="image/png" sizes="32x32" />
      </Head>
      <body>
        <AccountProvider>
          <Toaster />
          <WebsocketProvider>
            <NotificationsProvider>
              <Notifier />
              <div className="flex flex-col justify-between overflow-x-hidden">{children}</div>
            </NotificationsProvider>
          </WebsocketProvider>
        </AccountProvider>

        <Script src="https://cdnjs.cloudflare.com/ajax/libs/plotly.js/1.33.1/plotly.min.js" defer />
        <Script async id="chatwoot-script">
          {`
            (function(d,t) {
              var BASE_URL="https://app.chatwoot.com";
              var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
              g.src=BASE_URL+"/packs/js/sdk.js";
              g.defer = true;
              g.async = true;
              s.parentNode.insertBefore(g,s);
              g.onload=function(){
                window.chatwootSDK.run({
                  websiteToken: '7zjKmUbkWTy4oBaAsYn8rjHc',
                  baseUrl: BASE_URL
                })
              }
            })(document,"script");
          `}
        </Script>
      </body>
    </html>
  )
}
