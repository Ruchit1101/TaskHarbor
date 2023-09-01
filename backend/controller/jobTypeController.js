const JobType=require('../models/userModel');
const ErrorResponse=require('../utils/errorResponse');

//job type category
exports.createJobType=async(req, res, next)=>{
    try{
        const jobT= await JobType.create({
            jobTypeName:req.body.jobTypeName,
            user:req.user.id
        })
        res.status(201).json({
            success:true,
            jobT
        })
    }
    catch(error){
       next(error);
    }
}