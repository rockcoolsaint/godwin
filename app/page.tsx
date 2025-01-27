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
    title: 'Rigly',
    keywords: ['bitcoin', 'mining', 'hashrate', 'bitcoin mining', 'rigly', 'upendo'],
    openGraph: {
      images: [{ url: 'https://i.postimg.cc/59HBs7Qy/upendo-logo-orange.png', width: 400, height:150 }],
      title: 'Upendo - Bitcoin Mining Block Party',
      description:
       "Solo mine with bitcoiners. We mine until we find a block and split 3.125 btc.",
      url: 'https://upendo.rigly.io',
      siteName: 'upendo.rigly.io',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Rigly - Your Bitcoin Mining Marketplace',
      description:
        "Rigly is your marketplace for bitcoin mining. Buy hashrate from miners around the world. All plans include Trustless Mining escrow to ensure hashrate delivery. Don't get rugged, get Rigly.",
      creator: '@trustlessmining',
      images: [{ url: 'https://cdn.shopify.com/s/files/1/0603/6648/7720/files/Rigly_1.png?v=1654535433', width: 800, height: 600 }],
    },
  }
}
