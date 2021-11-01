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

    //Queries => 

app.get("/users",(req,res) => {
    console.log(req.query)
    res.send(users);

});

app.post("/users",(req,res) => {

        console.log(req.body);

        users = req.body;

        res.json({
            message : "data received successfully",
            user : req.body
        })

});

app.patch("/users",(req,res) => {
    console.log(req.body);

    let dataToBeUpdated = req.body;
    for(key in dataToBeUpdated){
        users[key] = dataToBeUpdated[key]; 
    }

    res.json({
        message: "data updated successfully"

    })

});

app.delete("/users",(req,res) => {

    users = {};
    res.json({
        message : "data has been deleted"
    });

});


        //Parameters =>
app.get("/users/:username",(req,res) =>{

    res.send("user id received ");
    console.log(req.params);   
    console.log(req.params.username); 

});

