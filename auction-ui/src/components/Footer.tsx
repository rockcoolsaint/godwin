import logo from '../images/logo.svg'
import Link from './shared/Link'

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div className="row">
            <div className="col-md-3 col-sm-12">
              <div className="foot-abt">
                <img src={logo} alt="" />

                <ul>
                  <li>
                    <Link to="#">Contact@mail.com</Link>
                  </li>
                  <li>
                    <Link to="#">+011123456789</Link>
                  </li>
                </ul>

                <div className="social-bx">
                  <Link to="#" target="_blank">
                    <i className="fab fa-facebook-f fa-fw"></i>
                  </Link>
                  <Link to="#" target="_blank">
                    <i className="fab fa-instagram fa-fw"></i>
                  </Link>
                  <Link to="#" target="_blank">
                    <i className="fab fa-twitter fa-fw"></i>
                  </Link>
                  <Link to="#" target="_blank">
                    <i className="fab fa-skype fa-fw"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="quicklink">
                <h4>Quick Link</h4>

                <ul>
                  <li>
                    <Link to="#">Acutions</Link>
                  </li>
                  <li>
                    <Link to="#">About us</Link>
                  </li>
                  <li>
                    <Link to="#">How it Works</Link>
                  </li>
                  <li>
                    <Link to="#">Contact us</Link>
                  </li>
                  <li>
                    <Link to="#">Learn</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="quicklink">
                <h4>Support</h4>

                <ul>
                  <li>
                    <Link to="#">Help Center</Link>
                  </li>
                  <li>
                    <Link to="#">Create Account</Link>
                  </li>
                  <li>
                    <Link to="#">Privacy policy</Link>
                  </li>
                  <li>
                    <Link to="#">Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link to="#">FAQ</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3 col-sm-12">
              <div className="subscribe-bx">
                <h4>Subscribe Newsletter</h4>
                <p>Signup for our Newletter to get the latest news in your inbox</p>
                <form>
                  <div className="form-group">
                    <input type="text" name="" placeholder="Email Address" className="form-control" />
                  </div>
                  <button type="submit">Subscribe</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>@2022 Copyright All Right Reserved by Rigly</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
