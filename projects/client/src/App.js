import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom'

import './App.css'
import Login from "./components/Landing/Login";
import Home from "./components/Landing/Home";

import "./App.css"
import ResetPassword from "./components/Landing/ResetPassword";
import ProfileCashier from "./components/Landing/Cashier/ProfileCashier";
import CategoryProduct from "./components/Landing/Cashier/CategoryProduct";
import UserAuth from "./components/UserAuth";
import ProductAdmin from "./components/Landing/Admins/ProductAdmin";
import EditCashier from "./components/Landing/Admins/EditCashier";
import CashierManagement from "./components/Landing/Admins/CashierManagement";

function App() {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   (async () => {
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_API_BASE_URL}/greetings`
  //     );
  //     setMessage(data?.message || "");
  //   })();
  // }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfileCashier />} />
        <Route path="/category" element={<CategoryProduct />} />

        {/* admin */}
        <Route path="/productAdmin" element={<ProductAdmin />} />
        <Route path="/cashierAdmin" element={<CashierManagement />} />
        <Route path="/editCashier/:id" element={<EditCashier />} />

        {/* <Route path="/login" element={<Login/>}></Route> */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
