import React from 'react'
import '../CSS/Spinner.css'
const Spinner = () => {
  return (
    <div className='spinner'>
        <img src={require('../Image/spinner.gif')} alt="" />
    </div>
  )
}

export default Spinner