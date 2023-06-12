import "./about.css";
import icon1 from "../../assets/zohaib.png";
import icon2 from "../../assets/sameer.png";
import icon3 from "../../assets/fajr.png";
import aboutus from "../../assets/aboutus.png";
import React from "react";
import Footer from "../../components/footer/Footer";

const About = () => {
  return (
    <section className="mainsection">
      <section className="aboutusmain">
        <div className="aboutus-left-side">
          <h1>About Us</h1>
          <p>
            This project has been developed by three undergraduate fastians who
            are in their last year of University. Our Aim is to provide an AI
            based interview trainer which will train people before the actual
            interview.
          </p>
        </div>

        <div className="aboutus-right-side">
          <figure>
            <img src={aboutus} alt="img" />
          </figure>
        </div>
      </section>

      <section className="section-thirdd" id="section-third">
        <h2>Members</h2>

        <div className="section-third-taskk">
          <div className="task-11">
            <img src={icon1} alt="img" />
            <h3>Muhammad Zohaib</h3>
            <p>Full Stack Developer</p>
          </div>

          <div className="task-22">
            <img src={icon2} alt="img" />
            <h3>Sameer Khan</h3>
            <p>Full Stack Developer</p>
          </div>

          <div className="task-33">
            <img src={icon3} alt="img" />
            <h3>Fajr Naveed</h3>
            <p>Front-End Developer</p>
          </div>
        </div>
      </section>
      <Footer/>
    </section>
  );
};
export default About;
