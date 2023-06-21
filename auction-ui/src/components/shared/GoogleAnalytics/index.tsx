'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { analyticsEvent } from 'src/utils/analytics'
import { useEffect } from 'react'

const gaMeasurementID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export default function GoogleAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    if (!gaMeasurementID || !window?.location?.href) return

    analyticsEvent('page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: pathname,
    })
  }, [pathname])

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaMeasurementID}');
    `}
      </Script>
    </>
  )
}
