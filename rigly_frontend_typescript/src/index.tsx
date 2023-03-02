import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Auth0ProviderWithNavigate } from './auth0-provider-with-navigate';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

declare global {
  interface Window {
    fetchUrl:any;
  }
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
     <Auth0ProviderWithNavigate>
        <App />
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>
);
