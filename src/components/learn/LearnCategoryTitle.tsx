import React, { ReactNode } from 'react'

interface LearnCategoryTitleProps {
  children: ReactNode
}

const LearnCategoryTitle: React.FC<LearnCategoryTitleProps> = ({ children }) => (
  <h1 className="my-6 bg-gradient-to-r from-[#5C3FAF] to-[#316AEF] bg-clip-text text-center text-4xl font-bold text-transparent">
    {children}
  </h1>
)

export default LearnCategoryTitle
