/* eslint-disable @next/next/inline-script-id */
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
const intercom = process.env.NEXT_PUBLIC_INTERCOM_ID

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
        <Script>
          {`
          window.intercomSettings = {
          api_base: "https://api-iam.intercom.io",
          app_id: '${intercom}'
          }`}
        </Script>

        <Script>
          {`(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/${intercom}';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();`}
        </Script>
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
