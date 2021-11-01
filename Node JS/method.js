const express = require("express");

const app = express();  //instance

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

    app.use("/users",userRouter);   
            //base route //router to use

    userRouter
    .route("/")
    .get(getUser)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser)

    userRouter
    .route("/:username")
    .get(getUserByID)
    
    

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



