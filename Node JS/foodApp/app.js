const express = require("express");

const app = express();  //instance
const mongoose = require("mongoose");

app.use(express.json());  

app.listen(3000);

let users = [
    {
        id : "1",
        name : "Anuj kaushik",
    },
    {
        id : "2",
        name : "Nishant Jain"
    },
    {
        id : "3",
        name : "Abhishek"
    }
];

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

function getUser(req,res) {
    res.send(users);

};

function postUser(req,res) {

    console.log(req.body);

    users = req.body;

    res.json({
        message : "data received successfully",
        user : req.body
    })

};

function updateUser(req,res){
    console.log(req.body);

    let dataToBeUpdated = req.body;
    for(key in dataToBeUpdated){
        users[key] = dataToBeUpdated[key]; 
    }

    res.json({
        message: "data updated successfully"

    })

};

function deleteUser(req,res)  {

    users = {};
    res.json({
        message : "data has been deleted"
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

function postSignUp(req,res){
    let obj = req.body;
    console.log("backend =>",obj);
    res.json({
        message : "user registered successfully",
        data : obj
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

const db_link = "mongodb+srv://admin:B6iHjfvHdcduaksq@anujkaushik.wywur.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(db_link)
.then(function(db){
    console.log("database connected");
}).catch(function(err){
    console.log(err);
});

const userSchema = mongoose.Schema({
    name: {
        type : String,
        required : true,

    },
    email: {
        type : String,
        required : true,
        unique : true
    },
    password: {
        type : String,
        required : true,
        min : 7

    },
    confirmPassword: {
        type : String,
        required : true,
        min : 7
        
    }
});

    // model =>

const userModel = mongoose.model("userModel",userSchema);

    (async function createUser(){
    let users = {
        name : "Anuj",
        email : "anujkaushik1512@gmail.com",
        password : "12345678",
        confirmPassword : "12345678"
    }
    let data = await userModel.create(users);
    console.log(data);

})();



