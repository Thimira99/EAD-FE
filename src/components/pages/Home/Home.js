import React, { Component, useEffect } from "react";
import { Carousel } from "react-bootstrap";

import image1 from "../../images/img1.jpg";
import image2 from "../../images/img2.jpg";
import image3 from "../../images/img3.jpg";

import page from "./Home.module.css";
import { useHistory } from "react-router-dom";
import Header from "../../header/header";

// import jwt_decode from 'jwt_decode';

function Home() {
  const history = useHistory();

  return (
    <div className="main-wrapper">
      <div className="app-header">
        <Header />
      </div>
      <div className="app-body">
        <div className="body-wrapper">
          <div className="app-content">
            <h1>Implement back officer functions here</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
