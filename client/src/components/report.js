import "../assets/All-CSS/report.css";
import React, { useState, useRef, useEffect } from "react";

import certificatePNG from "../assets/cert.png";

export const Report = ({ questions, scores, answers }) => {
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
    <section className="reportUI">
      <div className="headerreport">Interview Report</div>
      <div className="reportContainer">
        {questions.map((q, index) => (
          <div key={index} className="question">
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
          </div>
        ))}
        <div className="finalscore">
          Overall Score: {overallScore}
          {shouldDisplayButton && (
            <>
              <h2>Congratulations! You are qualified for the certificate!</h2>
              <button className="certificate" onClick={downloadCertificate}>
                Download Certificate
              </button>
            </>
          )
          }
         {overallScore <= 6 && (
            <h2>Sorry! You didn't Qualify for the certificate!</h2>
          )}
        </div>
        <div className="improvement">
          {result.length > 0 && (
            <>
              Improvement Areas:
              <ul>
                {result.map((result, index) => (
                  <li id="improvementlist" key={index}>
                    <ol>{result}</ol>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
       
      </div>
      <div style={{ display: "none" }}>
        {certificate && (
          <canvas
            ref={canvasRef}
            width={certificate.width}
            height={certificate.height}
          />
        )}
      </div>
      
    </section>
  );
};
