import React, { useState } from 'react'
import Navbar from './Component/Navbar'
import Login from './Component/Login'
import Alert from './Component/Alert'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Component/Home';
import SignUp from './Component/SignUp';
import Cart from './Component/Cart';
import OrderDetails from './Component/OrderDetails';
const App = () => {
  const [alert, setAlert] = useState(null)
  const showAlert = (msg, type) => {
    setAlert({
      msg: msg,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  window.globalURL = 'http://localhost:8000/api/v1'
  return (
    <div>
      <BrowserRouter>
        <Alert alert={alert} />
        <Navbar  showAlert={showAlert}/>
        <Routes>
          <Route path="/login" element={<Login showAlert={showAlert}/>} />
          <Route path="/" element={<Home showAlert={showAlert}/>} />
          <Route path="/sign-up" element={<SignUp showAlert={showAlert}/>} />
          <Route path="/cart" element={<Cart showAlert={showAlert}/>} />
          <Route path="/order-details/:id" element={<OrderDetails showAlert={showAlert}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App