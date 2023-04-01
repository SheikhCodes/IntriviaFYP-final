const dotenv=require("dotenv");
const mongoose=require('mongoose');
const express =require('express');
const cors= require('cors');
const app= express();
app.use(cors())
dotenv.config({path: './config.env'})
require('./DB/conn');

app.use(express.json());
// const User=require('./model/userSchema');
// const Question=require('./model/questionSchema');
app.use(require('./router/auth'));
const PORT =process.env.PORT;

//Middleware
const middleware=(req,res,next)=>{
    console.log('Hello my Middleware');
    next();
}
app.get('/',(req,res)=>{
    res.send('Hello world from the server');
});



app.get('/about',middleware,(req,res)=>{
    res.send('Hello world from the server');
});

app.get('/contact',middleware,(req,res)=>{
    res.send('Hello world from the server');
});


//console.log('subscribe')
app.listen(PORT,()=>{
    console.log('server is running at port no', {PORT});
})
