import DemoAlert from 'src/components/demo/Alert'
import Footer from 'src/components/shared/Footer'
import Header from 'src/components/shared/Header'

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Header isDemo={true} />
      <div className="mt-8" />
      <DemoAlert msg="You are currently on a demo version of Rigly" />

      {children}
      <Footer />
    </section>
  )
}
