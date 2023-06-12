import React from "react";
import './Footer.css'
import {CiFacebook} from 'react-icons/ci'
import {FiInstagram} from 'react-icons/fi'
import {FiTwitter} from 'react-icons/fi'
import {FaLinkedin} from 'react-icons/fa'
import logo from "../../assets/blackLogo.png";
const Footer = () => {
  return (
    <section className="footer-wrapper">
      <div className="footer-wrapper-content">
            <div className="footer-wrapper-start">
                <div className="footer-wrapper-subscribe">Subscribe For Updates</div>
                <button className="footer-wrapper-button">Subscribe</button>
            </div>

            <div className="footer-wrapper-partition" />

            <div className="footer-wrapper-end">

                <div className="footer-wrapper-name">
                    <img src={logo} alt="logo" className="footer-wrapper-logo"/>
                    Intrivia</div>
                <div className="footer-wrapper-copyright">Copyright © 2021 - 2022 Intrivia. All rights reserved.</div>
                <div className="footer-wrapper-icons">
                    <h4><CiFacebook size={34}/></h4>
                    <h4><FiInstagram size={34}/></h4>
                    <h4><FiTwitter size={34}/></h4>
                    <h4><FaLinkedin size={34}/></h4>
                </div>
            </div>
      </div>
    </section>
  );
};

export default Footer;
