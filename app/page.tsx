import Home from 'src/components/pages/home'
import { Metadata } from 'next'
import Header from 'src/components/shared/Header'
import Footer from 'src/components/shared/Footer'

export default async function HomePage() {
  return (
    <>
      <Header />
      <Home />
      <Footer />
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    category: 'technology',
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
    },
    title: 'Rigly - Upendo',
    keywords: ['bitcoin', 'mining', 'hashrate', 'bitcoin mining', 'rigly', 'upendo'],
    openGraph: {
      images: [{ url: 'https://i.postimg.cc/9XSpV5Hy/up2.png', width: 300, height:110 }],
      title: 'Upendo - Bitcoin Mining Block Party',
      description:
       "Solo mine with bitcoiners. We mine until we find a block.",
      url: 'https://upendo.rigly.io',
      siteName: 'upendo.rigly.io',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Upendo - Bitcoin Mining Block Party',
      description:
        "Solo mine with bitcoiners. We mine until we find a block and split 3.125 btc.",
      creator: '@trustlessmining',
    },
  }
}
