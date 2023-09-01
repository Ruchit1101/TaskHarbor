const mongoose = require("mongoose");
const {ObjectId}=mongoose.Schema;
const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:[true, 'field cannot be empty'],
        minlength:3
    },
    decription:{
        type:String,
        trim:true,
        required:[true, 'Description is Required.'],
        minlength:3
    },
    location:{
        type:String,
    },
    available:{
        type:Boolean,
        default:true
    },
    jobType:{
        type:ObjectId,
        ref:"JobType",
        required:true
    },
    //linking jobModel to userModel
    user:{
        type:ObjectId,
        ref:"User",
        required:true
    },
}, {timestamps:true})

module.exports = mongoose.model("Job", jobSchema);