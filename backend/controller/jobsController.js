const Job=require('../models/jobModel');
const ErrorResponse=require('../utils/errorResponse');

//job type category
exports.createJob=async(req, res, next)=>{
    try{
        const job= await Job.create({
            title:req.body.title,
            description:req.body.description,
            salary:req.body.salary,
            location:req.body.location,
            JobType:req.body.JobType,
            user:req.user.id
        });
        res.status(201).json({
            success:true,
            job
        })
    }
    catch(error){
       next(error);
    }
}
//All jos category
exports.allJobsType=async(req, res, next)=>{
    try{
        const jobT= await JobType.find();
        res.status(200).json({
            success:true,
            jobT
        })
    }
    catch(error){
       next(error);
    }
}
exports.singleJob=async(req, res, next)=>{
    try{
        const job= await Job.findById(req.params.id);
        res.status(200).json({
            success:true,
            job
        })
    }
    catch(error){
       next(error);
    }
}
exports.updateJob=async(req, res, next)=>{
    try{
        const job= await Job.findByIdAndUpdate(req.params.jod_id, req.body,{new:true}).populate('JobType','jobTypeName').populate('user', 'firstName lastName');
        res.status(201).json({
            success:true,
            job
        })
    }
    catch(error){
       next(error);
    }
}
exports.showJobs=async(req, res,next)=>{
    const pageSize=5;
    const page=Number(req.query.pageNumber) || 1;
    const count=await Job.find({}).estimateDocumentCount();
    try{
        const jobs=await Job.find()
        res.status(200).json({
            success:true,
            jobs,
            page,
            pages:Math.ceil(count /pageSize),
            count
        })
    }catch(error)
    {
        next(error);
    }
}