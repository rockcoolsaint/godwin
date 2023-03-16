import 'src/styles/globals.css'
import 'react-medium-image-zoom/dist/styles.css'

import { PropsWithChildren } from 'react'
import Footer from 'src/components/shared/Footer'
import Header from 'src/components/shared/Header'
import Link from 'src/components/shared/Link'

export default async function RootLayout(props: PropsWithChildren<unknown>) {
  return (
    <html lang="en" className="bg-page-background">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <Link href="/test">test</Link>
        <section className="flex h-screen w-screen flex-col justify-between">
          <Header />
          <div className="bg-white">{props.children}</div>
          <Footer />
        </section>
      </body>
    </html>
  )
}
