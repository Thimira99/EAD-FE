import React, { Component, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import login from "./mainlogin.module.css";
import axios from "axios";
import { useState } from "react";
import { Button, Dropdown } from "react-bootstrap";

function MainLogin() {
  const history = useHistory();

  const [data, setData] = useState({
    nationalIdentificationCard: "",
    password: "",
  });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = "https://localhost:7201/api/login/login";
    axios
      .post(url, data)
      .then((res) => {
        alert(res.data.message);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        if (res.data.user.role === "Backofficer") {
          history.push("/home");
        } else {
          history.push("/traveler");
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <div className={login.login_container}>
      <div className={login.loginform_container}>
        <div className={login.left}>
          <form className={login.form_container} onSubmit={handleSubmit}>
            <h1>Log In</h1>
            <input
              type="text"
              placeholder="Student NIC"
              name="nationalIdentificationCard"
              value={data.nationalIdentificationCard}
              onChange={handleChange}
              required
              className={login.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
              className={login.input}
            />
            <button type="submit" className={login.greenBtn}>
              Log in
            </button>
          </form>
        </div>

        {/* sign up */}
        <div className={login.right}>
          <h1>New Here ?</h1>
          <Link to="/login"></Link>

          <Dropdown>
            <Dropdown.Toggle variant="adds">
              <button type="button" className={login.whiteButton}>
                Sign up
              </button>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/login">User</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default MainLogin;
