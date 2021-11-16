const express = require("express");
const userRouter = express.Router();   //mini app
const {getUser,getAllUser,updateUser,deleteUser,updateProfileImage} = require("../controller/userController");
// const { application } = require("express");
const{signup,login,isAuthorised,protectRoute,forgetPassowrd,resetPassword,logout}=require("../controller/authController");
const multer = require("multer");

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


const multerStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public/images')
    },
    filename:function(req,file,cb){
        cb(null,`user-${Date.now()}.jpeg`)
    }
});

const filter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true)
    } else {
      cb(new Error("Not an Image! Please upload an image"), false)
    }
  }

const upload = multer({
    storage: multerStorage,
    fileFilter: filter
  });

  userRouter.post("/ProfileImage", upload.single('photo') ,updateProfileImage);
  //get request
  userRouter.get('/ProfileImage',(req,res)=>{
      res.sendFile("C:/Users/ACER/Documents/Anuj/Backend Node JS/Node JS/foodApp/multer.html");
  });

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

