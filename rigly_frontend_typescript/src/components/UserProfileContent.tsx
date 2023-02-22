import { useAuth0 } from '@auth0/auth0-react'
import React, { useRef } from 'react'
import { userHistory, userProps } from './interfaces'
import UserProfileHistory from './UserProfileHistory'
import PaymentIcon2 from '../images/payment-2.svg'

interface Props{
    data: userProps | null
    userhistory: userHistory[] | null,
    setData: React.Dispatch<React.SetStateAction<null>>
}

const UserProfileContent = ({data, userhistory, setData}: Props) => {
    const { getIdTokenClaims } = useAuth0();
    const invoice = useRef<HTMLDivElement>(null);
    const invoice_copy = useRef<HTMLSpanElement>(null);
    const dateFormat = (date: Date) =>{
        return new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(date)
    }

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        // setMaxValue(e.target.value);
        if(e.target.files){
            const file = e.target.files[0];
            let formData = new FormData();
            formData.append('username', data?.username?data?.username:"")
            formData.append('uploaded_profile', file);
            getIdTokenClaims().then(async(data1: any) => {
                console.log(data1)
                if(data1.__raw){
                try {
                    fetch('/api/profile/', {
                        method: "PUT",
                        headers: {
                            Authorization: 'Bearer ' + data1.__raw
                    },
                    body: formData
                    })
                    .then((response) => response.json())
                    .then((result) => {
                       console.log(result)
                       setData(result)
                    })
        
                  } catch(error) {
                    console.log(error)
                  } 
                }
              })
        }
        console.log("File Added")
    };

    function copyInvoice() {
        const copyText = invoice.current;
        if(copyText){
          navigator.clipboard.writeText(copyText.innerText);
        }
    } 

  return (
    <div className="user-profiletab-contents">
        <div className="user-profile-content">
            <div className="profile-head-row">
                <div className="row">
                    <div className="col-md-5 col-sm-5">
                        <div className="profile-name">
                            <h4>{data?.date_joined?dateFormat(new Date(data?.date_joined)):dateFormat(new Date())}</h4>
                            <h3>User Account</h3>
                        </div>
                    </div>
                    <div className="col-md-7 col-sm-7">
                        <div className="profile-actbar">
                            <ul>
                                {/* <li><Link to="#"><img src="images/proic1.svg" alt="" /></Link></li>
                                <li><Link to="#"><img src="images/proic2.svg" alt="" /></Link></li>
                                <li><Link to="#"><img src="images/proic3.svg" alt="" /></Link></li> */}
                                <input type="file" className='d-none' id="profile_pic" onChange={e => handleChangeFile(e)} accept="image/png, image/gif, image/jpeg" />
                                <li><label htmlFor="profile_pic" className="profileimg"><i className="fa fa-pencil"></i><img src={data?.uploaded_profile?data?.uploaded_profile:data?.profile_pik} alt="" /></label></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-contact">
                <div className="row">
                    <div className="col-md-6 col-sm-6">
                        <div className="contact-probx">
                            <h4>Contact Info</h4>
                            <div className="pro-cnt">
                                <h5>Name</h5>
                                <h6>{data?.first_name +" "+data?.last_name}</h6>
                            </div>
                            

                            <div className="pro-cnt">
                                <h5>Email Address</h5>
                                <h6>{data?.email}</h6>
                            </div>

                            <div className="pro-cnt">
                                <h5>Mobile</h5>
                                <h6>{data?.phone_number? data.phone_number : "Not found"}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="contact-probx">
                            <h4>Address</h4>

                            <div className="pro-cnt">
                                <h5>Address</h5>
                                <h6>{data?.address? data.address : "Not found"}</h6>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    <hr />
                    <div className="col-md-6 col-sm-6">
                        <div className="contact-probx">
                            <div className="pro-cnt">
                                <h5>Bidding Name</h5>
                                <h6>{data?.bidding_name}</h6>
                            </div>

                            <div className="pro-cnt">
                                <h5>Telegram</h5>
                                <h6>{data?.telegram_username?data?.telegram_username:"Not found"}</h6>
                            </div>

                            <div className="pro-cnt">
                                <h5>Mining Pool Username</h5>
                                <h6>{data?.mining_pool_username? data.mining_pool_username : "Not found"}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="contact-probx">

                            <div className="pro-cnt">
                                <h5>Mining Pool Stratum Address</h5>
                                <h6>{data?.mining_pool_stratum_address? data.mining_pool_stratum_address : "Not found"}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <UserProfileHistory userhistory={userhistory} />
        </div>

        <div className="mt-3 text-center">
        <div className="any-que-wrp">
            <h2>Refer and earn</h2>
            <p>Both referral and referee with get 10% discount on fee charged. </p>

            <div className="invoice-wrap justify-content-center">
            <div className="box invoice" ref={invoice} id="invoice">{data?.refer_code}</div>
            <span id="invoice-copy" ref={invoice_copy} onClick={() => copyInvoice()}>
           <img src={PaymentIcon2} alt='icon' />
            &nbsp;Copy</span>
        </div>
        </div>
    </div>

        
    </div>
  )
}

export default UserProfileContent