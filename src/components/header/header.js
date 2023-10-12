import axios from "axios";
import React, { Component, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import student from "../images/std2.jpg";

function Header() {
  const history = useHistory();

  const [user, setUser] = useState("");
  const [logStatus, setLogStatus] = useState(false);

  useEffect(() => {
    const lUser = JSON.parse(localStorage.getItem("user"));
    if (lUser) {
      setUser(lUser);
      setLogStatus(true);
    }
  }, []);

  function logOut() {
    history.replace("/mainLogin");
  }

  console.log(user);
  return (
    <div className="header">
      {logStatus ? (
        <>
          <h5 style={{ color: "white", marginTop: "1.3rem" }}>
            {user.firstName + " "}
            {user.lastName}
          </h5>
          <button className="header-logout-button">Logout</button>
        </>
      ) : (
        <>
          <h3 style={{ color: "white", marginTop: "1rem" }}>No user found</h3>
          <button onClick={logOut} className="header-logout-button">
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default Header;
