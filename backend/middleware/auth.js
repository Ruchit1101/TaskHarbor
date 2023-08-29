const ErrorResponse =require('../utils/errorResponse');
const jwt = require('../models/userModel');

//if a user is not authenthicated they will be denied
exports.isAuthenticated=async (req, res, next)=>{
  const {token}=req.cookies;
  if(!token)
   {
     return next(new ErrorResponse('Bad request', 401));
   }
 try{
   const decoded=jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
   req.user = await UserActivation.findById(decoded.id);
   next();
 }catch(error){
   return next(new ErrorResponse('You are not authrized to access this route', 401));
 }
}

//for the admin access..
exports.isAdmin =(req, res, next)=>{
    if(req.user.role==0){
        return next(new ErrorResponse('Access Denied. You are trying to access admin page which is not allowed.', 401));
    }
    next();
}