const express = require("express");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const { createJob, singleJob, updateJob } = require("../controller/jobsController");
const router = express.Router();

router.post('/job/create',isAuthenticated,isAdmin, createJob)
//api/job/id
router.get('/job/:id', singleJob);
router.put('/job/update/:job_id',isAuthenticated,isAdmin, updateJob);


module.exports=router;

