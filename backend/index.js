const express = require("express");
const app=express();
const mongoose = require("mongoose");  // database 
const morgan=require("morgan");
const bodyParser=require("body-parser"); //to extract the data incoming from http server
require("dotenv").config();   //sensitive data
var cors=require("cors");   //to request the backend
const cookieParser = require("cookie-parser");
const errorHandler=require("./middleware/error")
//database connection
mongoose.connect(process.env.REACT_APP_DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(()=>console.log("DB CONNECTED"))
.catch((err)=>console.log(err))

app.use(morgan('dev'));
app.use(bodyParser.json({limit:"5mb"}));
app.use(bodyParser.urlencoded({
    limit:"5mb",
    extended:true
}));
app.use(cookieParser());
app.use(cors());

//error middleware
app.use(errorHandler);



//port---->by default value
const port = process.env.REACT_APP_PORT || 9000
// console.log(>port);
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})