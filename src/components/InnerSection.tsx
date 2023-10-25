/* eslint-disable react/destructuring-assignment */
import Link from './shared/Link'

interface Props {
  title: string
  breadcrumb: string
}

const InnerSection = (props: Props) => {
  return (
    <section className="inner-banner">
      <div className="container">
        <h1>{props.title}</h1>
        <div className="breadcrumb-bx">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>{props.breadcrumb}</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default InnerSection
