import "./report.css";
import React, { useState, useRef, useEffect } from "react";
import {motion} from 'framer-motion'
import { fadeIn, slideIn, staggerContainer, textVariant2,textVariant } from '../../utils/motion';
import certificatePNG from "../../assets/cert.png";
export const Report = ({ questions, scores, answers }) => {
  const [overallscore, setoverallscore] = useState(0);
  const topics = [
    "arrays and strings",
    "classes and objects",
    "pointers",
    "constructors and destructors",
    "inheritance",
    "polymorphism",
    "abstraction",
    "function overloading & overiding",
    "operator overloading & overiding",
    "reference",
    "templates",
    "friend functions",
    "virtual functions",
    "call by reference & value",
    "encapsulation",
    "static member functions",
    "static data members",
    "mutable storage class specifier",
    "destructor overloading ",
    "friend function",
    "member function",
    "inline function",
    "private & protected",
    "pure virtual function",
    "virtual function",
    "abstract class",
    "derived class",
    "access specifier",
    "struct and class",
    "void() return type",
    "shallow copy & deep copy",
    "vector",
    "encapsulation",
    "delete operator",
    "increment & decrement operation",
  ];
  const [certificate, setCertificate] = useState(null);
  const name = localStorage.getItem("username");
  const canvasRef = useRef(null);

  const loadCertificate = () => {
    const img = new Image();
    img.src = certificatePNG;
    img.onload = () => setCertificate(img);
  };

  const downloadCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = certificatePNG;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.font = "150px Helvetica-Bold";
      ctx.fillText(name, 1200, 650);
      const link = document.createElement("a");
      link.download = "certificate.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
  };

  // Call loadCertificate on component mount
  useEffect(() => {
    loadCertificate();
  }, []);

  const overallScore = (
    scores.reduce((acc, curr) => acc + curr, 0) / scores.length
  ).toFixed(1);
  setoverallscore(overallScore)
  localStorage.setItem("overallscore", overallscore);
  const shouldDisplayButton = overallScore > 6;

  const result = []; // Initialize an empty array to store the topics

  // Iterate over the questions and scores
  questions.forEach((q, index) => {
    if (scores[index] < 6) {
      // Iterate over the keywords in the topics array
      for (let i = 0; i < topics.length; i++) {
        const topic = topics[i];
        // Check if the topic is present in the question
        if (q.question.toLowerCase().includes(topic.toLowerCase())) {
          result.push(topic);
          break; // Once a match is found, move on to the next question
        }
      }
    }
  });

  return (
    <motion.section variants={staggerContainer}
    initial="hidden"
    whileInView="show"
    viewport={{ once: false, amount: 0.25 }} className="reportUI">
      <div className="headerreport">Interview Report</div>
      <div className="reportContainer">
        {questions.map((q, index) => (
          <motion.div key={index} variants={fadeIn('right','spring',index *0.5)} className="question">
            <h2 id="questionno">Question {index + 1}</h2>
            <h3>{q.question}</h3>
            <h2>
              <b>Desired Answer:</b>
            </h2>
            <h3>{q.answer}</h3>
            <h2>
              <b> Your Answer:</b>
            </h2>
            <h3>{answers[index]?.userAnswer || "-"}</h3>
            <h3 id="score">Score: {scores[index]} / 10</h3>
          </motion.div>
        ))}
        
       
      </div>
      <motion.div variants={textVariant(1.1)} className="finalscore">
          Overall Score: {overallScore}
          {shouldDisplayButton && (
            <>
              <motion.div variants={textVariant(1.2)} className="report-sorry">Congratulations! You are qualified for the certificate!</motion.div>
              <button className="certificate" onClick={downloadCertificate}>
                Download Certificate
              </button>
            </>
          )
          }
         {overallScore <= 6 && (
            <motion.div variants={textVariant(1.2)} className="report-sorry">Sorry! You didn't Qualify for the certificate!</motion.div>
          )}
        </motion.div>
        <motion.div variants={textVariant(1.3)} className="improvement">
          {result.length > 0 && (
            <>
              Improvement Areas:
              <ul className="report-improvement-list">
                {result.map((result, index) => (
                  <li id="improvementlist" key={index}>
                    <ol>You need to learn concepts of {result} in C++.</ol>
                  </li>
                ))}
              </ul>
            </>
          )}
        </motion.div>
      <div style={{ display: "none" }}>
        {certificate && (
          <canvas
            ref={canvasRef}
            width={certificate.width}
            height={certificate.height}
          />
        )}
      </div>
      
    </motion.section>
  );
};
