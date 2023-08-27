const User = require("../models/userModel");
const ErrorResponse=require('../utils/errorResponse');


exports.signup=async(req, res, next)=>{
    const {email}=req.body;
    const userExist=await User.findOne({email});
    if(userExist){
        return next(new ErrorResponse("email already exist",400));
    }
    try{
        const user= await User.create(req.body);
        res.status(201).json({
            success:true,
            user
        })
    }
    catch(error){
        next(error);
    }
}

exports.signin=async(req, res, next)=>{
   
    try{
        const {email, password}=req.body;
//validation of credentials
    if(!email){
        return next(new ErrorResponse("please add an email",403));
    }
    if(!password){
        return next(new ErrorResponse("please add a password",403));
    }
    }
    
    catch(error){
        next(error);
    }
}
