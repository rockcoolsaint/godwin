import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import "./css/dataTables.bootstrap5.min.css";
import "./css/responsive.bootstrap.min.css";
import "./css/slick.css";
import "./css/style.css";
import "./css/responsive.css";

import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import { Route, Routes, useLocation } from "react-router-dom";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import Collections from "./pages/Collections";
import Seller from "./pages/Seller";
import Individual from "./pages/Individual";
import Product from "./pages/Product";
import { CallbackPage } from "./pages/call-back";
import { ProfilePage } from "./pages/Profile";
import SignUpPayment from "./pages/SignUpPayment";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";

import { useLayoutEffect } from "react";
import WinnerPayment from "./pages/WinnerPayment";
import NotFound from "./pages/NotFound";

interface childrenProps {
  children: JSX.Element;
}
const Wrapper = ({ children }: childrenProps) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  window.fetchUrl = process.env.REACT_APP_HTTPS_PROXY;
  console.log(process.env.REACT_APP_HTTPS_PROXY);
  return children;
};

const App: React.FC = () => {
  return (
    <Wrapper>
      <>
        <Header />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/individuals" element={<Individual />} />
          <Route path="/businesses" element={<Seller />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/payment" element={<SignUpPayment />} />
          <Route path="/winner-payment/:id" element={<WinnerPayment />} />
          <Route path="/callback" element={<CallbackPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <ContactUs />
        <Footer />
      </>
    </Wrapper>
  );
};

export default App;
