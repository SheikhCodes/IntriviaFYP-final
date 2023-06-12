import React, { useState } from "react";
import "../../App.css";
import logo from "../../assets/blackLogo.png";
import heading from "../../assets/nav-logo1.png";
import { useNavigate } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import {motion} from 'framer-motion'
import { fadeIn, slideIn, staggerContainer, textVariant2,textVariant } from '../../utils/motion';
import "./Navbar.css";


const Navbar = ({ loggedIn, handleLogout }) => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogoutClick = () => {
    handleLogout(); // Call the logout function passed as a prop
  };

  const viewProfileHandler = () => {
    navigate("/viewprofile");
    // Logic for viewing the user profile
  };

  const settingsHandler = () => {
    // Logic for navigating to the user settings
  };

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <motion.nav variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }} className="navbar color-nav">
        <motion.div variants={slideIn('left', 'tween', 0.2, 1)} className="nav-logo" id="headingdecor">
          <img id="seticon" src={logo} alt="logo" />
          <img id="setlogo" src={heading} alt="heading" />
        </motion.div>

        <motion.div variants={slideIn('right', 'tween', 0.2, 1)} className="navbar-wrapper">
          <ul className="navbar-wrapper-items">
            <li
              className="navbar-wrapper-item"
              onClick={() => handleNavigation("/")}
            >
              HOME
            </li>
            <li
              className="navbar-wrapper-item"
              onClick={() => handleNavigation("/aboutus")}
            >
              ABOUT
            </li>
            
            <li
              className="navbar-wrapper-item"
              onClick={() => handleNavigation("/howitworks")}
            >
              HOW IT WORKS
            </li>
            <div className="navbar-partition"></div>

            {loggedIn ? (
              <li className="navbar-wrapper-item">
                <div className="profile-dropdown">
                  <BiUserCircle
                    size={34}
                    className="dropdown-toggle"
                    onClick={toggleProfileDropdown}
                  />
                  {isProfileOpen && (
                    <ul className={`dropdown-menu ${isProfileOpen ? "show" : ""}`}>
                      <li onClick={viewProfileHandler}>View Profile</li>
                      <li onClick={settingsHandler}>Settings</li>
                      <li onClick={handleLogoutClick}>Logout</li>
                    </ul>
                  )}
                </div>
              </li>
            ) : (
              <>
                <li
                  className="navbar-wrapper-item"
                  onClick={() => handleNavigation("/login")}
                >
                  LOGIN
                </li>

                <li
                  className="navbar-wrapper-item"
                  onClick={() => handleNavigation("/signup")}
                >
                  REGISTER
                </li>
              </>
            )}
          </ul>
        </motion.div>
      </motion.nav>
    </>
  );
};

export default Navbar;
