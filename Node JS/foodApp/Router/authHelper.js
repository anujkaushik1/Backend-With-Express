const authRouter = require("./authRouter");

function protectRoute(req,res,next){

    if(req.cookies.isLoggedIn){
      next();
    }else{
        return res.send({
            message : "user failed to login "
        })
    }

}
module.exports = protectRoute;