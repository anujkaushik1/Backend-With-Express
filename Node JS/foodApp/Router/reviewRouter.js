const express = require("express");
const reviewRouter = express.Router();   //mini app
const {protectRoute, isAuthorised} = require("../controller/authController");

reviewRouter
.route("/reviews/")
.get(getAllReviews);


reviewRouter
.route("/top3reviews")
.get(getTop3Reviews);


reviewRouter
.route("/reviews/:id")
.get(getPlanReviews);

planRouter.use(isAuthorised(['admin','restaurantowner']));
planRouter
.route('/crudPlan')
.post(createPlan);