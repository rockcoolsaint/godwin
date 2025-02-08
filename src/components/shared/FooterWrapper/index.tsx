// src/components/shared/FooterWrapper/index.tsx
'use client'

import { useMobileScreen } from 'src/hooks/useIsMobile'
import Footer from '../Footer'
import GlobalReferralBox from '../GlobalReferralBox'

const FooterWrapper = () => {
  const isMobile = useMobileScreen()

  return (
    <div className="w-full">
      {isMobile && (
        <div className="mb-4">
          <GlobalReferralBox />
        </div>
      )}
      <Footer />
    </div>
  )
}

export default FooterWrapper
