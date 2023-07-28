import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./components/navbar/navbar";
import {Routes, Route} from 'react-router-dom'

import './App.css'
import Login from "./components/Landing/Login";
import Title from "./components/navbar/components/title";


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
    <Navbar/>
    <Routes>
      <Route path="/homepage" element={<Title/>}/>
      <Route path="/login" element={<Login/>}></Route>
    </Routes>
    </>
  );
}

export default App;
