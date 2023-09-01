const express = require("express");
const { isAuthenticated } = require("../middleware/auth");
const { createJobType } = require("../controller/jobtypeController");
const router = express.Router();

router.post('/type/create',isAuthenticated, createJobType)



module.exports=router;

