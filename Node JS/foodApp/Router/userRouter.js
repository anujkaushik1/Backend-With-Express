const express = require("express");
const userModel = require("../models/userModel");
const userRouter = express.Router();   //mini app
const protectRoute = require("./authHelper");
 
userRouter
.route("/")
.get(protectRoute,getUser)   //path specific middleware
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

userRouter
.route("/getcookies")
.get(getCookies);

userRouter
.route("/setcookies")
.get(setCookies);

userRouter
.route("/:username")
.get(getUserByID);

function getUserByID(req,res){

    res.send("user id received ");
    console.log(req.params);   
    console.log(req.params.username); 

}

async function getUser(req,res) {

    let allUser = await userModel.find();
    res.json({
        message : "List of all users",
        data : allUser
    });

};

function postUser(req,res) {

   // console.log(req.body);

    users = req.body;

    res.json({
        message : "data received successfully",
        user : req.body
    })

};

async function updateUser(req,res){
    console.log(req.body);

    let dataToBeUpdated = req.body;
    let user = await userModel.findOneAndUpdate({email : "nishantjain123"},dataToBeUpdated);

    res.json({
        message: "data updated successfully",
        data : user

    })

};

async function deleteUser(req,res)  {

    let user = await userModel.findOneAndDelete({email : "nishantjain421"});

    
    res.json({
        message : "data has been deleted",
        data : user
    });

};


function getCookies(req,res){
    let cookies = req.cookies;
    console.log(cookies);
    res.send("cookies received");
}

function setCookies(req,res){
    res.cookie("isLoggedIn",false,{maxAge:1000*60*60*24,secure:true,httpOnly:true});
    res.send("Cokkies has been set");

}


module.exports=userRouter;

