const express = require("express");
const { allUsers, singleUser, editUser, deleteUser } = require("../controller/userController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const router = express.Router();

//user routes



router.get('/allusers', isAuthenticated, isAdmin , allUsers);
router.get('/user/:id', isAuthenticated, singleUser);
router.put('/user/edit/:id', isAuthenticated, editUser);
router.delete('/admin/user/delete/:id', isAuthenticated, isAdmin, deleteUser);

module.exports=router;

