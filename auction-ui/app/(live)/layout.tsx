import DemoAlert from 'src/components/demo/Alert'
import Footer from 'src/components/shared/Footer'
import Header from 'src/components/shared/Header'
import Link from 'src/components/shared/Link'

export default function LiveLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Header isDemo={false} />
      {/* <DemoAlert msg="Product in beta please report bugs using the intercom below" /> */}
      <DemoAlert
        msg={
          <div>
            Tabconf attendees: <Link href="https://rigly.io/tabconf">sign up here</Link> for your hashrate
          </div>
        }
      />

      {children}
      <Footer />
    </section>
  )
}
