
import React, { useState } from "react";
// import pix from "../../Used Images/RegistrationImage.jpeg";
import axios from "axios";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// import "../../src/index.css"
//import { useHistory } from "react-router-dom";
import regimage from "../assets/register.svg";


 const Signup = () => {
  const navigate=useNavigate();

  const[user,setUser]= useState({
    name:"",email:"",phone:"",work:"",password:"",cpassword:""
  });

  let name,value;
  const handleInputs =(e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({...user,[name]:value});
  }

  const PostData= async (e)=> {
    e.preventDefault();

    const { name,email,phone,work,password,cpassword } =user;

    const res = await fetch("http://localhost:5000/register", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        name, email, phone, work, password, cpassword
      })

    });
    const data =await res.json();

      if(res.status===422 || !data){
        window.alert("Invalid Registration");
        console.log("Invalid Registration");
      }else{
        window.alert("Successfully Registered");
        console.log("Successfully Registered ");
        navigate("/login");

      }
  }

  return (

    <div>

            <div className="mycontainer">
            <div className="forms-container">
            <div className="signin-signup">

                <form method="POST" className="sign-up-form" id="signUp" >
                    <h2 className="title">Sign up</h2>

                    <div className="input-field">
                        <i className="fas fa-user"></i>
                        <input type="text" name="name" id="name"
                        value={user.name}
                        onChange={handleInputs}
                        autoComplete="off" placeholder="Full Name"/>

                    </div>
                    <div className="input-field">
                        <i className="fas fa-envelope"></i>
                        <input type="email" name="email"
                        value={user.email}
                        onChange={handleInputs} id="email" autoComplete="off" placeholder="Email"/>
                    </div>

                    <div className="input-field">
                        <i className="fas fa-address-book"></i>
                        <input type="text" name="phone"
                        value={user.phone}
                        onChange={handleInputs} id="phone" autoComplete="off" placeholder="Contact No"/>
                    </div>

                    <div className="input-field">
                        <i className="fas fa-graduation-cap"></i>
                        <input type="text" name="work"
                        value={user.work}
                        onChange={handleInputs} id="work" autoComplete="off" placeholder="Qualification"/>
                    </div>



                    <div className="input-field">
                        <i className="fas fa-lock"></i>
                        <input type="password" name="password"
                        value={user.password}
                        onChange={handleInputs} id="password" autoComplete="off" placeholder="Password"/>
                    </div>
                    <div className="input-field">
                        <i className="fas fa-lock"></i>
                        <input type="password" name="cpassword"
                        value={user.cpassword}
                        onChange={handleInputs} id="cpassword" autoComplete="off" placeholder="Confirm Password"/>
                    </div>

                    <input type="submit" value="Sign Up" onClick={PostData} className="mybtn solid"/>
                    <p className="social-text">Or Sign up with social platforms</p>
                    <div className="social-media">
                        <a href="#" className="social-icon">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="social-icon">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="social-icon">
                            <i className="fab fa-google"></i>
                        </a>
                        <a href="#" className="social-icon">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                        

                </form>
                </div>
                </div>

                <div className="panels-container">

            <div className="panel left-panel">
                <div className="content">
                    <h3>Already Registered?</h3>
                    <p>Sign in now to Get Started</p>
                    <button className="mybtn transparent" id="sign-in-btn" >Sign in </button>
                  

                </div>

                <img src={regimage} className="image" alt=""/>

            </div>

        </div>

                </div>
            </div>   





    // <section id='signup'style={{background:"#012d3b",height:"700px"}}>
    // <div  classNameName="flex items-center justify-center p-10 bg-register bg-cover ">
    //   <form method = "POST"  
    //     classNameName="mt-8 md:mt-0 md:place-self-left place-self-center w-[430px] min-h-[450px] bg-[#E6EFF8] rounded-lg p-10 flex flex-col items-center "
        
    //   >
    //     <div className=" hidden md:flex flex-[8]  ">
    //     </div>
    //     <div className=" flex-[8] flex flex-col items-center p-10 ">
    //       {" "}
    //       <span  className=" text-3xl font-medium font-mono text-slate-900 mytext">
    //         {" "}
    //         Signup
    //       </span>{" "}
    //       <input 
    //         required
    //         //onChange={(e) => setFullname(e.target.value)}
    //         type="text"
    //         name = "name"
    //         value={user.name}
    //         onChange={handleInputs}
    //         placeholder="Full Name"
    //         className=" text_email_password outline-none mt-10 rounded-md my-4 w-[250px] h-9 p-2"
    //       />
    //       <input 
    //         required
    //         //onChange={(e) => setEmail(e.target.value)}
    //         type="email"
    //         name="email"
    //         value={user.email}
    //         onChange={handleInputs}
    //         placeholder="Email"
            
    //         className=" text_email_password outline-none rounded-md w-[250px] h-9 p-2"
    //       />
    //       <input 
    //         required
    //         type="text"
    //         name="phone"
    //         //onChange={(e) => setContact(e.target.value)}
    //         value={user.phone}
    //         onChange={handleInputs}
    //         placeholder="Contact No"
    //         className=" text_email_password outline-none rounded-md my-4 w-[250px] h-9 p-2"
    //       />
          
    //       <input 
    //         required
    //         // onChange={(e) => setAddress(e.target.value)}
    //         type="text"
    //         name="work"
    //         value={user.work}
    //         onChange={handleInputs}
    //         placeholder="Qualification" /////
            
    //         className=" text_email_password outline-none rounded-md my-4 w-[250px] h-9 p-2"
    //       />
    //       <input 
    //         required
    //         type="password"
    //         name="password"
    //         value={user.password}
    //         onChange={handleInputs}
    //         placeholder="Password"
            
    //         className=" text_email_password outline-none  rounded-md  w-[250px] h-9 p-2"
    //         //onChange={(e) => setPassword(e.target.value)}
    //       />
    //       <input
    //         required
    //         //onChange={(e) => setCNIC(e.target.value)}
    //         type="password"
    //         name ="cpassword"
    //         value={user.cpassword}
    //         onChange={handleInputs}
    //         placeholder="Confirm password" //////
            
    //         className=" text_email_password outline-none rounded-md w-[250px] h-9 p-2"
    //       />
    //       <div className="flex flex-col items-center mt-2 ">
    //         <button 
    //           className=" text_email_password btn border-none hover:bg-indigo-600 w-full p-3 my-3 bg-indigo-500 rounded-md  text-white px-8 text-center"
    //           onClick={PostData}  
    //         >
    //           Signup
              
    //         </button>  
                   
    //       </div>
    //     </div>
    //   </form>
    // </div>
    // </section>
  );
};

export default Signup;



// import React from 'react'


// const Signup = () => {
//   return (
//     <div>
//       <h1>Signup</h1>
//     </div>
//   )
// }

// export default Signup;

// import React, { useState } from "react";
// // import pix from "../../Used Images/RegistrationImage.jpeg";
// import axios from "axios";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// // import { toast } from "react-toastify";
// const mytext ={
//     leftMargin:"-10",
//     fontSize: "4rem",
//     display: "flex",
//     alignItems: "center",
//     flexDirection: "column",
//     fontWeight: "400",
//     color: "beige"
//   }

// const text_email_password ={
//     leftMargin:"-10",
//     display: "flex",
//     fontSize: "2rem",
//     margin:"1rem 55rem",
//     padding:"1rem",
//     alignItems: "center",
//     flexDirection: "column",
//     borderRadius: 15,
// }

//  const Signup = () => {

//   const[user,setUser]= useState({
//     name:"",email:"",contactNo:"",dob:"",qualification:"",password:""
//   });

//   let name,value;
//   const handleInputs =(e) => {
//     console.log(e);
//     name = e.target.name;
//     value = e.target.value;

//     setUser({...user,[name]:value});
//   }

//   const PostData= async (e)=> {

//   }

//   return (
//     <section id='signup'style={{background:"#012d3b",height:"700px"}}>
//     <div  className="flex items-center justify-center p-10 bg-register bg-cover ">
//       <form method = "POST" style={text_email_password}
//         className=" flex w-[900px] bg-[#5DB6BC]  rounded-lg  "
//         //onSubmit={submitHandler}
//       >
//         <div className=" hidden md:flex flex-[8]  ">
//         </div>
//         <div className=" flex-[8] flex flex-col items-center p-10 ">
//           {" "}
//           <span  style={mytext}  className="text-3xl text-white font-serif ">
//             {" "}
//             Signup
//           </span>{" "}
//           <input style={text_email_password}
//             required
//             //onChange={(e) => setFullname(e.target.value)}
//             type="text"
//             name = "name"
//             value={user.name}
//             onChange={handleInputs}
//             placeholder="Full Name"
//             className="outline-none mt-10 rounded-md my-4 w-[250px] h-9 p-2"
//           />
//           <input  style={text_email_password}
//             required
//             //onChange={(e) => setEmail(e.target.value)}
//             type="email"
//             name="email"
//             value={user.email}
//             onChange={handleInputs}
//             placeholder="Email"
            
//             className="outline-none rounded-md w-[250px] h-9 p-2"
//           />
//           <input style={text_email_password}
//             required
//             type="text"
//             name="contactNo"
//             //onChange={(e) => setContact(e.target.value)}
//             value={user.contactNo}
//             onChange={handleInputs}
//             placeholder="Contact No"
//             className="outline-none rounded-md my-4 w-[250px] h-9 p-2"
//           />
//           <input style={text_email_password}
//             required
//             //onChange={(e) => setCNIC(e.target.value)}
//             type="text"
//             name ="dob"
//             value={user.dob}
//             onChange={handleInputs}
//             placeholder="Date of birth" //////
            
//             className="outline-none rounded-md w-[250px] h-9 p-2"
//           />
//           <input style={text_email_password}
//             required
//             // onChange={(e) => setAddress(e.target.value)}
//             type="text"
//             name="qualification"
//             value={user.qualification}
//             onChange={handleInputs}
//             placeholder="Qualification" /////
            
//             className="outline-none rounded-md my-4 w-[250px] h-9 p-2"
//           />
//           <input style={text_email_password}
//             required
//             type="password"
//             name="password"
//             value={user.password}
//             onChange={handleInputs}
//             placeholder="Password"
            
//             className="outline-none  rounded-md  w-[250px] h-9 p-2"
//             //onChange={(e) => setPassword(e.target.value)}
//           />
//           <div className="flex flex-col items-center mt-2 ">
//             <button style={text_email_password}
//               className=" btn border-none hover:bg-indigo-600 w-full p-3 my-3 bg-indigo-500 rounded-md  text-white px-8 text-center"
//               onClick={PostData}  
//             >
//               Signup
              
//             </button>  
                   
//           </div>
//         </div>
//       </form>
//     </div>
//     </section>
//   );
// };

// export default Signup;