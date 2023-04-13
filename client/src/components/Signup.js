import React, { useState } from "react";
// import pix from "../../Used Images/RegistrationImage.jpeg";
import axios from "axios";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// import "../../src/index.css"
//import { useHistory } from "react-router-dom";
import regimage from "../assets/register.svg";

const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { name, email, phone, work, password, cpassword } = user;

    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      }),
    });
    const data = await res.json();

    if (res.status === 422 || !data) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    } else {
      console.log(data);
      window.alert("Successfully Registered");
      console.log("Successfully Registered ");
      navigate("/login");
    }
  };

  return (
    <div>
      <div className="mycontainer">
        <div className="forms-container">
          <div className="signin-signup">
            <form method="POST" className="sign-up-form" id="signUp">
              <h2 className="title">Sign up</h2>

              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={user.name}
                  onChange={handleInputs}
                  autoComplete="off"
                  placeholder="Full Name"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputs}
                  id="email"
                  autoComplete="off"
                  placeholder="Email"
                />
              </div>

              <div className="input-field">
                <i className="fas fa-address-book"></i>
                <input
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleInputs}
                  id="phone"
                  autoComplete="off"
                  placeholder="Contact No"
                />
              </div>

              <div className="input-field">
                <i className="fas fa-graduation-cap"></i>
                <input
                  type="text"
                  name="work"
                  value={user.work}
                  onChange={handleInputs}
                  id="work"
                  autoComplete="off"
                  placeholder="Qualification"
                />
              </div>

              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleInputs}
                  id="password"
                  autoComplete="off"
                  placeholder="Password"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  name="cpassword"
                  value={user.cpassword}
                  onChange={handleInputs}
                  id="cpassword"
                  autoComplete="off"
                  placeholder="Confirm Password"
                />
              </div>

              <input
                type="submit"
                value="Sign Up"
                onClick={PostData}
                className="mybtn solid"
              />
              <p className="social-text">Or Sign up with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Already Registered?</h3>
              <p>Sign in now to Get Started</p>
              <button className="mybtn transparent" id="sign-in-btn">
                Sign in{" "}
              </button>
            </div>

            <img src={regimage} className="image" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
