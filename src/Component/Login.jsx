import React, { useState } from 'react'
import '../CSS/Login.css'
import { useNavigate, Link } from 'react-router-dom';
import Spinner from './Spinner'
const Login = (props) => {
  const [spinner, setSpinner] = useState(false)
  const navigate = useNavigate();

  const URL = window.globalURL
  const [Auth, setAuth] = useState({
    email: '',
    password: '',
  })

  const onChange = (e) => {
    setAuth({ ...Auth, [e.target.name]: e.target.value })
  }

  const submitForm = async (e) => {
    setSpinner(true)
    localStorage.clear();
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/users/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: Auth.email, password: Auth.password }),

      });
      const json = await response.json();
      console.log(json)
      if (json.success) {
        const accessToken = json.data.accessToken
        setSpinner(false)
        props.showAlert(json.message, 'success')
        localStorage.setItem("accessToken", accessToken)
        navigate('/')
      }
      else {
        props.showAlert(json.message, 'error')
        setSpinner(false)
      }
    }
    catch (error) {
      console.error('An error occurred:', error);
      props.showAlert('Some Error Occured', 'error')
    }
  }

  return (

    <div className="auth-wrapper">
      {spinner && <Spinner />}

      <form onSubmit={submitForm}>
        <h2>Sign In </h2>
        <div className="each-label">
          <label>Email</label>
          <input
            type="email"
            name='email'
            id='email'
            autoComplete='off'
            onChange={onChange}
            value={Auth.email}
          />
        </div>
        <div className="each-label">
          <label>Password</label>
          <input
            type="password"
            name='password'
            autoComplete='off'
            id='password'
            onChange={onChange}
            value={Auth.password}
          />
        </div>

        <div className="submit-button">
          <button type="submit" >
            Submit
          </button>
        </div>
        <div className="extra-button">
        <p >
          <Link to="/sign-up">Not Registered?     Sign Up Now!</Link>
        </p>
        </div>
      </form>

    </div>
  )
}

export default Login