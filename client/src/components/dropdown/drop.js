import React from "react";
import "../../assets/All-CSS/dropdown.css";
import { useState, useEffect } from "react";
import iconimg from "./HR.png";
import { useNavigate } from "react-router-dom";

export const DROPDOWN_OPTIONS = ["C++", "Javascript", "Python"];
const Dropdown = () => {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/interviewsession");
  }

  const [selectedoption, setSelected] = useState(DROPDOWN_OPTIONS[1]);
  const [isoptionsVisible, setisoptionsVisible] = useState(false);
  const handleSelected = (option) => {
    setSelected(option);
    setisoptionsVisible(false);
  };

  return (
    <section className="dropdownpage">
      <div className="dropdown">
        {/* options={DROPDOWN_OPTIONS}
      selectedoption={selectedoption}
      setSelected={setSelected}
      label={"Which langauge would you like to choose for the interview"} */}
        {/* <h1>Welcome</h1>
          <h2>Sheikh Zohaib</h2> */}
        <div className="image-division">
          <img src={iconimg} className="image" alt="img" />
        </div>

        <div className="heading">
          Kindly select the programming language for the interview
        </div>
        <div className="dropdown-component">
          <div
            className="selected-options-wrapper"
            onClick={() => setisoptionsVisible(!isoptionsVisible)}
          >
            <div>{selectedoption}</div>
            {isoptionsVisible ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-chevron-up"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#00abfb"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <polyline points="6 15 12 9 18 15" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-chevron-down"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#00abfb"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <polyline points="6 9 12 15 18 9" />
              </svg>
            )}
          </div>
          {isoptionsVisible && (
            <div className="dropdown-options">
              {DROPDOWN_OPTIONS.length > 0 &&
                DROPDOWN_OPTIONS.map((option) => (
                  <div
                    className="dropdown-option"
                    onClick={() => handleSelected(option)}
                  >
                    {option}
                  </div>
                ))}
            </div>
          )}
        </div>
        <div className="button-group">
          <button className="common-button" onClick={handleClick}>
            Start Interview
          </button>
        </div>
      </div>
    </section>
  );
};

export default Dropdown;
