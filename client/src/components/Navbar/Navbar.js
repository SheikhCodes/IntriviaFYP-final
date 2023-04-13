import React from 'react'
import "../../App.css"
import 'bootstrap/dist/css/bootstrap.css'
import { NavLink } from 'react-router-dom'
import logo from "../../assets/blackLogo.png";
import {NavDropdown,Nav,Container} from "react-bootstrap";
import{LinkContainer} from "react-router-bootstrap";

import heading from "../../assets/tickLogo.png";
import{useDispatch,useSelector} from 'react-redux';


const Navbar = () => {
  // const userLogin=useSelector(state=>state.userLogin)
  // const {users}=userLogin
  // const dispatch=useDispatch()

  // const logouthandler=()=>{
  //   console.log("logout");
  // }

  return (
    <>
      <nav   className="navbar color-nav navbar-expand-lg" >
  <NavLink id='headingdecor' className="navbar-brand" to="#">
    <img id='seticon' src={logo} alt='logo' ></img>
    <img id='setlogo' src={heading} alt='heading'></img>    
  </NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item active">
        <NavLink id='navitems' className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
      </li>
      <li className="nav-item">
        <NavLink id='navitems' className="nav-link" to="/aboutus">About us</NavLink>
      </li>
      
      <li className="nav-item">
        <NavLink id='navitems' className="nav-link" to="/howitworks">How it works</NavLink>
      </li>
      

      <li className="nav-item">
        <NavLink id='navitems' className="nav-link" to="/login">Login</NavLink>
      </li>
   

      <li className="nav-item">
      <NavLink id='navitems' className="nav-link" to="/signup">Sign up</NavLink>
    </li>
    {/* <li className="nav-item">
      <NavLink id='navitems' className="nav-link" to="/interviewsession">Interview</NavLink>
    </li> */}
    {/* <li className="nav-item">
      <NavLink className="nav-link" to="/dropdown">DropDown</NavLink>
    </li> */}
    </ul>
  </div>
</nav>
    </>
  )
}
export default Navbar;