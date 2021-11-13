const express = require("express");
const userRouter = express.Router();   //mini app
const {getUser,getAllUser,updateUser,deleteUser} = require("../controller/userController");
// const { application } = require("express");
const{signup,login,isAuthorised,protectRoute,forgetPassowrd,resetPassword,logout}=require("../controller/authController");
 

//user options
userRouter.route("/:id")  //to update or delete specific user
.patch(updateUser)
.delete(deleteUser);


userRouter
.route("/signup")
.post(signup);

userRouter
.route("/login")
.post(login);

userRouter
.route("/forgetpassword")
.post(forgetPassowrd);


userRouter
.route("/resetpassword/:token")
.post(resetPassword);


//profile page
userRouter.use(protectRoute);
userRouter
.route("/userprofile")
.get(getUser);

//user logout

userRouter
.route("/logout")
.get(logout);

//admin specific
userRouter.use(isAuthorised(['admin']))
userRouter.route("")   // this work should be done by admin only
.get(getAllUser);


module.exports=userRouter;

