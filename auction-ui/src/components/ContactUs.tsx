import Link from './shared/Link'

const ContactUs = () => {
  return (
    <div className="container">
      <div className="any-que-wrp">
        <h2>Have Any Questions?</h2>
        <p>Check around. Getting up and running as a miner in this market takes months. </p>

        <div className="btn-group">
          <Link href="#" className="btn-main">
            Email Us
          </Link>
          <h5>
            Need any help? <Link href="#">Contact us</Link>
          </h5>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
