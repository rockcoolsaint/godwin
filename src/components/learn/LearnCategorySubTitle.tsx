import React, { ReactNode } from 'react'

interface LearnCategorySubTitleProps {
  children: ReactNode
  center?: boolean
}

const LearnCategorySubTitle: React.FC<LearnCategorySubTitleProps> = ({ children, center = false }) => (
  <h2 className={`my-4 text-3xl font-bold ${center ? 'text-center' : ''}`}>{children}</h2>
)

export default LearnCategorySubTitle
