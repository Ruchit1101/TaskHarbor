const express = require("express");
const { allUsers } = require("../controller/userController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const router = express.Router();

//user routes



router.get('/me', isAuthenticated, isAdmin , allUsers);
module.exports=router;

//21:55 L05
