const express = require("express");
const planRouter = express.Router();   //mini app
const {protectRoute, isAuthorised} = require("../controller/authController");


//will bring all plans =>
planRouter
.route("/allPlans")
.get(getAllPlans);

//own plan =>  we have to be logged in first
planRouter.use(protectRoute)
planRouter
.route("/plan/:id")
.get(getPlan);

planRouter.use(isAuthorised["admin","restaurantowner"]);
planRouter      //admin or restaurant owner can only create update and delete the plans 
.route("/crudPlan")
.post(createPlan)
.patch(updatePlan)
.delete(deletePlan);



//top 3 plans =>
