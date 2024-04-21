import React, { ReactNode } from 'react'

interface LearnCategoryTextProps {
  children: ReactNode
}

const LearnCategoryText: React.FC<LearnCategoryTextProps> = ({ children }) => <p className="my-2 text-left leading-relaxed">{children}</p>

export default LearnCategoryText
