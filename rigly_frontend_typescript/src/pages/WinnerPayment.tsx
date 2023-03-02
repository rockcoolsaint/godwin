import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from 'react-router-dom'
import PaymentIcon from '../images/payment-1.svg'
import PaymentIcon2 from '../images/payment-2.svg'
import '../css/payment.css'
import { useAuth0 } from "@auth0/auth0-react";
import QRCode from 'react-qr-code';
import Loader from "../components/Loader";

const WinnerPayment = () => {
    const routeParams = useParams();
    const invoice = useRef<HTMLDivElement>(null);
    const [winnerUser, setWinnerUser] = useState(false)
    const invoice_copy = useRef<HTMLSpanElement>(null);
    const [showContent, setshowContent] = useState(false)
    const qr_code = useRef<HTMLDivElement>(null);
    const { user, isLoading, isAuthenticated, getIdTokenClaims, loginWithRedirect } = useAuth0();
    const [qrValue, setQrValue] = useState<string>();
    const [auctionType, setAuctionType] = useState<number>(100);
    const [currentBid, setCurrentBid] = useState<number>(0);
    const back: string = '#FFFFFF';
    const fore: string = '#333333';
    const size: number = 256;

    useEffect(() => {

      const handleLogin = async () => {
        await loginWithRedirect({
        appState: {
            returnTo: window.location.pathname,
        },
        });
    };
      
      if(!isLoading && !isAuthenticated){
        handleLogin()
      }

      getIdTokenClaims().then(async(data1: any) => {
        if(data1.__raw){
            try {
            const fetchData = async () => {
                const id_pro = routeParams.id
                const response = await fetch(window.fetchUrl+"/api/auctions/"+id_pro+"/complete_auction_detail/")
                const returnData = await response.json()
                console.log(returnData)
                if(returnData.Product.payment_address){
                    setAuctionType(returnData.Product.auction_type.percentage)
                    setCurrentBid(returnData.Product.current_bid)
                    setQrValue(returnData.Product.payment_address)
                }
                setshowContent(true)
                if(user && returnData.winner){
                    if(user?.email === returnData.winner?.user?.email){
                        setWinnerUser(true)
                    }
                }
            }
            
        
            fetchData();
            } catch(error) {
                console.log(error)
            } 
        }
      }
    
      )
    

    },[user, isLoading, isAuthenticated, getIdTokenClaims, routeParams.id, loginWithRedirect])
    

    function copyInvoice() {
        const copyText = invoice.current;
        if(copyText){
          navigator.clipboard.writeText(copyText.innerText);
        }
    } 


  return (
    <div className={showContent?"container customer register":"d-none"}>
        {winnerUser?<>
        {showContent?"": <Loader />}
        <div id="content" className="content">
        <h1>You won, checkout here</h1>

        <div className="content-banner">
        <p>Please scan QR code to pay <b>{((currentBid/100)*auctionType).toFixed(2)}</b> sats</p>
        </div>

        <section className="paywall-content">
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
            <div className="box invoice" ref={invoice} id="invoice">{qrValue}</div>
            <span id="invoice-copy" ref={invoice_copy} onClick={() => copyInvoice()}>
           <img src={PaymentIcon2} alt='icon' />
            &nbsp;Copy</span
            >
        </div>
        <div className="similer-data">
          <Link className="m-2 btn-main" target="_blank" to={"https://mempool.space/address/"+qrValue}><span>Verify your payment</span></Link>
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

</>:<p>You can't access this page</p>}
  </div>
  )
}

export default WinnerPayment