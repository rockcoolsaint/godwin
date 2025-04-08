import DemoAlert from 'src/components/demo/Alert'
import Footer from 'src/components/shared/Footer'
import Header from 'src/components/shared/Header'
import FooterWrapper from 'src/components/shared/FooterWrapper'

export default function LiveLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Header isDemo={false} />

      {children}
      <FooterWrapper />
    </section>
  )
}