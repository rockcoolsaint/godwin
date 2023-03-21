import 'src/styles/globals.css'
import 'react-medium-image-zoom/dist/styles.css'

import { PropsWithChildren } from 'react'
import Header from 'src/components/shared/Header'
import Footer from 'src/components/shared/Footer'
import AuthProvider from 'src/providers/AuthProvider'

export default function RootLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <html lang="en" className="bg-page-background">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Rigly</title>
      </head>
      <body>
        <AuthProvider>
          <section className="flex h-screen w-screen flex-col justify-between">
            <Header />
            <div className="bg-white">{children}</div>
            <Footer />
          </section>
        </AuthProvider>
      </body>
    </html>
  )
}
