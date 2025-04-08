// src/components/shared/FooterWrapper/index.tsx
'use client'

import { useMobileScreen } from 'src/hooks/useIsMobile'
import Footer from '../Footer'

const FooterWrapper = () => {
  const isMobile = useMobileScreen()

  return (
    <div className="w-full">
      <Footer />
    </div>
  )
}

export default FooterWrapper
