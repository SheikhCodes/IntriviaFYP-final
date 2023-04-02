const jwt=require("jsonwebtoken")
const express =require('express');
const bcrypt=require('bcryptjs');
const router=express.Router();
router.use(express.json());
const authenticate=require("../middleware/authenticate");
const fs = require("fs");


const User =require("../model/userSchema");
const Question=require('../model/questionSchema');

const questionIds = []; // global variable to store question ids

router.get('/',(req,res)=>{
    res.send('Hello world from the server router.js');
});

// router.post('/log-question', (req, res) => {
//   const { questionId } = req.body;
//   console.log(`Received question ID: ${questionId}`);
//   // TODO: Log the question ID somewhere (e.g. in a database or log file)
//   res.sendStatus(200);
// });
  


router.post('/questions/:userid', async (req, res) => {
    const { userid } = req.params;
  
    try {
        if (questionIds.length > 0) {
          questionIds.length = 0; // Clear the questionIds array if it is not empty
        }
      const filename = `./logs/${userid}.log`;
      const logData = await fs.promises.readFile(filename, "utf-8");
      const ids = logData
        .split("\n")
        .filter((line) => line.startsWith("Question ID:"))
        .map((line) => line.replace("Question ID: ", ""));


     // console.log(questionIds)  
      questionIds.push(...ids); // add new ids to global variable
      console.log(`Added question IDs: ${ids}`);
      console.log(questionIds)
      

      
    } catch (err) {
      console.log(err);
    }
  });


router.get('/question-ids', (req, res) => {
    
    res.status(200).send({ questionIds });
  });  

router.post('/log-question', async (req, res) => {
  const { questionId,userid } = req.body;
  console.log(`Received question ID: ${questionId}`);
  try {
    const filename = `./logs/${userid}.log`;
    const logData = `Question ID: ${questionId}\n`;
    fs.appendFile(filename, logData, (err) => {
      if (err) throw err;
      console.log(`Question ID ${questionId} added to ${filename}`);
    });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


  
router.post('/register',async(req,res)=>{

    const {name,email,phone,work,password,cpassword}=req.body;

    if(!name|| !email||!phone||!work||!password||!cpassword ){
        return res.status(422).json({error:"Plz fill the empty field"});
    }

    try{

        const UserExist=await User.findOne({email:email});

        if(UserExist){
            return res.status(422).json({error:"Email already exists"});
        }
        else if(password!=cpassword){
            return res.status(422).json({error:"Password Doesnot Match"});

        }else{

            const user=new User({name,email,phone,work,password,cpassword});
            await user.save();
            res.status(201).json({message:"User registred successfully"});
            }


    } catch(err){
        console.log(err);
    }
    
});





router.post('/admin',async(req,res)=>{
    const {question,tags,answer}=req.body;
   
    if(!question){
        return res.status(422).json({error:"Plz fill the empty field"});
    }
    try{

        
        const userquestion=new Question({question,tags,answer});
        await userquestion.save();
        res.status(201).json({message:"Question registred successfully"});


    } catch(err){
        console.log(err);
    }
    //res.send('Hello world from the server');
});

//Interview page
router.get('/interviewpage',(req,res)=>{
    Question.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data)
            console.log(data);
        }
    });
});

router.post('/signin',async(req,res)=>{

  try{

      const {email,password}=req.body;
      if(!email || !password){
          return res.status(400).json({error:"Please Fill the data"});
      }

      const userLogin=await User.findOne({email:email}); //This will give is the whole document from the database
      
      if(userLogin){//email check
          const isMatch=await bcrypt.compare(password,userLogin.password);
          const token=await userLogin.generateAuthToken();
          console.log(token);
          res.cookie("jwtoken",token,{
              expires:new Date(Date.now()+258920000000),
              httpOnly:true
          });
      
      console.log(userLogin);
      if(!isMatch){ //[pasword check]
          res.status(400).json({error:"Invalid Credentials"});
      }
      else
      {
      const filename = "./logs/" + userLogin._id + ".log";
      //const data = "Hello, world!";

      if (fs.existsSync(filename)) {
        console.log(`${filename} already exists.`);
      } else {
        // Create new file and write data to it
        console.log(`${filename} created`);
      }

          res.json({message:"user Signin Successfully"});
      }
      } else{
          res.status(400).json({error:"Invalid Credentials"});
      }
      
      


  } catch (err){
      console.log(err);
  }
});
  




//Dropdown page
// router.get('/about',authenticate,(req,res)=>{
//     res.send(req.rootUser);
// });

module.exports=router;