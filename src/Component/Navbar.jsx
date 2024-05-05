import React from 'react'
import '../CSS/Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
const Navbar = (props) => {
    const navigate = useNavigate();
    const logOut = ()=>{
        localStorage.removeItem('accessToken')
        navigate('/')
        props.showAlert("Successfully Logged Out", 'success')
    }
    return (
        <>
            <div className='navbar' >
                <div className='left-navbar'>
                    <h2>Pizza Delivery System</h2>
                </div>
                <div className="right-navbar">
                    <ul>
                        <Link to="/"><i class="fa-solid fa-house"></i>Home</Link>
                        <Link to="/cart"><i class="fa-solid fa-cart-shopping"></i>Cart</Link>

                        {!localStorage.getItem('accessToken')? <> <Link to="/login"><button>Sign In</button></Link>
                        <Link to="/sign-up"><button>Sign Up</button></Link></>: <Link onClick={logOut}><button>Log Out</button></Link>}
                    </ul>
                </div>

            </div>
        </>
    )
}

export default Navbar