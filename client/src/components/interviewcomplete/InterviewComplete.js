import React from 'react'
import './InterviewComplete.css'
import robot1 from '../../assets/robot.png'
import {motion} from 'framer-motion'
import { fadeIn, slideIn,textVariant,staggerContainer } from '../../utils/motion';


const InterviewComplete = ({ handleShowReport, retake }) => {

    return (
      <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      
      className="interview-complete-wrapper">
        <motion.div variants={slideIn('left', 'tween', 0.2, 1)}   className="interview-complete-inner">
          <img   src={robot1} alt="robot" />
          <motion.h1 variants={textVariant(1.1)} className="interview-complete-title">Congratulation! You have Completed the interview session.</motion.h1>
          <div className="interview-complete-buttons">
          <button onClick={handleShowReport} className="interview-complete-report">
            Show Report
          </button>
          <button onClick={retake} className="interview-complete-retake">
            Retake
          </button>
          </div>
          
        </motion.div>
      </motion.section>
    );
  };

export default InterviewComplete