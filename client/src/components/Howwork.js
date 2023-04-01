import "../assets/All-CSS/howitworks.css";
import icon1 from "../assets/option.png";
import icon2 from "../assets/interview.png";
import icon3 from "../assets/report.png";
import React from 'react';

const Howwork = () => (


    <section className='section-third' id='section-third'>
            <h2>How it Works</h2>
           
        <div className='section-third-task'>
            <div className="task-1">
                <img src={icon1} alt="img"/>
                <h3>Choose Topic for Interview</h3>
                <p>After signing in users will be given
                   a few langauge options from which they will select
                   their desired language and start the interview.
                </p>
               
            </div>

            <div className='task-2'>
                <img src={icon2} alt="img"/>
                <h3>Interview session Initiation</h3>
                <p>There wil be a total of fifteen questions
                  relevant to the interviewee desired domain
                  and questions will be asked by analysing the Answers
                  of the interviewee.
                </p>
                
            </div>

            <div className='task-3'>
                <img src={icon3} alt="img"/>
                <h3>View interview session report</h3>
                <p>At the end of the interview session there will be a detailed
                  session report showing all the weak and strong areas of the users.
    
                </p>
            </div>
        </div>

    </section>

    
);

export default Howwork;