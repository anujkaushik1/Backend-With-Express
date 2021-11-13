
const planModel = require("../models/plansModel");

module.exports.getAllPlans = async function getAllPlans(req,res){
    try{

        let plans = await planModel.find();
        if(plans){
            return res.json({
                message : "all plans received",
                data : plans
            });
        }else{
            return res.json({
                message : "plans not found"
            })
        }
    }catch(err){
        return res.json({
            message : err.message
        })
    }
}

module.exports.getPlans = async function getPlans(req,res){
    try{
        let id = req.params.id;
        let plan = await planModel.findById(id);
        if(plan){
            return res.json({
                message : "plans received",
                data : plan
            });
        }else{
            return res.json({
                message : "plan not found"
            })
        }
    }catch(err){
        return res.json({
            message : err.message
        })
    }
}

module.exports.createPlan = async function createPlan(req,res){
    try{
        let planData = req.body;   //admin will send the data in the requet
        let createdPlan = await planModel.create(planData);
        
        if(createdPlan){
            return res.json({
                message : "plan created successfully",
                data : createdPlan
            })
        }
    }catch(err){
        return res.json({
            message : err.message
        })
    }
}

module.exports.deletePlan = async function createPlan(req,res){
    try{
        let id = req.params.id;   //admin will send the data in the requet
        let deletedPlan = await planModel.findByIdAndDelete(id);
        
        if(deletedPlan){
            return res.json({
                message : "plan deleted successfully",
                data : deletedPlan
            })
        }
    }catch(err){
        return res.json({
            message : err.message
        })
    }
}

module.exports.updatePlan = async function updatePlan(req,res){
    try{
        let id = req.params.id;
        let dataToBeUpdated = req.body;
        let keys = [];
        for(let key in dataToBeUpdated){
            keys.push(key);
        }

        let plan = await planModel.findById(id);
        
        for(let i=0;i<keys.length;i++){
            plan[keys[i]]= dataToBeUpdated[keys[i]];
        }

        await plan.save();
        res.json({
            message : "data updated successfully",
            data : plan    
        })

    }catch(err){
        return res.json({
            message : err.message
        })
    }

}


//get top 3 plans =>
module.exports.top3Plans = async function top3Plans(req,res){
    try{
        const plans = await planModel.find().sort({   //will bring the all the  data in descending order
            ratingsAverage : -1
        }).limit(3);

        return res.json({
            message : "top 3 plans received",
            data : plans
        })

    }catch(err){
        return res.json({
            message : err.message
        })
    }
}
