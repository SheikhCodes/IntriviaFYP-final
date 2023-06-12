import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import profile from "../../assets/profile.png";

import './ViewProfile.css';

const ViewProfile = () => {
  const retake = localStorage.getItem("retakecount");
  const currentscore = localStorage.getItem("overallscore");

  const navigate = useNavigate(); // Create navigate function

  const handleBackToInterview = () => {
    navigate('/interviewsession'); // Navigate to the interview session route
  };

  return (
    <section className="profile-wrapper">
      <div className="profile-wrapper-img">
        <img src={profile} alt="userprofile" />
      </div>
      <div className="profile-wrapper-profiledetails">PROFILE</div>
      <div className="profile-wrapper-content">
        <div className="profile-wrapper-item">
          <div className="profile-wrapper-name"><b>Name:</b> Ali Haider</div>
          <div className="profile-wrapper-email"><b>Email:</b> ali@gmail.com</div>
          <div className="profile-wrapper-phone"><b>Phone No:</b> 0321 87946746 </div>
          <div className="profile-wrapper-qualification"><b>Qualification:</b> BS-CS</div>
          <div className="profile-wrapper-attempt"><b>No of Attempts:</b> {retake}.0</div>
          <div className="profile-wrapper-score"><b>Current Score:</b> {currentscore}.0</div>
        </div>
      </div>
      <button className="profile-wrapper-button" onClick={handleBackToInterview}>Back to Interview</button>
    </section>
  );
};

export default ViewProfile;
