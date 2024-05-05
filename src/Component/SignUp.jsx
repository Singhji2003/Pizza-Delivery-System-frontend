import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import Loader from './Spinner'

const SignUp = (props) => {
  const navigate = useNavigate();

  const [spinner, setSpinner] = useState(false);

  const URL = window.globalURL

  const [Auth, setAuth] = useState({
    name: '',
    email: '',
    password: '',
    address: ''
  })

  const onChange = (e) => {
    setAuth({ ...Auth, [e.target.name]: e.target.value })
  }

  const submitForm = async (e) => {
    setSpinner(true);
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/users/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: Auth.name, email: Auth.email, address: Auth.address, password: Auth.password }),
      });

      const json = await response.json();
      if (json.success) {
        props.showAlert(json.message, 'success')
        setAuth({
          name: '',
          email: '',
          password: '',
          address: ''
        })
        navigate('/login')
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
    <div className="auth-wrapper" style={{ height: '36rem', marginTop: '1rem' }}>
      {spinner && <Loader />}
      <form onSubmit={submitForm}>
        <h2>Sign Up</h2>
        <div className="each-label">
          <label>Name</label>
          <input
            type="text"
            name='name'
            id='name'
            onChange={onChange}
            autoComplete='off'
            value={Auth.name}
          />
        </div>
        <div className="each-label">
          <label>Email</label>
          <input
            type="email"
            name='email'
            id='email'
            onChange={onChange}
            autoComplete='off'
            value={Auth.email}
          />
        </div>

        <div className="each-label">
          <label>Address</label>
          <input
            type="text"
            name='address'
            id='address'
            onChange={onChange}
            autoComplete='off'
            value={Auth.address}
          />
        </div>


        <div className="each-label">
          <label>Password</label>
          <input
            type="password"
            name='password'
            id='password'
            onChange={onChange}
            autoComplete='off'
            value={Auth.password}
          />
        </div>
        <div className="submit-button">
          <button type="submit" >
            Sign Up
          </button>
        </div>
        <div className="extra-button">
          <p >
            Already registered <Link to="/login">sign in?</Link>
          </p>
        </div>
      </form>

    </div>
  )
}

export default SignUp