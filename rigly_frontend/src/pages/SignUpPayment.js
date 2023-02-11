import React from 'react'
import { Link } from 'react-router-dom'
import PaymentIcon from '../images/payment-1.svg'
import PaymentIcon2 from '../images/payment-2.svg'
import '../css/payment.css'
import '../ext.js'
const SignUpPayment = () => {

    function copyInvoice() {
        var copyText = document.getElementById("invoice");
        navigator.clipboard.writeText(copyText.innerText);
    }


  return (
    <div className='container customer register'>
        <div id="content" className="content">
        <h1>This way to sign up to Rigly!</h1>

        <div className="content-banner">
        <p>Please scan QR code to pay <b>20 sats</b> to create your account</p>
        <i>This paywall helps us make sure your bids are real. You will create your account after payment.</i>
        </div>

        <section className="paywall-content">
        <div className="box" id="qrcode"></div>
        <div className="invoice-wrap">
            <div className="box invoice" id="invoice"></div>
            <span id="invoice-copy" onClick={() => copyInvoice()} style={{display: "none"}}>
           <img src={PaymentIcon2} alt='icon' />
            &nbsp;Copy</span
            >
        </div>
        <div className="paywall-note">
            <div className="paywall-note-icon">
            <img src={PaymentIcon} alt='icon' />
            </div>
            <div className="paywall-note-text">
            This paywall requires Lightning. If you need a Lightning wallet, check out
            <Link to="https://www.walletofsatoshi.com/" target="_blank" rel="noopener noreferrer" >Wallet of Satoshi</Link> or
            <Link to="https://bluewallet.io/" target="_blank"  rel="noopener noreferrer" >Blue wallet</Link>. Feel free to hit the Chat button if you need
            help!
            </div>
        </div>
        </section>
    </div>
  </div>
  )
}

export default SignUpPayment