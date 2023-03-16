import 'src/styles/globals.css'
import 'react-medium-image-zoom/dist/styles.css'

import { PropsWithChildren } from 'react'
import Footer from 'src/components/shared/Footer'
import Header from 'src/components/shared/Header'

export default async function RootLayout(props: PropsWithChildren<unknown>) {
  return (
    <html lang="en" className="bg-page-background">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <section className="flex h-screen w-screen flex-col justify-between">
          <Header />
          <div className="bg-white px-6 md:px-40">{props.children}</div>
          <Footer />
        </section>
      </body>
    </html>
  )
}
