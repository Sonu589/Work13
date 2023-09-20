import React, { useState } from "react";
import ErrorModel from "./ErrorModel";
import "./css/Login.css";

function Logins() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errorModal, setErrorModal] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(loginData.email)) {
      setErrorModal("Please enter a valid email address.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === loginData.email && u.password === loginData.password
    );

    if (!user) {
      setErrorModal("Invalid email or password.");
      return;
    }

    window.location.href = "/task";
  };

  const closeModal = () => {
    setErrorModal(null);
  };

  return (
    <div className="main">
      <div className="h">
        <h1>Login in!</h1>
        {errorModal && <ErrorModel message={errorModal} onClose={closeModal} />}
        <form onSubmit={handleLogin} autoComplete="off">
          <fieldset>
            <legend>Email Address</legend>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={loginData.email}
              className="input12"
              onChange={handleInputChange}
              autoComplete="off"
            />
          </fieldset>
          <fieldset>
            <legend>Password</legend>
            <input
              type="password"
              autoComplete="off"
              style={{ backgroundColor: "#1d2951" }}
              name="password"
              className="input12"
              placeholder="Enter Password"
              value={loginData.password}
              onChange={handleInputChange}
            />
          </fieldset>

          <div className="check">
            <label className="remember-me-label">
              <input type="checkbox" /> Remember Me
            </label>
            <a href="/">Forgot Password?</a>
          </div>

          <button type="submit" className="buttonsa">
            Login in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Logins;
