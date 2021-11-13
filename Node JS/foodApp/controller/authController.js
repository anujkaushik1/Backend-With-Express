const express = require("express");
const authRouter = express.Router();
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const JWT_KEY = "jhua7dyauiy8";

//signup user =>
module.exports.signup=async function signup(req,res){
   
    try{
        let dataObj = req.body; 
        let user = await userModel.create(dataObj);

        if(user){
            return res.json({
                message : "user registered successfully",
                data : user
            }); 
        }else{
            return res.json({
                message : "error while signing up",
                data : user
            }); 
        }
        
       

    }catch(err){
        console.log(err.message);
        return res.json({
            message : err.message
        })
    }   

}


//login user =>
module.exports.login=async function loginUser(req,res){
    try{

    
        let data = req.body;
        let user = await userModel.findOne({email:data.email});
        if(user){

            if(user.password==data.password){
                let uid = user['_id']; //unique id
                let jwt_token = jwt.sign({payload:uid},JWT_KEY);
                res.cookie("isLoggedIn",jwt_token);
                    return res.json({
                        message : "user logged in successfully",
                        userDetails: data
                    })
            }else{
                return res.json({
                    message : "password is incorrect"
                })
            }

        }else{
            return res.json({
                message : "user not found"
            })
        }
}
catch(err){
    return res.json({
        message:err.message
    });
}
}


//isAuthorised => to chedk user's role admin ,user or restaurant owner

module.exports.isAuthorised=function isAuthorised(roles){

    return function(req,res,next){
        if(roles.includes(req.role)==true){
            next();
        }else{
            return res.json({
                message : "operation not allowed"
            })
        }
    }

}

//protect route =>
module.exports.protectRoute=async function protectRoute(req,res,next){
  
    try{
            let token;

            if(req.cookies.isLoggedIn){
                token = req.cookies.isLoggedIn;
                let payload = jwt.verify(token,JWT_KEY);

                if(payload){
                    const user = await userModel.findById(payload.payload);
                    req.role = user.role;
                    req.id = user.id;

                    next();
                }

            else{
                const client = req.get("User-Agent");

                if(client.includes("Mozilla")){
                    return res.redirect("/login");
                }

                return res.json({
                    message : "user not verified"
                })
            }
        }
    }catch(err){
        return res.send({
            message : err.message
        })
    }

}


module.exports.forgetPassowrd=async function forgetPassowrd(req,res){
    let {email} = req.body;
    try{
        const user = await userModel.findOne({email:email});
        if(user){
           const resetToken = user.createResetToken();
           const resetPasswordLink = `${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`;

        }else{
            return res.json({
                message : "Please signup"
            })
        }
    }
    catch(err){
        return res.json({
            message: err.message
        })
    }
}

module.exports.resetPassword = async function resetPassword(req, res) {
    try {
      const token = req.parmas.token;
      let { password, confirmPassword } = req.body;
      const user = await userModel.findOne({ resetToken: token });
      if (user) {
        //resetPasswordHandler will update user's password in db
        user.resetPasswordHandler(password, confirmPassword);
        await user.save();
        res.json({
          message: "password changed succesfully, please login again",
        });
      } else {
        res.json({
          message: "user not found",
        });
      }
    } catch (err) {
      res.json({
        message: err.message,
      });
    }
  }; 

 module.exports.logout = function logout(req,res){
        res.cookie("isLoggedIn"," ",{maxAge:1});
        res.json({
            message : "user logged out successfully"
        });

  }


