import React, { Component, useEffect } from "react";
import Header from "../../header/header";

function Traveler() {
  return (
    <div className="main-wrapper">
      <div className="app-header">
        <Header />
      </div>
      <div className="app-body">
        <div className="body-wrapper">
          <div className="app-content">
            <h1>Implement Travel Agent functions here</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Traveler;
