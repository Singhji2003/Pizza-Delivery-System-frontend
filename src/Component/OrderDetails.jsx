import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

const OrderDetails = (props) => {
  const navigate = useNavigate();
  const URL = window.globalURL
  const location = useLocation()
  const [update, setUpdate] = useState(false)
  const id = location.pathname.split('/').pop();
  const [spinner, setSpinner] = useState(false)
  const [orderDetails, setOrdersDetails] = useState({})
  const [quantity, setQuantity] = useState(1)
  const callOrderDetails = async () => {
    try{
    const response = await fetch(`${URL}/orders/${id}`, {
      method: "GET",
      headers: {
        'AccessToken': localStorage.getItem('accessToken')
      }

    });
    const res = await response.json();
    setOrdersDetails(res.data)
  }
  catch (error) {
    console.error('An error occurred:', error);
    props.showAlert('Some Error Occured', 'error')
  }
  }

  useEffect(() => {
    callOrderDetails();
  }, [])


  const updateOrder = async () => {
    try {
      const response = await fetch(`${URL}/orders/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'AccessToken': localStorage.getItem('accessToken')
        },
        body: JSON.stringify({ pizzaId: orderDetails._id, quantity }),
      });

      const json = await response.json();
      if (json.success) {
        props.showAlert(json.message, 'success')
        navigate('/cart')
      }
      else {
        props.showAlert(json.message, 'error')
      }
      setSpinner(false)
    }
    catch (error) {
      console.error('An error occurred:', error);
      props.showAlert('Some Error Occured', 'error')
    }
  }
  return (
    <div><div className="heading-cart">
      {spinner && <Spinner />}
      <h1>Order Details</h1>
    </div>
      <div className="each-product" style={{ margin: 'auto', marginTop: '3rem' }}>
        <img src={orderDetails.image} alt="" />
        <h2>{orderDetails.type}</h2>
        <p>{orderDetails.description} </p>
        <h4>Rs. {orderDetails.price}</h4>
        {update && <div className="quantity">
          <i className="fa-solid fa-minus" onClick={() => quantity > 1 ? setQuantity(quantity - 1) : ''}></i>
          {quantity}
          <i className="fa-solid fa-plus" onClick={() => setQuantity(quantity + 1)}></i>
        </div>}
        <button onClick={() => {
          update ? updateOrder() : setUpdate(true)
        }} > {update ? "Save Order" : "Update Order"}</button>
      </div>
    </div>
  )
}

export default OrderDetails