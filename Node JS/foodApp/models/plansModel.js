const mongoose = require("mongoose");
const db_link = "mongodb+srv://admin:B6iHjfvHdcduaksq@anujkaushik.wywur.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(db_link)
.then(function(db){
    console.log("plan database connected");
}).catch(function(err){
    console.log(err);
});


const planSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true,
        maxlength : [20,"plan name should not exceed than 20 characters"]    //setting custom error message(if length is more than 20 error will show plan name...)
    },
    duration : {
        type : Number,
        required : true
    },
    price : {
        type : Number,
        required : [true,"price not entered"]
    },
    ratingsAverage : {
        type : Number,
    },
    discount : {
        type : Number,
        validate : [function(){
            return this.discount<100;
        },"discount should not exceed price "]
    }

});

const planModel = mongoose.model("planModel",planSchema);

(async function createPlan(){
    let planObj = {
        name : "SuperFood3",
        duration : 20,
        price : 2000,
        ratingsAverage : 3,
        discount : 10
    }

    let data = await planModel.create(planObj);
    console.log(data);

})();


module.exports = planModel;