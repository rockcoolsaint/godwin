import Header from 'src/components/shared/Header'

export default function LiveLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Header isDemo={false} />

      {children}
    </section>
  )
}
