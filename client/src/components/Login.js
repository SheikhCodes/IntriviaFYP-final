import React, { useEffect, useState,FontAwesomeIcon } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import logimage from "../assets/log.svg";
import "../assets/All-CSS/mystyle.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [showAnimation, setShowAnimation] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    console.log(data);
    if (res.status === 400 || !data) {
      window.alert("Invalid Credentials");
    } else {
      //setShowAnimation(true); // show the animation
      window.alert("Login Successfull");
      navigate("/dropdown");
      console.log(data.data._id)
      localStorage.setItem("userid", data.data._id);
      localStorage.setItem("username", data.data.name);
      // setTimeout(() => {
      //   setShowAnimation(false); // hide the animation after 3 seconds
      // }, 3000);
      //localStorage.setItem("userid", data.user._id);
    }
  };

  return (
    <div>
      <div className="mycontainer">
      {/* {showAnimation && ( // render the animation if showAnimation is true
          <div className="success-animation">
            <p>You have been successfully signed in!</p>
            <FontAwesomeIcon icon="fa-solid fa-circle-check" />
          </div>
        )} */}
        <div className="forms-container">
          <div className="signin-signup">
            <form method="POST" className="sign-in-form" id="signIn">
              <h2 className="title">Sign in</h2>

              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  autoComplete="off"
                  placeholder="Email"
                />
              </div>

              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  autoComplete="off"
                  placeholder="Password"
                />
              </div>

              <input
                type="submit"
                value="Login"
                onClick={loginUser}
                className="mybtn solid"
              />
              <p className="social-text">Or Sign in with social platforms</p>
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
          <div className="panel left-panel" id="lP">
            <div className="content">
              <h3>New here?</h3>
              <p>Sign up now to Get started!</p>
              <button className="mybtn transparent" id="sign-up-btn">
                Sign up
              </button>
            </div>

            <img src={logimage} className="image" alt="img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
