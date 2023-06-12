import React from "react";
import "../../index.css";
import "../../components/UI/button/Button.css";
import "./home.css";
import aboutus from "../../assets/trainer.gif";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import { motion } from "framer-motion";
import { fadeIn, slideIn, staggerContainer, textVariant2,textVariant } from '../../utils/motion';
const Home = () => {
  const navigate = useNavigate();
  const coursesPage = () => {
    navigate("/login");
  };
  const working = () => {
    navigate("/howitworks");
  };
  return (
    <motion.div
    variants={staggerContainer}
    initial="hidden"
    whileInView="show"
    viewport={{ once: false, amount: 0.25 }}
    
    >
      <section className="home-wrapper">
        <motion.div  variants={slideIn('left', 'tween', 0.2, 1)} className="home-wrapper-left">
          <motion.div variants={textVariant(1.1)} className="home-wrapper-title">INTRIVIA</motion.div>
          <motion.div variants={textVariant(1.3)} className="home-wrapper-subtitle">Score Your Dream Job</motion.div>
          <motion.div variants={textVariant(1.5)} className="home-wrapper-paratitle">AI based Interview trainer</motion.div>
          <motion.p variants={textVariant(1.7)} className="home-wrapper-para">
            An interview trainer which will train people with the help of
            artificial intelligence and Session report which will be generated
            at the end of the interview session.
          </motion.p>
          <div class="home-wrapper-buttons">
            <button class="home-wrapper-button" onClick={coursesPage}>
              Get Started
            </button>
            <button class="home-wrapper-button" onClick={working}>
              Learn More
            </button>
          </div>
        </motion.div>

        <motion.div variants={slideIn('right', 'tween', 0.2, 1)} className="home-wrapper-right">
            <motion.img variants={fadeIn('left','tween',0.7,4)} className="home-wrapper-img fade-in" src={aboutus} alt="img" />
        </motion.div>
      </section>
      <Footer/>
     
    </motion.div>
  );
};

export default Home;
