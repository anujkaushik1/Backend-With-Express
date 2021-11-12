const userModel = require("../models/userModel");


module.exports.getAllUser= async function getUserByID(req,res){
    try{
        let users = await userModel.find();
        if(users){
            res.json({
                message : "user retrived",
                data : users
            })
        }
    }catch(err){
        res.json({
            message : err.message
        })
    }
}

module.exports.getUser=async function getUser(req,res) {

    let id = req.id;

    let user = await userModel.findById(id);
    
    if(user){
        return res.json(user);
    }else{
        return res.json({
            message : "user not found"
        });
    }

};

// module.exports.postUser=function postUser(req,res) {

//    // console.log(req.body);

//     users = req.body;

//     res.json({
//         message : "data received successfully",
//         user : req.body
//     })

// };

module.exports.updateUser=async function updateUser(req,res){
    try{
        console.log(req.body);
        let id = req.params.id;
        let user = await userModel.findById(id);
        let dataToBeUpdated = req.body;

        if(user){
            const keys = [];
            for(let key in dataToBeUpdated){
                keys.push(key);
            }

            for(let i=0;i<keys.length;i++){
                user[keys[i]]=dataToBeUpdated[keys[i]];
            }

            const updatedData = await user.save();

            res.json({
                message: "data updated successfully",
                data : user
        
            })
        }else{
            res.json({
                message: "data not found",
                data : user
        
            })
        }
    }
    catch(err){
        res.json({
            message : err.message
        })
    }    
   

};

module.exports.deleteUser=async function deleteUser(req,res)  {
    try{
        let id = req.params.id;
        let user = await userModel.findByIdAndDelete(id);

        if(!user){
            res.json({
                message : "user not found"
            })
        }
        
        res.json({
            message : "data has been deleted",
            data : user
        });
    }
    catch(err){
        res.json({
            message : err.message
        })
    }  
};

 