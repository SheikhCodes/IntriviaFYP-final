import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Howwork from './components/Howwork';
import Dropdown from "./components/dropdown/drop";
import Interviewsession from "./components/interviewsession"

const App = () => {
  const [selectedoption,setSelected]=useState("")
  return (
    <div>
      
      <>
      
      <Navbar/>
      <Routes>  
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/howitworks" element={<Howwork />} />
        <Route path="/dropdown" element={< Dropdown/>} />
        <Route path="/interviewsession" element={< Interviewsession/>}  />

      </Routes>
      </>
    </div>
  )
}

export default App;
