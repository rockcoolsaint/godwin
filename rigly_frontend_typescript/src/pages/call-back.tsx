import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";

export const CallbackPage = () => {
  const { error, loginWithRedirect } = useAuth0();

  useEffect(()=>{
    const handleLogin = async () => {
      await loginWithRedirect({
      appState: {
          returnTo: "/",
      },
      });
  };

  if (error?.message) {
    handleLogin()
  }
  },[loginWithRedirect, error])

  if (error) {
    console.log(error)
    return (
      <div className="container text-center h-25 p-3">
        <div className="content-layout">
          <h1 id="page-title" className="content__title">
            Error
          </h1>
          <div className="content__body">
            <p id="page-description">
              <span>Login unsuccessful, please try again.</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container text-center p-4 h-25">
    <div className="page-layout">
      Logged In Successfully.
      <div className="page-layout__content" />
    </div>
    </div>
  );
};