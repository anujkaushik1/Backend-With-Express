const authRouter = require("./authRouter");
const jwt = require("jsonwebtoken");
const JWT_KEY = "jhua7dyauiy8";

function protectRoute(req,res,next){

    if(req.cookies.isLoggedIn){
        let isVerified = jwt.verify(req.cookies.isLoggedIn,JWT_KEY);
        if(isVerified){
             next();
       }else{
           return res.json({
               message : "user not verified"
           })
       }
    }else{
        return res.send({
            message : "user failed to login "
        })
    }

}
module.exports = protectRoute;