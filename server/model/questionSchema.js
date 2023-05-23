const mongoose=require('mongoose');
const jwt=require("jsonwebtoken")
const bcrypt=require('bcryptjs');

const questionSchema =new mongoose.Schema({
    question:{
        type:String,
        
        required:true
    },
    tags: {
        type: String
    },
    answer: {
        type: String
    },
    level: {
        type: Number
    }
    


})

//Generating tokens here
// userSchema.methods.generateAuthToken=async function(){
//     try{
//         let token=jwt.sign({_id:this._id},process.env.SECRET_KEY);
//         this.tokens=this.tokens.concat({token:token})
//         await this.save();
//         return token;
//     }catch(err){
//         console.log(err)
//     }
// }

const Question = mongoose.model('QUESTION',questionSchema);

module.exports=Question;