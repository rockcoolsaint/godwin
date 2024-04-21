import React, { ReactNode } from 'react'

interface LearnCategorySubTitleProps {
  children: ReactNode
}

const LearnCategorySubTitle: React.FC<LearnCategorySubTitleProps> = ({ children }) => (
  <h2 className="my-4 text-3xl font-bold">{children}</h2>
)

export default LearnCategorySubTitle
