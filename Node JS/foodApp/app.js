const express = require("express");
const app = express();  //instance
const cookieParser = require("cookie-parser");    
app.use(express.json());  
app.use(cookieParser());    

app.listen(3000);

    const userRouter = require("./Router/userRouter");   //mini app
    const authRouter = require("./Router/authRouter"); 

    app.use("/users",userRouter);         //base route //router to use


    const planModel = require("./models/plansModel");   // variable name should be same as the fuction name which we have exported like (const planModel = mongoose.model("planModel",planSchema);) 

       

