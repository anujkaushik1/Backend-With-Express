const express = require("express");
const planRouter = express.Router();   //mini app
const {protectRoute, isAuthorised} = require("../controller/authController");
const {getPlan,getAllPlans,createPlan,updatePlan,deletePlan, top3Plans} = require("../controller/planController");



//will bring all plans =>
planRouter
.route("/allPlans")
.get(getAllPlans);

//top 3 plans =>
planRouter
.route("/top3")
.get(top3Plans);


//own plan =>  we have to be logged in first
planRouter.use(protectRoute)
planRouter
.route("/plan/:id")
.get(getPlan);

planRouter.use(isAuthorised["admin","restaurantowner"]);
planRouter      //admin or restaurant owner can only create update and delete the plans 
.route("/crudPlan")
.post(createPlan);

planRouter
.route('/crudPlan/:id')
.patch(updatePlan)
.delete(deletePlan)


