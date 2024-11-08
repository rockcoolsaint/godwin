'use client'
import Link from 'next/link'

interface LearnLayoutProps {
  children: React.ReactNode
  navTitle: string
}

const navigation = [
  { name: 'Our Story', href: '/learn/rigly/our-story' },
  { name: 'What is Rigly?', href: '/learn/rigly/what-is-rigly' },
  { name: 'How Escrow Works', href: '/learn/rigly/how-escrow-works' },
  { name: 'Why Auctions?', href: '/learn/rigly/why-auctions' },
  { name: 'Selling on Rigly', href: '/learn/rigly/selling-on-rigly' }
]

export default function LearnLayout({ children, navTitle }: LearnLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-white p-6 border-r">
        <h2 className="text-xl font-bold mb-4">{navTitle}</h2>
        <nav className="space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-3 py-2 rounded-md hover:bg-gray-100"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  )
}