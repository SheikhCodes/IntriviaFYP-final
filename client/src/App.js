import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
// Components
import Navbar from "./components/Navbar/Navbar";
import Interviewsession from "./components/interview/interviewsession";
import Dropdown from "./components/dropdown/drop";
// Pages
import Signup from "./pages/SignUp/Signup";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import About from "./pages/AboutUs/About";
import Howwork from "./pages/HowitWorks/Howwork";
import ViewProfile from "./components/viewprofile/ViewProfile";
import InterviewComplete from "./components/interviewcomplete/InterviewComplete";
const App = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("userid"));

  


  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem("userid");
    // Update the logged-in state
    setLoggedIn(false);
    // Navigate to the login page
    navigate("/login");
  };

  return (
    <div style={{overflow:"hidden"}}>
      <Navbar loggedIn={loggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/howitworks" element={<Howwork />} />
        <Route path="/dropdown" element={<Dropdown />} />
        <Route path="/interviewsession" element={<Interviewsession />} />
        <Route path="/viewprofile" element={<ViewProfile/>}/>
      </Routes>
      {/* <Interviewsession/> */}
    </div>
  );
};

export default App;
