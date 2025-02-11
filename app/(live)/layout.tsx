import DemoAlert from 'src/components/demo/Alert'
import Footer from 'src/components/shared/Footer'
import Header from 'src/components/shared/Header'
import GlobalReferralBox from 'src/components/shared/GlobalReferralBox'
import FooterWrapper from 'src/components/shared/FooterWrapper'

export default function LiveLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Header isDemo={false} />
      <div className="absolute right-4 top-20 w-80 z-10 hidden md:block"> {/* Added hidden md:block */}
        <GlobalReferralBox />
      </div>
      {/* <DemoAlert msg="Product in beta please report bugs using the chatwoot below" /> */}

      {children}
      <FooterWrapper />
    </section>
  )
}