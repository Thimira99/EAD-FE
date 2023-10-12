import React, { Component } from "react";
import { Link, useHistory } from "react-router-dom";
import loginStyles from "./login.module.css";
import axios from "axios";
import { useState } from "react";

function Login() {
  const [data, setData] = useState({
    id: "",
    nationalIdentificationCard: "",
    firstName: "",
    lastName: "",
    email: "",
    isActive: true, // Initialize it as false (a boolean)
    password: "",
    role: "",
  });

  const history = useHistory();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(data);

    try {
      const url = "https://localhost:7201/api/users";
      axios
        .post(url, data)
        .then((res) => {
          if (res.data.message === "User created Successfully") {
            alert(res.data.message);
            history.push("/mainLogin");
          }
        })
        .catch((err) => {
          if (err.response.data.includes('Category : "DuplicateKey"'))
            alert("User Id is already exists");
        });

      console.log(res.message);
    } catch (error) {}
  };

  return (
    <div className={loginStyles.signup_container}>
      <div className={loginStyles.signupform_container}>
        <div className={loginStyles.left}>
          <h1>Welcome Back</h1>
          <Link to="/mainlogin">
            <button type="button" className={loginStyles.whiteButton}>
              Sign in
            </button>
          </Link>
        </div>
        <div className={loginStyles.right}>
          <form className={loginStyles.form_container} onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="User Id(Ex:U123)"
              name="id"
              value={data.id}
              onChange={handleChange}
              required
              className={loginStyles.input}
            />
            <input
              type="text"
              placeholder="National Identification Card(NIC)"
              name="nationalIdentificationCard"
              value={data.nationalIdentificationCard}
              onChange={handleChange}
              required
              className={loginStyles.input}
            />
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={data.firstName}
              onChange={handleChange}
              required
              className={loginStyles.input}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={data.lastName}
              onChange={handleChange}
              required
              className={loginStyles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
              className={loginStyles.input}
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
              className={loginStyles.input}
            />
            <select
              name="role"
              value={data.role}
              onChange={handleChange}
              required
              className={loginStyles.input}
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="Backofficer">Backofficer</option>
              <option value="Travel Agent">Travel Agent</option>
            </select>

            <button type="submit" className={loginStyles.greenBtn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
