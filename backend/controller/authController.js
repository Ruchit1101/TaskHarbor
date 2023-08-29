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
    const user = await User.findOne({emai});
    if(!user){
        return next(new ErrorResponse("Invalid credentials", 400));
    }
        //check password
    const isMatched =await user.comparePassword(password);
    if(!isMatched){
        return next(new ErrorResponse("Invalid credentials", 400));
    }
    sendTokenResponse(user, 200, res);

    }
    catch(error){
        next(error);
    }
}

const sendTokenResponse = async(user, codeStatus, res)=>{
    const token= await user.getJwtToken();
    res.status(codeStatus).cookie('token', token, {maxAge:10*60*1000, httpOnly:true}).json({success:true, token, user})
}

//logout function
exports.logout =(req, res,next)=>{
    res.clearCookie('token');
    res.status(200).jso({
        success:true,
        message:"Logged Out"
    })
}