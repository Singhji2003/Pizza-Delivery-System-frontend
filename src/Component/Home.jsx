import React, { useEffect, useState } from 'react';
import '../CSS/Home.css';
import LimitWords from './LimitWords';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner'
import Footer from './Footer';
import ImageCarousel from './ImageCarousel';
const Home = (props) => {
  const navigate = useNavigate();
  const URL = window.globalURL;

  const [spinner, setSpinner] = useState(false)
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState([]);


  // Api to fetch all Pizza
  const getAllPizza = async () => {
    setSpinner(true)
    try{
    const response = await fetch(`${URL}/pizza/get-pizza`);
    const res = await response.json();
    const initialQuantities = res.data.map(() => 1);
    setQuantities(initialQuantities);
    setProducts(res.data);
    setSpinner(false)
    }
    catch (error) {
      console.error('An error occurred:', error);
      props.showAlert('Some Error Occured', 'error')
    } 
  };

  useEffect(() => {
    getAllPizza();
  }, []);
 

  // Api to add quantity of Pizza
  const updateQuantity = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] += value;
    if (newQuantities[index] < 1) newQuantities[index] = 1;
    setQuantities(newQuantities);
  };


  // Api for add to Cart pizza
  const addToCart = async(pizzaId, quantity)=>{
    setSpinner(true)
    if(!localStorage.getItem('accessToken')){
      navigate('/login')
      props.showAlert("Login is Required to Order", 'error')
    }
    try{
      const response = await fetch(`${URL}/orders`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'AccessToken':localStorage.getItem('accessToken')
        },
        body: JSON.stringify({ pizzaId, quantity, status:"ordered" }),
      });
  
      const json = await response.json();
      if (json.success) {
        props.showAlert(json.message, 'success')
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
    <div className='hom-page'>
     {spinner&& <Spinner/>}
      <ImageCarousel />

      <div className="products" id='product'>
        <div className="heading-product">
          <h2>Our Products</h2>
        </div>
        <div className="products-content">
          {products.map((elem, index) => (
            <div className="each-product" key={elem._id}>
              <img src={elem.image} alt="" />
              <h2>{elem.type}</h2>
              <p><LimitWords text={elem.description} limit={10}/></p>
              <h4>Rs.{elem.price}</h4>
              <div className="quantity">
                <i className="fa-solid fa-minus" onClick={() => updateQuantity(index, -1)}></i>
                {quantities[index]}
                <i className="fa-solid fa-plus" onClick={() => updateQuantity(index, 1)}></i>
              </div>
              <button onClick={()=>addToCart(elem._id, quantities[index])}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
