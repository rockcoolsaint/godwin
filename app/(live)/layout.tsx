import DemoAlert from 'src/components/demo/Alert'
import Footer from 'src/components/shared/Footer'
import Header from 'src/components/shared/Header'

export default function LiveLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Header isDemo={false} />
      {/* <DemoAlert msg="Product in beta please report bugs using the chatwoot below" /> */}

      {children}
      <Footer />
    </section>
  )
}
