import React from 'react'

import logo from '../images/logo.svg'

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
                                <li><a href="#">Contact@mail.com</a></li>
                                <li><a href="#">+011123456789</a></li>
                            </ul>

                            <div className="social-bx">
                                <a href="#" target="_blank"><i className="fab fa-facebook-f fa-fw"></i></a>
                                <a href="#" target="_blank"><i className="fab fa-instagram fa-fw"></i></a>
                                <a href="#" target="_blank"><i className="fab fa-twitter fa-fw"></i></a>
                                <a href="#" target="_blank"><i className="fab fa-skype fa-fw"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <div className="quicklink">
                            <h4>Quick Link</h4>

                            <ul>
                                <li><a href="#">Acutions</a></li>
                                <li><a href="#">About us</a></li>
                                <li><a href="#">How it Works</a></li>
                                <li><a href="#">Contact us</a></li>
                                <li><a href="#">Learn</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <div className="quicklink">
                            <h4>Support</h4>

                            <ul>
                                <li><a href="#">Help Center</a></li>
                                <li><a href="#">Create Account</a></li>
                                <li><a href="#">Privacy policy</a></li>
                                <li><a href="#">Terms & Conditions</a></li>
                                <li><a href="#">FAQ</a></li>
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