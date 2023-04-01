import React from 'react'
import "../../../assets/All-CSS/Button.css";
const Button = ({text, btnClass}) => {
  return (
    <a href={"href"} className={`btn ${btnClass}`}>{text}</a>
  )
} 

export default Button
