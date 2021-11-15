const express = require("express");
const app = express();  //instance
const cookieParser = require("cookie-parser");    
app.use(express.json());  
app.use(cookieParser());    

app.listen(3000);

    const userRouter = require("./Router/userRouter");   //mini app
    const planRouter = require("./Router/planRouter"); 
    const reviewRouter = require("./Router/reviewRouter"); 
const bookingRouter = require("./Router/bookingRouter");

     

    app.use("/users",userRouter);         //base route //router to use
    app.use("/plans",planRouter);
    app.use("/reviews",reviewRouter);
    app.use("/booking",bookingRouter);

 

