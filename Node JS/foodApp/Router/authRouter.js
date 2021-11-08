const express = require("express");
const authRouter = express.Router();
const userModel = require("../models/userModel");


authRouter
.route("/signup")
.get(middleWare1,getSignUp,middleWare2)
.post(postSignUp);

authRouter
.route("/login")
.post(loginUser);


function getSignUp(req,res,next){


    console.log("getsignup function is called");
    //res.sendFile("public/index.html",{root : __dirname}); 
    next();
}


async function postSignUp(req,res){
   
    let dataObj = req.body; 
    let user = await userModel.create(dataObj);
    
    res.json({
        message : "user registered successfully",
        data : user
    });
    

}

function middleWare1(req,res,next){

    console.log("middleware1 encountered");
    next();  //getsignup will be called

}

function middleWare2(req,res,next){

    console.log("middlewar2 encountered");
  
     console.log("middleware 2 ended req/res cycle");
    
    res.sendFile("public/index.html",{root : __dirname}); 

}

async function loginUser(req,res){
    try{

    
        let data = req.body;
        let user = await userModel.findOne({email:data.email});
        if(user){

            if(user.password==data.password){
                res.cookie("isLoggedIn",true);
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

module.exports = authRouter;