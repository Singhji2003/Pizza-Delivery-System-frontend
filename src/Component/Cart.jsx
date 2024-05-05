import React, { useEffect, useState } from 'react'
import '../CSS/Cart.css'
import { Link, useNavigate } from 'react-router-dom';
const Cart = (props) => {
    const navigate = useNavigate();
    const URL = window.globalURL

    const [orders, setOrders] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0)

    // Api for fetch All Order
    const getAllOrder = async () => {
        try {
            const response = await fetch(`${URL}/orders`, {
                method: "GET",
                headers: {
                    'AccessToken': localStorage.getItem('accessToken')
                }
            });
            const res = await response.json();
            setOrders(res.data)
            const result = res.data.reduce((acc, obj) => acc + parseInt(((obj.totalPrice))), 0);
            setTotalAmount(result)
        }
        catch (error) {
            console.error('An error occurred:', error);
            props.showAlert('Some Error Occured', 'error')
        }
    }

    useEffect(() => {
        getAllOrder();
    }, [])


    // For continuosly check the Authorization
    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            navigate('/login')
            props.showAlert("Login Required", "error")
        }
    })


    // Api for camcel the Order
    const cancelOrder = async (id) => {
        try {
            const response = await fetch(`${URL}/orders/${id}`, {
                method: "DELETE",
                headers: {
                    'AccessToken': localStorage.getItem('accessToken')
                }
            });
            const res = await response.json();
            props.showAlert(res.message, 'success')
            getAllOrder();
        } catch (error) {
            console.error('An error occurred:', error);
            props.showAlert('Some Error Occured', 'error')
        }
    }

    return (
        <div className='cart'>
            <div className="heading-cart">
                <h1>Your Cart</h1>
            </div>

            {orders.length === 0 ? <div className='no-item'>No items Found</div> : <div className="order-details">
                <div className="cart-payment" >
                    <table>
                        <tr style={{ fontSize: '1.1em', fontWeight: '700' }}>
                            <td style={{ width: '8rem' }}>S no.</td>
                            <td style={{ width: '15rem' }}>Product</td>
                            <td>Quantity</td>
                            <td>Status</td>
                            <td>Price</td>
                            <td style={{ width: '15rem' }}>Action</td>
                        </tr>
                        {orders.map((e, i) => {
                            return (
                                <>
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td>{e.pizzaType}</td>
                                        <td>{e.quantity}</td>
                                        <td>{e.status}</td>
                                        <td>{e.totalPrice}</td>
                                        <td  ><button onClick={() => cancelOrder(e._id)}>Cancel</button><Link style={{ textDecoration: 'none' }} to={`/order-details/${e._id}`}> <button>See Order</button></Link></td>
                                    </tr>
                                </>
                            )
                        })}
                        <tr style={{ fontSize: '1.1em', fontWeight: '700' }}>
                            <td colSpan={4}>Total Payable Amount</td>
                            <td>&#8377;{totalAmount}</td>
                        </tr>
                    </table>

                </div>
            </div>}
        </div>
    )
}

export default Cart