import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../components/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import intersession from "../assets/session.png";
import { FaMicrophone } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegKeyboard } from "react-icons/fa";
import "../assets/All-CSS/interviewsession.css";
import { Report } from "./report";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Interviewsession = () => {
  const [questions, setQuestions] = useState([]);
  const[reportkeywords,setReportKeywords]=useState("");
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
  const navigate = useNavigate();


  const [similarityScore, setSimilarityScore] = useState([]);
  const calculateSimilarity = async (original_anss,answer) => {
    fetch("http://localhost:4000/quesans", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        original_ans:original_anss,
        user_ans: answer,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Score:", data.score);
        
        // Update the UI with the score
        setSimilarityScore((prevScores) => [...prevScores, data.score]);
        //console.log(similarityScore)
        
      })
      .catch((error) => console.error(error));
  };

  const { transcript, listening, resetTranscript } = useSpeechRecognition({
    continuous: true,
    interimResults: true,
    maxSilence: 5000, // set the maxSilence to 5 seconds
  });
  //----------End------------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/interviewpage");
      const newQuestions = data.filter(q => !previousQuestions.includes(q._id)); // exclude questions from previous attempts
      const shuffledQuestions = newQuestions.sort(() => Math.random() - 0.5); // Shuffle questions array
      setQuestions(shuffledQuestions.slice(0, 5)); // Select first 5 questions from shuffled array
      setCurrentQuestionId(
        shuffledQuestions.length > 0 ? shuffledQuestions[0]._id : null
      ); // Set currentQuestionId to ID of first question
      console.log("Questions", shuffledQuestions);
      console.log("Answers",shuffledQuestions.answer)
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
    if ( isAnswerGiven && currentQuiz + 1 < questions.length) {
      setCurrentQuiz(currentQuiz + 1);
      setCurrentQuestionId(questions[currentQuiz + 1]._id); // Set currentQuestionId to ID of next question
      setAnswer("");
      setIsSessionCompleted(false);
      setIsAnswerGiven(false); // Reset the state variable when a new question is loaded
      setsubmitbutton(false);
    } else if (isAnswerGiven && currentQuiz + 1 === questions.length) { // Check if the answer of the current question has been given and this is the last question
      setIsSessionCompleted(true);
    }else {
      alert('Please provide an answer to the current question.'); // Show an alert if the answer has not been given
    }
  };

  const handleDone = async () => {

    if (isAnswerGiven) {
      alert("You have already submitted the answer")
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

      setAnswers(prevAnswers => [
        ...prevAnswers,
        {
          questionId: currentQuestionId,
          actualAnswer: questions[currentQuiz].answer,
          userAnswer: answer,
        }
      ]);
      console.log(userid);
      calculateSimilarity(questions[currentQuiz].answer,answer )
      await axios.post(`/questions/${userid}`);
      
    }
    
    setCurrentQuestionId(questions[currentQuiz + 1]?._id || null); // Set currentQuestionId to ID of next question
    //setAnswer("");
    setIsSessionCompleted(currentQuiz + 1 >= questions.length);
    setsubmitbutton(false);
    
  };

  const interviewQuestion = questions[currentQuiz]?.question || "";

  const fetchData = async () => {
    const { data } = await axios.get("/interviewpage");
    const newQuestions = data.filter(q => !previousQuestions.includes(q._id)); // exclude questions from previous attempts
    const shuffledQuestions = newQuestions.sort(() => Math.random() - 0.5); // Shuffle questions array
    setQuestions(shuffledQuestions.slice(0, 5)); // Select first 5 questions from shuffled array
    setCurrentQuestionId(shuffledQuestions.length > 0 ? shuffledQuestions[0]._id : null); // Set currentQuestionId to ID of first question
    console.log("Questions", shuffledQuestions);
    //console.log("Answers", shuffledQuestions.answer);
  };

  const retake = async () => {
    if (retakeCount < 2) {
      setPreviousQuestions(prev => [...prev, ...questions.map(q => q._id)]); // add previous questions to the list
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
  

  const TypeAnswerClick = () => {
    setShowAnswerTextArea(true);
    setsubmitbutton(true);
  };

  const handleShowReport = () => {
    setShowReport(true);
  };

  if (isSessionCompleted) {
    if (showReport) {
      return <Report questions={questions} scores={similarityScore} answers={answers} keywords={reportkeywords} />;
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
       
        <div id="container" className="interviewcontainer">

        {showAnimation && ( // render the animation if showAnimation is true
          <div className="success-animation">
            <p>You Answer has been submitted Successfully</p>
            <FaCheckCircle />
          </div>
        )}
        
          <div className="upper-layer">
            <h4 id="technicalQuestion">Technical question</h4>
            <h4>{`${currentQuiz + 1}/${questions.length}`}</h4>
          </div>
          <h2 id="Question">
            {interviewQuestion} {listening ? "on" : "off"}
          </h2>
          <div className="options">
            <button id="record" onClick={SpeechRecognition.startListening}>
              <FaMicrophone /> Answer
            </button>
            <button onClick={resetTranscript} id="typeanswer">
              {" "}
              Clear
            </button>
            <button id="next" onClick={handleNextQuestion}>
              Next
            </button>
          </div>
          <textarea
            id="answer"
            placeholder="Type your answer here!"
            defaultValue={transcript}
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
