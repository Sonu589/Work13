// Sign.js
import React, { useState } from "react";
import "./css/Sign.css";
import ErrorModel from "./ErrorModel";

function Sign() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    termsAccepted: false,
  });

  const [errorModal, setErrorModal] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    const usernameRegex = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.termsAccepted
    ) {
      setErrorModal(
        "Please fill in all fields and accept the terms & conditions."
      );
      return;
    }

    if (!emailRegex.test(formData.email)) {
      setErrorModal("Please enter a valid email address.");
      return;
    }

    if (!passwordRegex.test(formData.password)) {
      setErrorModal(
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, and be 6-20 characters long."
      );
      return;
    }

    if (!usernameRegex.test(formData.name)) {
      setErrorModal("Please enter a valid username.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));

    window.location.href = "/login";
  };

  const closeModal = () => {
    setErrorModal(null);
  };

  return (
    <div className="horse">
      <form className="formss" onSubmit={handleSignUp} autoComplete="off">
        <h1 className="sign-text">Sign up</h1>
        {errorModal && <ErrorModel message={errorModal} onClose={closeModal} />}
        <fieldset className="names">
          <legend>Username</legend>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            className="names"
            value={formData.name}
            onChange={handleInputChange}
          />
        </fieldset>
        <fieldset className="names">
          <legend>Email Address</legend>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleInputChange}
            autoComplete="off"
          />
        </fieldset>
        <fieldset className="names">
          <legend>Password</legend>
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            style={{ backgroundColor: "#1d2951" }}
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </fieldset>
        <div className="check">
          <label className="remember-me-label">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleInputChange}
            />{" "}
            I accept the terms & conditions
          </label>
        </div>

        <button type="submit" className="buut">
          Sign up
        </button>
      </form>
    </div>
  );
}

export default Sign;
