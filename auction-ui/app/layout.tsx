import 'src/styles/globals.css'
import 'react-medium-image-zoom/dist/styles.css'

import { PropsWithChildren } from 'react'

export default async function RootLayout(props: PropsWithChildren<unknown>) {
  return (
    <html lang="en" className="bg-page-background">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div className="bg-page-background">{props.children}</div>
      </body>
    </html>
  )
}
