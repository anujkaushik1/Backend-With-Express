const express = require("express");

const app = express();  //instance

const userModel = require("./models/userModel");

app.use(express.json());  

app.listen(3000);

// let users = [
//     {
//         id : "1",
//         name : "Anuj kaushik",
//     },
//     {
//         id : "2",
//         name : "Nishant Jain"
//     },
//     {
//         id : "3",
//         name : "Abhishek"
//     }
// ];

    const userRouter = express.Router();   //mini app
    const authRouter = express.Router();

    app.use("/users",userRouter);   
            //base route //router to use
    app.use("/auth",authRouter); 


    userRouter
    .route("/")
    .get(getUser)   //path specific middleware
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser)

    userRouter
    .route("/:username")
    .get(getUserByID)

    authRouter
    .route("/signup")
    .get(middleWare1,getSignUp,middleWare2)
    .post(postSignUp);
    
    

    //Queries => 


        //Parameters =>
app.get("/users/:username",(req,res) =>{

    res.send("user id received ");
    console.log(req.params);   
    console.log(req.params.username); 

});

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

    let user = await userModel.findOneAndDelete({email : "nishantjain123"});

    
    res.json({
        message : "data has been deleted",
        data : user
    });

};

function getUserByID(req,res){

    res.send("user id received ");
    console.log(req.params);   
    console.log(req.params.username); 

}


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


//     (async function createUser(){
//     let users = {
//         name : "Anuj",
//         email : "anujkaushik1512@gmail.com",
//         password : "12345678",
//         confirmPassword : "12345678"
//     }
//     let data = await userModel.create(users);
//     console.log(data);

// })();



