import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { userHistory, userProps } from './interfaces'
import UserProfileHistory from './UserProfileHistory'

interface Props{
    data: userProps | null
    userhistory: userHistory[] | null,
    setData: React.Dispatch<React.SetStateAction<null>>
}

const UserProfileContent = ({data, userhistory, setData}: Props) => {
    const { getIdTokenClaims } = useAuth0();
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
                                <li><label htmlFor="profile_pic" className="profileimg"><img src={data?.uploaded_profile?data?.uploaded_profile:data?.profile_pik} alt="" /></label></li>
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
                                <h6>{data?.bidding_name}</h6>
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
            </div>

            <UserProfileHistory userhistory={userhistory} />
        </div>
    </div>
  )
}

export default UserProfileContent