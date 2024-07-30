import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Home.css";
import Image from "../../Assets/shopping-concept-with-couple-space.jpg";

const Home = () => {
  return (
    <section id="home">
      <div className="home_page">
        <div className="home_img">
          <img src={Image} alt="img" />
        </div>
        <div className="home_txt">
          <p className="collectio">TRENDING COLLECTION</p>
          <h2>
            Explore Winter
            <br />
            Collection 2024
          </h2>
          <div className="home_label">
            <p>
              We Design Pieces Of Furniture And object that
              <br />
              Perfectly Gap Between Functionallyity and Beauty.
            </p>
          </div>
          <button class="button">
            Shop now
            <svg class="cartIcon" viewBox="0 0 576 512">
              <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
            </svg>
          </button>
          <div className="home_social_icons">
            <a href="#">
              <i className="bx bxl-facebook"></i>
            </a>
            <a href="#">
              <i className="bx bxl-twitter"></i>
            </a>
            <a href="#">
              <i className="bx bxl-pinterest"></i>
            </a>
            <a href="#">
              <i className="bx bxl-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
