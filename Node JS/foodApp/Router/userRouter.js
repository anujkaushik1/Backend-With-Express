const express = require("express");
const userRouter = express.Router();   //mini app
const {getUser,getAllUser,updateUser,deleteUser} = require("../controller/userController");
const { application } = require("express");
const{signup,login,isAuthorised,protectRoute}=require("../controller/authController");
 

//user options
userRouter.route("/:id")  //to update or delete specific user
.patch(updateUser)
.delete(deleteUser);

//profile page
userRouter.use(protectRoute);
userRouter
.route("/userprofile")
.get(getUser);

userRouter
.route("/signup")
.post(signup);

userRouter
.route("/login")
.post(login);


//admin specific
userRouter.use(isAuthorised(['admin']))
userRouter.route("")   // this work should be done by admin only
.get(getAllUser);

module.exports=userRouter;

