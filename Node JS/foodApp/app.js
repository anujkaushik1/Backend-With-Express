const express = require("express");
const app = express();  //instance
const cookieParser = require("cookie-parser");    


app.use(express.json());  
app.use(cookieParser());    

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

    const userRouter = require("./Router/userRouter");   //mini app
    const authRouter = require("./Router/authRouter"); 

    app.use("/users",userRouter);   
            //base route //router to use


    //Queries => 


        //Parameters =>









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



