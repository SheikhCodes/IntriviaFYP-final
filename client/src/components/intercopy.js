// import React, { useEffect, useState } from 'react';
// import {  useNavigate } from "react-router-dom";
// import "../assets/All-CSS/interviewsession.css";
// import axios from "../components/axios";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import intersession from "../assets/session.png";
// import { FaMicrophone } from 'react-icons/fa';
// import { FaRegKeyboard } from 'react-icons/fa';




// const quiz=document.getElementById('quiz')
// const nextbtn=document.getElementById('next')

// const Interviewsession = () => {

//   const submitbtn=document.getElementById('Done')
// const question=document.getElementById('Question')

  
//   // const submitAns=document.getElementById("typeanswer")
//   // const showanswer=document.getElementById("answer")
//   // const interviewui=document.getElementById("container")
//   // const Donebtn=document.getElementById("Done")  

//   // console.log(Donebtn)
//   // console.log(interviewui)

//   // submitAns.addEventListener("click",function(){

//   //   interviewui.style.height="370px"
//   //   showanswer.style.opacity='1'
//   //   Donebtn.style.opacity='1'
//   //   showanswer.style.visibility='visible'
//   //   Donebtn.style.visibility='visible'
    
//   // })

//   // Donebtn.addEventListener("click",function(){
//   //   interviewui.style.height="210px"
//   //   showanswer.style.visibility='hidden'
//   //   Donebtn.style.visibility='hidden'
//   //   showanswer.style.opacity='0'
//   //   Donebtn.style.opacity='0'
    
//   // })


//   // function TypeAnswer(){
//   //   interviewui.style.height="370px"
//   //   showanswer.style.display='inline'
//   //   Donebtn.style.display='inline'
//   // }
  
//    const navigate=useNavigate();

// //   function handleClick(){
// //     navigate("/")
// //   }
  
  
//    const [questions,setquestions]=useState("");
//   useEffect(()=>{
//     const fetchdata=async()=>{
//       const data=await axios.get("/interviewpage");
//       setquestions(data);
//       console.log("Questions",data);
//     };
//     fetchdata(); 
//   },[]);

//   const interviewquestions=[]
//   {questions && questions?.data.map((interview)=>( 
//     interviewquestions.push(interview.question)
//   ))}

// //   let questionno=0;
// //   function displayQuestions(){
// //     question.innerText=interviewquestions[questionno]
// //     nextquestion()
// //   }
// //  function nextquestion(){
// //   questionno+=1
// //  }
//   // nextbtn.addEventListener('click',function(){
//   //   questionno+=1
//   // })

//   // console.log(interviewquestions)

// //   let currentQuiz=0;
// // function loadQuiz(){
// //   const currentQuizdata=interviewquestions[currentQuiz];
// //   question.innerText=currentQuizdata;
// // }
// //   loadQuiz()
 

// //   submitbtn.addEventListener('click',()=>{
// //     currentQuiz++

// //     if(currentQuiz<interviewquestions.length){
// //       loadQuiz()
// //     }
// //     else{
      
// //       navigate("/dropdown")
// //       // quiz.innerHTML=`
// //       // <h2>You answered ${interviewquestions.length} questions.</h2>
// //       // <button onclick="navigate("/")";>Exit Interview</button>
// //       // `
// //     }
// // })
  
//   return (

//     <section className='interviewUI'>
//       <div id='container' className='interviewcontainer'>
//           <div className='upper-layer'>
//           <h4 id='technicalQuestion'>Technical question</h4>
//           <h4>1/5</h4>
//           </div>
//         <h2 id='Question'>
          
//         </h2>
//         <div className='options'>
//           <button id='record'><FaMicrophone /> Answer</button>
//           <button id='typeanswer'> Type Answer</button>
//           <button  id='next'>Next</button>
//         </div>
        
//         <textarea  id='answer' placeholder='Type your answer here!'required></textarea>
//         <button id='Done'>Submit</button>
//       </div>
//     </section>  
//   );


// };
// export default Interviewsession;



