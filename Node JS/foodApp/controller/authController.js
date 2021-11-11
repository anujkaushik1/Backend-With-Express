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
        if(roles.include(req.role)==true){
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


