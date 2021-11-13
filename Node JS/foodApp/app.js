const express = require("express");
const app = express();  //instance
const cookieParser = require("cookie-parser");    
app.use(express.json());  
app.use(cookieParser());    

app.listen(3000);

    const userRouter = require("./Router/userRouter");   //mini app
    const planRouter = require("./Router/planRouter"); 

    app.use("/users",userRouter);         //base route //router to use
    app.use("/plans",planRouter);

 

