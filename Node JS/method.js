const express = require("express");

const app = express();  //instance

app.use(express.json());  

app.listen(3000);

let users = {};

app.get("/users",(req,res) => {

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