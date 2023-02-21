import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import PaymentIcon from '../images/payment-1.svg'
import PaymentIcon2 from '../images/payment-2.svg'
import '../css/payment.css'
import { useAuth0 } from "@auth0/auth0-react";
import QRCode from 'react-qr-code';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Loader from "../components/Loader";


function AlertDismissible() {
  const [show, setShow] = useState(true);
  const navigate = useNavigate()
  return (
    <>
      <Alert show={show} variant="success" className="mb-3">
        <Alert.Heading>Payment Successfull</Alert.Heading>
        <p>
          Thanks, your account is now activated to place bids.
        </p>
        <br />
        <div className="d-flex justify-content-end">
          <Button onClick={() => {setShow(false); navigate('/collections')}} variant="outline-success">
            Go to Auctions
          </Button>
        </div>
      </Alert>

      {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
    </>
  );
}

// import '../ext.js'
const SignUpPayment = () => {
    const navigate = useNavigate()
    const invoice = useRef<HTMLDivElement>(null);
    const invoice_copy = useRef<HTMLSpanElement>(null);
    const [paymentStatus, setPaymentStatus] = useState(false)
    const [showContent, setshowContent] = useState(false)
    const qr_code = useRef<HTMLDivElement>(null);
    const { user, isLoading, isAuthenticated, getIdTokenClaims } = useAuth0();
    const [qrValue, setQrValue] = useState<string>();

    const back: string = '#FFFFFF';
    const fore: string = '#333333';
    const size: number = 256;

    useEffect(() => {
      if(isLoading || !isAuthenticated){
        return;
      }
      getIdTokenClaims().then(async(data1: any) => {
        if(data1.__raw){
        try {
          const response = await fetch('/api/create-user/', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json'
             },
             body: JSON.stringify(data1)
           });
           const data = await response.json();
           console.log(data);
           setTimeout(()=>{
            setshowContent(true)
           },1000)
           if(data.is_paid || data.is_coupon_used){
            navigate('/collections')
           }
         } catch(error) {
    
            console.log(error)
           } 
          }
      }
    
      )




    var payment_received: boolean = false;
    var charge_id = ''
    const api_key = 'a8445019-8bf7-4d03-ab50-ed4ff8957ae4'; // Replace with your actual API key

    function showSuccessMessage() {
      // const myTimeout = setTimeout(showRegisterForm, 3000);
      console.log("Success Message")
      setPaymentStatus(true)
    }


    // function hidePaywallContent() {
    //   document.getElementById('content').style.display = 'none';
    // }

    // function showRegisterForm() {
    //   hideSuccessMessage();
    //   hidePaywallContent();
    //   document.getElementById('register').style.display = 'block';
    // }
    
    // function hideRegisterForm() {
    //   document.getElementById('register').style.display = 'none';
    // }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + api_key,
      },
      body: JSON.stringify({
        amount: 20,
      }),
    };

    if (localStorage.getItem('depositPaid') === 'true') {
      // hidePaywallContent();
      // showRegisterForm();
      // hideSuccessMessage()
    } else {
      fetch('https://api.opennode.com/v1/charges', options)
        .then((response) => response.json())
        .then((data) => {
          if (data.data) {
            charge_id = data.data.id;
            // Display the lightning invoice
            if(invoice.current && invoice_copy.current){
                invoice_copy.current.style.display = 'flex';
                invoice.current.innerHTML = data.data.lightning_invoice.payreq;
            }
            //display the qr code
            setQrValue(data.data.lightning_invoice.payreq)
            // Check if the payment was received
            setTimeout(function checkPayment() {
              const checkOptions = {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + api_key,
                },
              };
              fetch(`https://api.opennode.com/v2/charge/${charge_id}`, checkOptions)
                .then((response) => response.json())
                .then((data) => {
                  console.log(data.data)
                  getIdTokenClaims().then(async(data1) => {
                  fetch('/api/update-payment-status/', {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json',
                                'Authorization': 'Bearer '+data1?.__raw, 
                    },
                    body: JSON.stringify(data.data),
                  })
                  .then((response) => response.json())
                  .then((responseJson) => {
                      console.log(responseJson)
                      return responseJson;
                  })
                  .catch((error) => {
                      console.error(error);
                  });
                })

                  if (data.data.status === 'paid') {
                    payment_received = true;
                    showSuccessMessage();
                    console.log(payment_received)
                    // hidePaywallContent();
                    localStorage.setItem('depositPaid', "true");
                  } else {
                    setTimeout(checkPayment, 5000);
                  }
                })
                .catch((error) => console.log(error));
            }, 5000);
          } else {
            console.log('there was an error');
          }
        });
    }
    

    },[user, isLoading, isAuthenticated, getIdTokenClaims, navigate])
    

    function copyInvoice() {
        const copyText = invoice.current;
        if(copyText){
          navigator.clipboard.writeText(copyText.innerText);
        }
    } 


  return (
    <div className={showContent?"container customer register":"d-none"}>
        {showContent?"": <Loader />}
        <div id="content" className="content">
        <h1>This way to sign up to Rigly!</h1>

        <div className="content-banner">
        <p>Please scan QR code to pay <b>20 sats</b> to create your account</p>
        <i>This paywall helps us make sure your bids are real. You will create your account after payment.</i>
        </div>

        <section className="paywall-content">
        {paymentStatus? <AlertDismissible />: <></>}
        <div className="box" id="qrcode" ref={qr_code}>
        {qrValue && (
          <QRCode
            value={qrValue}
            bgColor={back}
            fgColor={fore}
            size={size ? size : 0}
          />
        )}
        </div>
        <div className="invoice-wrap">
            <div className="box invoice" ref={invoice} id="invoice"></div>
            <span id="invoice-copy" ref={invoice_copy} onClick={() => copyInvoice()} style={{display: "none"}}>
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