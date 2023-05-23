import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../components/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import intersession from "../assets/session.png";
import { FaMicrophone } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegKeyboard } from "react-icons/fa";
import "../assets/All-CSS/interviewsession.css";
import { Report } from "./report";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";



const Interviewsession = () => {
  const [questions, setQuestions] = useState([]);
  const [reportkeywords, setReportKeywords] = useState("");
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [isSessionCompleted, setIsSessionCompleted] = useState(false);
  const [retakeCount, setRetakeCount] = useState(0);
  const [showAnswerTextArea, setShowAnswerTextArea] = useState(false);
  const [showsubmitbutton, setsubmitbutton] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [previousQuestions, setPreviousQuestions] = useState([]);
  const [isAnswerGiven, setIsAnswerGiven] = useState(false); // New state variable
  const [showAnimation, setShowAnimation] = useState(false);
  const [previousQuestion, setPreviousQuestion] = useState("");
  const [isListening, setIsListening] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();

  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
// useEffect(() => {
//     const getStream = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: false,
//         });
//         setStream(stream);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     getStream();
//   }, []);

//   useEffect(() => {
//     if (stream && videoRef.current) {
//       videoRef.current.srcObject = stream;
//     }
//   }, [stream]);


  const handleStartListening = () => {
    setIsListening(true);
    SpeechRecognition.startListening();
  };
  const handleStopListening = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
  };
  useEffect(() => {
    setAnswer(transcript);
  }, [transcript]);
      

  //const answerRef = useRef(null);
  const navigate = useNavigate();
  const synth = window.speechSynthesis;
  const [similarityScore, setSimilarityScore] = useState([]);
  const calculateSimilarity = async (original_anss, answer) => {
    fetch("http://localhost:4000/quesans", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        original_ans: original_anss,
        user_ans: answer,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Score:", data.total_score);

        // Update the UI with the score
        setSimilarityScore((prevScores) => [...prevScores, data.total_score]);
        //console.log(similarityScore)
      })
      .catch((error) => console.error(error));
  };
  //Topic modeling
  const [topics, setTopics] = useState([]);

  const Findtopic = async (answer) => {
    fetch("http://localhost:4001/predict", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        ans: answer,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Topics:", data.matched_strings);
        setTopics(data.matched_strings);
      })
      .catch((error) => console.error(error));
  };
  //----------End------------------------------------------

  useEffect(() => {
  
    const fetchData = async () => {
      const { data } = await axios.get("/interviewpage");
      const level1Questions = data.filter((q) => q.level === 1);
      const level2Questions = data.filter((q) => q.level === 2);
      const level3Questions = data.filter((q) => q.level === 3);

      // Select a random question from each level and add to the newQuestions array
      const newQuestions = [
        level1Questions[Math.floor(Math.random() * level1Questions.length)],
        level2Questions[Math.floor(Math.random() * level2Questions.length)],
        level2Questions[Math.floor(Math.random() * level2Questions.length)],
        level2Questions[Math.floor(Math.random() * level2Questions.length)],
        level3Questions[Math.floor(Math.random() * level3Questions.length)],
      ];

      // Filter out any previously asked questions and select the first 5 questions
      const filteredQuestions = newQuestions.filter(
        (q) => !previousQuestions.includes(q._id)
      );
      const selectedQuestions = filteredQuestions.slice(0, 5);

      // Set the state variables
      setQuestions(selectedQuestions);
      setCurrentQuestionId(
        selectedQuestions.length > 0 ? selectedQuestions[0]._id : null
      );
      console.log("Questions", selectedQuestions);
      console.log("Answers", selectedQuestions.answer);
      console.log("Level", selectedQuestions[0].level);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      setCurrentQuiz(0);
      setAnswer("");
      setIsSessionCompleted(false);
      setIsAnswerGiven(false); // Reset the state variable when a new question is loaded
    }
  }, [questions]);

  //----------------------------------Code for copy restriction-------------------------------------
  // useEffect(() => {
  //   const handlePaste = (event) => {
  //     event.preventDefault();
  //     alert('Pasting not allowed!');
  //   };

  //   if (answerRef.current) {
  //     answerRef.current.addEventListener('paste', handlePaste);
  //   }

  //   return () => {
  //     if (answerRef.current) {
  //       answerRef.current.removeEventListener('paste', handlePaste);
  //     }
  //   };
  // }, []);




const handleNextQuestion = () => {
  if (isAnswerGiven && currentQuiz + 1 < questions.length) {
    const currentQuestion = questions[currentQuiz];
    const currentQuestionTopics = currentQuestion.tags || [];
    const commonTopics = Array.isArray(currentQuestionTopics) ? currentQuestionTopics.filter(topic => topics.includes(topic)) : [];
    const filteredQuestions = questions.filter(question => {
      const questionTopics = question.tags || [];
      return question._id !== currentQuestion._id && Array.isArray(questionTopics) && questionTopics.some(topic => commonTopics.includes(topic));
    });
    let nextQuestion = null;
    if (filteredQuestions.length > 0) {
      nextQuestion = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
    } else {
      // Generate a random question
      const nonCurrentQuestions = questions.filter(question => question._id !== currentQuestion._id);
      nextQuestion = nonCurrentQuestions[Math.floor(Math.random() * nonCurrentQuestions.length)];
    }
 

    setCurrentQuiz(currentQuiz + 1);
    setCurrentQuestionId(nextQuestion._id); // Set currentQuestionId to ID of next question
    setAnswer("");
    setIsSessionCompleted(false);
    setIsAnswerGiven(false); // Reset the state variable when a new question is loaded
    setsubmitbutton(false);
  } else if (isAnswerGiven && currentQuiz + 1 === questions.length) {
    // Check if the answer of the current question has been given and this is the last question
    setIsSessionCompleted(true);
  } else {
    alert("Please provide an answer to the current question."); // Show an alert if the answer has not been given
  }
};

const fetchData = async () => {
  const { data } = await axios.get("/interviewpage");
  const level1Questions = data.filter((q) => q.level === 1);
  const level2Questions = data.filter((q) => q.level === 2);
  const level3Questions = data.filter((q) => q.level === 3);

  // Select a random question from each level and add to the newQuestions array
  const newQuestions = [
    level1Questions[Math.floor(Math.random() * level1Questions.length)],
    level2Questions[Math.floor(Math.random() * level2Questions.length)],
    level2Questions[Math.floor(Math.random() * level2Questions.length)],
    level2Questions[Math.floor(Math.random() * level2Questions.length)],
    level3Questions[Math.floor(Math.random() * level3Questions.length)],
  ];

  // Filter out any previously asked questions and select the first 5 questions
  const filteredQuestions = newQuestions.filter(
    (q) => !previousQuestions.includes(q._id)
  );
  const selectedQuestions = filteredQuestions.slice(0, 5);

  // Set the state variables
  setQuestions(selectedQuestions);
  setCurrentQuestionId(
    selectedQuestions.length > 0 ? selectedQuestions[0]._id : null
  );
  console.log("Questions", selectedQuestions);
  console.log("Answers", selectedQuestions.answer);
  console.log("Level", selectedQuestions[0].level);
};

  const handleDone = async () => {
   
    if (isAnswerGiven) {
      alert("You have already submitted the answer");
      return;
    }
    if (!answer) {
      alert("Please Enter Answer");
      return;
    }
    const questionText = questions[currentQuiz]?.question || "";
    if (answer.trim().toLowerCase() === questionText.trim().toLowerCase()) {
      alert("Please Enter a Valid Answer");
      return;
    }
    setIsAnswerGiven(true);
    setShowAnimation(true); // show the animation
    setTimeout(() => {
      setShowAnimation(false); // hide the animation after 3 seconds
    }, 3000);
    //alert("Your answer has been successfully submitted!")
    let userid = localStorage.getItem("userid");
    console.log(userid);
    if (currentQuestionId !== null) {
      //console.log(currentQuestionId);
      // Send current question ID to server
      await axios.post("/log-question", {
        questionId: currentQuestionId,
        userid,
      });

      setAnswers((prevAnswers) => [
        ...prevAnswers,
        {
          questionId: currentQuestionId,
          actualAnswer: questions[currentQuiz].answer,
          userAnswer: answer,
        },
      ]);
      console.log(userid);
      calculateSimilarity(questions[currentQuiz].answer, answer);
      Findtopic(answer);
      await axios.post(`/questions/${userid}`);
    }

    setCurrentQuestionId(questions[currentQuiz + 1]?._id || null); // Set currentQuestionId to ID of next question
    //setAnswer("");
    setIsSessionCompleted(currentQuiz + 1 >= questions.length);
    setsubmitbutton(false);
  };

  const interviewQuestion = questions[currentQuiz]?.question || "";

  

  

  const retake = async () => {
    if (retakeCount < 2) {
      setPreviousQuestions((prev) => [...prev, ...questions.map((q) => q._id)]); // add previous questions to the list
      await fetchData();
      setCurrentQuiz(0); // Reset the current quiz to the first question
      setRetakeCount(retakeCount + 1);
      setIsSessionCompleted(false);
      setShowReport(false); // Reset the showReport state value
      setAnswer("");
      setsubmitbutton(false);
    } else {
      alert("You have exceeded the maximum number of retakes.");
    }
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };


  const handleAsk = () => {
    // Get the current question
    const question = questions[currentQuiz];
  
    // Speak the question
    speak(question.question);
  };
  
  

  const TypeAnswerClick = () => {
    setShowAnswerTextArea(true);
    setsubmitbutton(true);
  };

  const handleShowReport = () => {
    setShowReport(true);
  };

  if (isSessionCompleted) {
    if (showReport) {
      return (
        <Report
          questions={questions}
          scores={similarityScore}
          answers={answers}
          keywords={reportkeywords}
        />
      );
    } else {
      return (
        <section className="interviewUI">
          <div id="container" className="interviewcontainerSessionDone">
            <h1>Congratulation! You have Completed the interview session.</h1>
            <button onClick={handleShowReport} className="reportbtn">
              Show Report
            </button>
            <button onClick={retake} className="retakebtn">
              Retake
            </button>
          </div>
        </section>
      );
    }
  } else
    return (
      <section className="interviewUI">
        <div>
          <video
            ref={videoRef}
            autoPlay
            muted
            style={{
              width: "25%",
              position: "fixed",
              bottom: "10px",
              right: "10px",
              zIndex: "9999",
            }}
          />
      </div>
        <div id="container" className="interviewcontainer">
          {showAnimation && ( // render the animation if showAnimation is true
            <div className="success-animation">
              <p>You Answer has been Successfully submitted. </p>
              <FaCheckCircle />
            </div>
          )}

          <div className="upper-layer">
            <h4 id="technicalQuestion">Technical question</h4>
            <h4>{`${currentQuiz + 1}/${questions.length}`}</h4>
          </div>
          <h2 id="Question">
            {interviewQuestion} 
          </h2>
          <div className="options">
            <button id="record" onClick={handleStartListening}>
              <FaMicrophone />
            </button>
            <button id="typeanswer">
              {" "}
              Clear
            </button>
            <button id="askme" onClick={handleAsk}>Ask</button>
            <button id="next" onClick={handleNextQuestion}>
              Next
            </button>
          </div>
          <textarea
            id="answer"
            placeholder="Type your answer here!"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />

          <button id="Done" onClick={handleDone}>
            Submit
          </button>
        </div>
      </section>
    );
};
export default Interviewsession;
