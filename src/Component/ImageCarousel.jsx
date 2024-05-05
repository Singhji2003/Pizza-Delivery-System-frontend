import React, { useEffect } from "react";
import '../CSS/ImageCarousel.css'
import {Link} from 'react-router-dom'
const ImageCarousel = () => {
  useEffect(() => {
    let slideIndex = 0;
    function showSlides() {
      let i;
      let slides = document.querySelectorAll(".mySlides");
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > slides.length) { slideIndex = 1 }
      slides[slideIndex - 1].style.display = "block";
      setTimeout(showSlides, 4000);
    }
    function showRightSlides() {
      let i;
      let slides1 = document.querySelectorAll(".rightmySlides");
      for (i = 0; i < slides1.length; i++) {
        slides1[i].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > slides1.length) { slideIndex = 1 }
      slides1[slideIndex - 1].style.display = "block";
      setTimeout(showRightSlides, 5000);
    }
    showSlides();
    showRightSlides();
  }, [])
  return (
    <div className="carousel">
      <div className="leftimagesSection">
        <div className="slideshow-container">
          <div className="mySlides fade " >
            <img src={'https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBpenphfGVufDB8fDB8fHww'} width="100%" alt='banner' />
          </div>
          <div className="mySlides fade" >
            <img src={'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBpenphfGVufDB8fDB8fHww'} width="100%" alt='banner' />
          </div>
          <div className="mySlides fade" >
            <img src={'https://plus.unsplash.com/premium_photo-1673439305009-821f62df6d31?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGl6emF8ZW58MHx8MHx8fDA%3D'} width="100%" alt='banner' />
          </div>
        </div>
      </div>
      <div className="heading-home">
        <h1>Welcome to Pizza Delivery System</h1>
        <p>Pizza, a culinary delight, captivates with its irresistible combination of flavors and textures. Each bite offers a symphony of sensations – from the gooey stretch of melted cheese to the savory burst of tomato sauce. Its crust, crispy on the outside and soft within, serves as the perfect canvas for an array of toppings, from classic pepperoni to exotic pineapple.</p>
        <a href='#product'><button>Order Pizza Now</button></a>
      </div>
      <div className="rightImagesSection">
        <div className="rightslideshow-container">
          <div className="rightmySlides fade">
            <img src={'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBpenphfGVufDB8fDB8fHww'} width="100%" alt='banner' />
          </div>

          <div className="rightmySlides fade">
            <img src={'https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBpenphfGVufDB8fDB8fHww'} width="100%" alt='banner' />
          </div>

          <div className="rightmySlides fade" onLoad={() => {


          }}>
            <img src={'https://images.unsplash.com/photo-1544982503-9f984c14501a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBpenphfGVufDB8fDB8fHww'} width="100%" alt='banner' />
          </div>

        </div>
      </div>
    </div>
  );
};


export default ImageCarousel