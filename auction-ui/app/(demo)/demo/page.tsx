import { getAuctionOfTheDay } from 'src/api/auction/getAuctionOfTheDay'
import { getFeaturedAuctions } from 'src/api/auction/getFeaturedAuctions'
import Home from 'src/components/pages/home'
import { Metadata } from 'next'
import DemoModal from 'src/components/demo/Modal'

export default async function HomePage({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const [auctions, auctionOfTheDay] = await Promise.all([getFeaturedAuctions(), getAuctionOfTheDay()])

  const { code } = searchParams

  return (
    <>
      <DemoModal />
      <Home auctions={auctions} auctionOfTheDay={auctionOfTheDay} isDemo={true} code={code} />
      <div className="mb-24" />
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
