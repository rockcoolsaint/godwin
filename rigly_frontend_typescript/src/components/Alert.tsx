import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react'
import { Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface Props{
    heading: string,
    description: string,
    button: string,
    button_arg?: string
}


const AlertDismissible = ({heading, description, button, button_arg}:Props) => {
    const { loginWithRedirect  } = useAuth0();
    const [show, setShow] = useState(true);
    const navtigate = useNavigate()
    const handleLogin = async () => {
        await loginWithRedirect({
        appState: {
            returnTo: "/payment",
        },
        });
    };
    
    function handleClick(button_arg: string){
        setShow(false);
        if(button_arg === 'login'){
            handleLogin()
        }else if(button_arg === 'payment'){
            navtigate('/payment')
        }
    }
    
    
    return (
    <>
        <Alert show={show} variant="primary" className="mb-3 w-100">
        <Alert.Heading>{heading}</Alert.Heading>
        <p>
            {description}
        </p>
        <br />
        <div className="d-flex justify-content-end">
            <Button onClick={() => {handleClick(button_arg?button_arg:"")}} className="btn btn-primary mt-4 w-75 cb-bid-btn py-2">
            {button}
            </Button>
        </div>
        </Alert>

        {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
    </>
    );
}

export default AlertDismissible