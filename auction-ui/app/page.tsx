import { getAuctionOfTheDay } from 'src/api/auction/getAuctionOfTheDay'
import { getFeaturedAuctions } from 'src/api/auction/getFeaturedAuctions'
import Home from 'src/components/pages/home'
import { Metadata } from 'next'
import Header from 'src/components/shared/Header'
import DemoAlert from 'src/components/demo/Alert'
import Footer from 'src/components/shared/Footer'

export default async function HomePage() {
  const [auctions, auctionOfTheDay] = await Promise.all([getFeaturedAuctions(), getAuctionOfTheDay({ isDemo: false })])

  return (
    <>
      <Header />
      <DemoAlert msg={<div>Product in beta, please report bugs using the intercom below</div>} />
      <Home auctions={auctions} auctionOfTheDay={auctionOfTheDay} />
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
    keywords: ['bitcoin', 'mining', 'hashrate', 'bitcoin mining', 'rigly'],
    openGraph: {
      images: [{ url: 'https://cdn.shopify.com/s/files/1/0603/6648/7720/files/Rigly_1.png?v=1654535433', width: 800, height: 600 }],
      title: 'Rigly - Your Bitcoin Mining Marketplace',
      description:
        "Rigly is your marketplace for bitcoin mining. Buy hashrate from miners around the world. All plans include Trustless Mining escrow to ensure hashrate delivery. Don't get rugged, get Rigly.",
      url: 'https://rigly.io',
      siteName: 'Rigly',
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
