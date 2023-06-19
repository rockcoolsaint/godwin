import DemoAlert from 'src/components/demo/Alert'
import Header from 'src/components/shared/Header'

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Header isDemo={true} />
      <div className="mt-8" />
      <DemoAlert />

      {children}
    </section>
  )
}
