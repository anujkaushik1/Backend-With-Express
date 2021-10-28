const express = require("express");

const app = express();  //instance

app.get("/",function(req,res){
  res.sendFile("C:/Users/ACER/Documents/Anuj/Backend Node JS/Node JS/views/index.html")
});

app.get("/about",function(req,res){
   res.sendFile("C:/Users/ACER/Documents/Anuj/Backend Node JS/Node JS/views/about.html");   
});

    //Redirects =>

    app.get("/about-us",(req,res) => {
        res.redirect("/about");
    });

    //404 page =>

    app.use((req,res) => {  
        res.status(404).sendFile("./views/404.html",{root:__dirname});
    })


app.listen(3000);