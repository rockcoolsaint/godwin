import DemoAlert from 'src/components/demo/Alert'

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="pt-8">
      <DemoAlert />

      {children}
    </section>
  )
}
