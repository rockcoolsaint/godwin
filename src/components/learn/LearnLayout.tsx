'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid'

interface LearnLayoutProps {
  children: React.ReactNode
  navTitle: string
}

const navigation = [
  { name: 'What is Rigly?', href: '/learn/rigly/what-is-rigly' },
  { name: 'Why Auctions?', href: '/learn/rigly/why-auctions' },
  { name: 'How Escrow Works', href: '/learn/rigly/how-escrow-works' },
  { name: 'Selling on Rigly', href: '/learn/rigly/selling-on-rigly' },
  { name: 'Our Story + Team', href: '/learn/rigly/our-story' },
]

export default function LearnLayout({ children, navTitle }: LearnLayoutProps) {
  const [isNavVisible, setIsNavVisible] = useState(false)
  const toggleNav = () => setIsNavVisible(!isNavVisible)

  return (
    <div className="flex flex-col md:min-h-screen md:flex-row">
      <div className="fixed left-0 top-20 z-30 h-[calc(100vh-5rem)] md:hidden" style={{ width: '4rem' }}>
        <button onClick={toggleNav} className="absolute left-0 top-1/2" style={{ transform: 'translateY(-50%)' }}>
          {isNavVisible ? <ChevronLeftIcon className="h-6 w-6" /> : <ChevronRightIcon className="h-6 w-6" />}
        </button>
      </div>

      <div className={`fixed inset-y-0 left-0 z-20 w-64 bg-white p-6 border-r transition-transform duration-300 ease-in-out ${
        isNavVisible ? 'translate-x-0' : '-translate-x-full'
      } md:relative md:translate-x-0`}>
        <h2 className="text-xl font-bold mb-4">{navTitle}</h2>
        <nav className="space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-3 py-2 rounded-md hover:bg-gray-100"
              onClick={() => setIsNavVisible(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      
      {isNavVisible && <div className="fixed inset-0 z-10 bg-black opacity-50 md:hidden" onClick={toggleNav}></div>}
      <div className="flex-1 p-8" style={{ marginLeft: '4rem' }}>
        {children}
      </div>
    </div>
  )
}