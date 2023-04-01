// import React from "react";
import "../../assets/All-CSS/home.css";
import aboutus from "../../assets/myimage.gif";
import { useNavigate } from "react-router-dom";
import React from "react";
import "../../index.css";
import myimage from "../../assets/myimage.gif";
import Button from "../UI/button/Button";
import "../../assets/All-CSS/Button.css";
import { BsMouse } from "react-icons/bs";
import logo from "../../assets/blackLogo.png";
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn,
} from "mdb-react-ui-kit";

const Home = () => {
  const navigate = useNavigate();
  const coursesPage = () => {
    navigate("/login");
  };
  const working = () => {
    navigate("/howitworks");
  };
  return (
    <div>
      <section className="aboutusmainnn">
        <div className="homeleft">
          <h1>INTRIVIA</h1>
          <h3>Score Your Dream Job</h3>

          <h2>AI based Interview trainer</h2>
          <p>
            An interview trainer which will train people with the help of
            artificial intelligence and Session report which will be generated
            at the end of the interview session.
          </p>
          <div class="button-groupp">
            <button class="common-buttonn" onClick={coursesPage}>
              Get Started
            </button>
            <button class="common-button-normall" onClick={working}>
              Learn More
            </button>
          </div>
        </div>

        <div className="aboutus-right-sidee">
          <figure>
            <img src={aboutus} alt="img" />
          </figure>
        </div>
      </section>
      <MDBFooter className=" color-nav text-center" color="black">
        <MDBContainer className="p-4">
          <section className="mb-4">
            <MDBBtn
              outline
              color="black"
              floating
              className="m-1"
              href="#!"
              role="button"
            >
              <MDBIcon fab icon="facebook-f" />
            </MDBBtn>

            <MDBBtn
              outline
              color="black"
              floating
              className="m-1"
              href="#!"
              role="button"
            >
              <MDBIcon fab icon="twitter" />
            </MDBBtn>

            <MDBBtn
              outline
              color="black"
              floating
              className="m-1"
              href="#!"
              role="button"
            >
              <MDBIcon fab icon="google" />
            </MDBBtn>

            <MDBBtn
              outline
              color="black"
              floating
              className="m-1"
              href="#!"
              role="button"
            >
              <MDBIcon fab icon="instagram" />
            </MDBBtn>

            <MDBBtn
              outline
              color="black"
              floating
              className="m-1"
              href="#!"
              role="button"
            >
              <MDBIcon fab icon="linkedin-in" />
            </MDBBtn>

            <MDBBtn
              outline
              color="black"
              floating
              className="m-1"
              href="#!"
              role="button"
            >
              <MDBIcon fab icon="github" />
            </MDBBtn>
          </section>

          <section className="mb-4">
            <p>
              This is a final year project by the Computer Science students of
              National University of Computer And Emerging Sciences, 19 batch ,
              supervised by Dr.Hassan Mujtaba.
            </p>
          </section>
        </MDBContainer>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2023 Copyright: Team Intrivia
        </div>
      </MDBFooter>
    </div>
  );
};

export default Home;
