import React, { useState } from 'react'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid'

interface Category {
  title: string
  Component: React.FC
}

interface LearnPageProps {
  categories: Category[]
  navTitle: string
}

const LearnPage: React.FC<LearnPageProps> = ({ navTitle, categories }) => {
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const [isNavVisible, setIsNavVisible] = useState(false)

  const toggleNav = () => setIsNavVisible(!isNavVisible)

  return (
    <div className="flex flex-col md:min-h-screen md:flex-row">
      <div className="fixed left-0 top-20 z-30 h-[calc(100vh-5rem)] md:hidden" style={{ width: '4rem' }}>
        <button onClick={toggleNav} className="absolute left-0 top-1/2" style={{ transform: 'translateY(-50%)' }}>
          {isNavVisible ? <ChevronLeftIcon className="h-6 w-6" /> : <ChevronRightIcon className="h-6 w-6" />}
        </button>
      </div>

      <aside
        className={`fixed inset-y-0 left-0 z-20 bg-white p-4 transition-transform duration-300 ease-in-out ${
          isNavVisible ? 'translate-x-0' : '-translate-x-full'
        } w-72 md:relative md:block md:w-1/4 md:translate-x-0`}
      >
        <h2 className="text-xl font-bold">{navTitle}</h2>
        <ul>
          {categories.map(category => (
            <li key={category.title} className="mt-2">
              <button
                className={`block w-full rounded-md px-4 py-2 text-left focus:outline-none ${
                  activeCategory.title === category.title ? 'bg-blue-500 text-white' : 'text-gray-700'
                }`}
                onClick={() => {
                  setActiveCategory(category)
                  setIsNavVisible(false)
                }}
              >
                {category.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      {isNavVisible && <div className="fixed inset-0 z-10 bg-black opacity-50" onClick={toggleNav}></div>}
      <main className="flex-1 p-4 md:p-8" style={{ marginLeft: '4rem' }}>
        {' '}
        <activeCategory.Component />
      </main>
    </div>
  )
}

export default LearnPage
