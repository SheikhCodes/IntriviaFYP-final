import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../components/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import intersession from '../assets/session.png';
import { FaMicrophone } from 'react-icons/fa';
import { FaRegKeyboard } from 'react-icons/fa';
import "../assets/All-CSS/interviewsession.css";

const Interviewsession = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [answer, setAnswer] = useState('');
  const [isSessionCompleted, setIsSessionCompleted] = useState(false);
  const [retakeCount, setRetakeCount] = useState(0);
  const [showAnswerTextArea, setShowAnswerTextArea] = useState(false);
  const [showsubmitbutton,setsubmitbutton]=useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('/interviewpage');
      const shuffledQuestions = data.sort(() => Math.random() - 0.5); // Shuffle questions array
      setQuestions(shuffledQuestions.slice(0, 5)); // Select first 5 questions from shuffled array
      setCurrentQuestionId(shuffledQuestions.length > 0 ? shuffledQuestions[0]._id : null); // Set currentQuestionId to ID of first question
      console.log('Questions', shuffledQuestions);
     

    };
    fetchData();
  }, []);
  
  




  useEffect(() => {
    if (questions.length > 0) {
      setCurrentQuiz(0);
      setAnswer('');
      setIsSessionCompleted(false);
      setShowAnswerTextArea(false); // Reset the showAnswerTextArea state value
    }
  }, [questions]);

  const handleNextQuestion = () => {
    if (currentQuiz + 1 < questions.length) {
      setCurrentQuiz(currentQuiz + 1);
      setCurrentQuestionId(questions[currentQuiz + 1]._id); // Set currentQuestionId to ID of next question
      setAnswer('');
      setIsSessionCompleted(false);
      setShowAnswerTextArea(false); // Hide the answer textarea when moving to the next question
      setsubmitbutton(false);
    } else {
      setIsSessionCompleted(true);
      //navigate('/dropdown');
    }
  };
  

  const handleDone = async () => {
    let userid=localStorage.getItem('userid')
    console.log(userid)
    if (currentQuestionId !== null) {
      console.log(currentQuestionId)
      // Send current question ID to server
      await axios.post('/log-question', { questionId: currentQuestionId,userid });
      console.log(userid)
      await axios.post(`/questions/${userid}`);

      
    
    }
    setCurrentQuestionId(questions[currentQuiz + 1]?._id || null); // Set currentQuestionId to ID of next question
    setAnswer('');
    setIsSessionCompleted(currentQuiz + 1 >= questions.length);
    setShowAnswerTextArea(false); // Hide the answer textarea after submitting the answer
    setsubmitbutton(false);


  

  };
  

  const interviewQuestion = questions[currentQuiz]?.question || '';
  const retake = () => {
    if (retakeCount < 3) {
      setRetakeCount(retakeCount + 1);
      navigate('/dropdown');
    } else {
      alert("You have exceeded the maximum number of retakes.");
    }
  };

  const TypeAnswerClick = () => {
    setShowAnswerTextArea(true);
    setsubmitbutton(true);
  };
  

  if (isSessionCompleted) {
    return <section className='interviewUI'>
    <div id='container' className='interviewcontainerSessionDone'>
      <h1>Congratulation! You have Completed the interview session.</h1>
      <button className='reportbtn'>Show Report</button>
      <button onClick={retake} className='retakebtn'>Retake</button>
    </div>
  </section>
  }
  else

  return (
    <section className='interviewUI'>
      <div id='container' className='interviewcontainer'>
        <div className='upper-layer'>
          <h4 id='technicalQuestion'>Technical question</h4>
          <h4>{`${currentQuiz + 1}/${questions.length}`}</h4>
        </div>
        <h2 id='Question'>{interviewQuestion}</h2>
        <div className='options'>
          <button id='record'>
            <FaMicrophone /> Answer
          </button>
          <button onClick={TypeAnswerClick} id='typeanswer'> Type Answer</button>
          <button id='next' onClick={handleNextQuestion}>
            Next
          </button>
        </div>
        <textarea
          id='answer'
          placeholder='Type your answer here!'
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />
        
      
        <button id='Done' onClick={handleDone}>
          Submit
        </button>
      
      </div>
    </section>
  );
}
export default Interviewsession;