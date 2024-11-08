import React, { ReactNode } from 'react'

interface LearnCategoryTextProps {
  children: ReactNode
  center?: boolean
}

const LearnCategoryText: React.FC<LearnCategoryTextProps> = ({ children, center = false }) => (
  <p className={`my-2 text-2xl text-left leading-relaxed ${center ? 'text-center' : ''}`}>{children}</p>
)

export default LearnCategoryText
