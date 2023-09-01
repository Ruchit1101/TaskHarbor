const mongoose = require("mongoose");
const {ObjectId}=mongoose.Schema;
const jobTypeSchema = new mongoose.Schema({
    jobTypeName:{
        type:String,
        trim:true,
        required:[true, 'Job Type'],
        minlength:3
    },
    //linking jobModel to userModel
    user:{
        type:ObjectId,
        ref:"User",
        required:true
    },
}, {timestamps:true})

module.exports = mongoose.model("JobType", jobTypeSchema);