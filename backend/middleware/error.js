//whenever there is an error in the backend we will get to know about the kind of error and its type.
const ErrorResponse=require("../utils/errorResponse");
const errorHandler=(err, req, res, next)=>{
  let error={...err};
  error.message = err.message;
  
  if(err.name === "CastError"){//cast-error generally occurs when there is a problem with data types casting, often when eg--> try to converting non-numericstring into a number
    const message = `Resource not found ${err.value}`;
    error = new ErrorResponse(message, 404);
  }
  //duplivate value- > 11000...
  if(err.code === 11000){
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400);
  }
  //validation error...
  if(err.name === "ValidationError"){
    const message = Object.value(err.errors).map(val=>' '+ val.message);
    error = new ErrorResponse(message, 400);
  }
  res.status(error.codeStatus || 500).json({
    success:false,
    error:error.message || "server error"
  })
 
}
module.exports = errorHandler;