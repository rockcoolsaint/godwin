import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage"

import Announcement from "./components/Announcement";
import Header from "./components/Header";

import "./css/bootstrap.min.css";
import "./css/dataTables.bootstrap5.min.css";
import "./css/responsive.bootstrap.min.css";
import "./css/slick.css";
import "./css/style.css";
import "./css/responsive.css";

import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import Seller from "./pages/Seller";
import Individual from "./pages/Individual";
import Collections from "./pages/Collections";
import Product from "./pages/Product";
import SignUpPayment from "./pages/SignUpPayment";
import { CallbackPage } from "./pages/call-back";
import { ProfilePage } from "./pages/Profile";





function App() {
  return (
    <>
      <Announcement />
      <Header />
      <Routes>
        <Route path="/" exact element={<Homepage />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/businesses" element={<Seller />} />
        <Route path="/individuals" element={<Individual />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/payment/:id" element={<SignUpPayment />} />
        <Route path="/callback" element={<CallbackPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <ContactUs />
      <Footer />
    </>
  );
}

export default App;
