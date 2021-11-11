const express = require("express");
const userRouter = express.Router();   //mini app
const protectRoute = require("./authHelper");
const {getUser,getAllUser,updateUser,deleteUser} = require("../controller/userController");
const { application } = require("express");
 

//user options
userRouter.route("/:id")  //to update or delete specific user
.patch(updateUser)
.delete(deleteUser);

//profile page
app.use(protectRoute);
userRouter
.route("/userprofile")
.get(getUser);


//admin specific
app.use(isAuthorise['admin'])
userRouter.route("")   // this work should be done by admin only
.get(getAllUser);

module.exports=userRouter;

