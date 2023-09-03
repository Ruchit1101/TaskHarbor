const express = require("express");
const { isAuthenticated } = require("../middleware/auth");
const { createJobType, allJobsType } = require("../controller/jobtypeController");
const router = express.Router();

router.post('/type/create',isAuthenticated, createJobType)

router.get('/type/jobs',allJobsType);

module.exports=router;

