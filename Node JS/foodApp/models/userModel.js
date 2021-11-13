const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");


const db_link = "mongodb+srv://admin:B6iHjfvHdcduaksq@anujkaushik.wywur.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(db_link)
.then(function(db){
    console.log("database connected");
}).catch(function(err){
    console.log(err);
});



const userSchema = mongoose.Schema({
    name: {
        type : String,
        required : true,

    },
    email: {
        type : String,
        required : true,
        unique : true,
        validate : function(){
            return emailValidator.validate(this.email);
        }

    },
    password: {
        type : String,
        required : true,
        min : 7

    },
    confirmPassword: {
        type : String,
        required : true,
        min : 7,
        validate : function(){  
            return this.confirmPassword == this.password;    
        }
        
    },
    role: {
        type : String,
        enum : ['admin','user','restaurantowner','deliveryboy'],    //enum is used to create the array of the string
        default : 'user'
    },
    profileImage: {
         type: String,
         default:"img/users/default.jpeg"
    },
    resetToken : String
});

    userSchema.methods.createResetToken = function(){
        const resetToken = crypto.randomBytes(32).toString("hex");
        this.resetToken = resetToken;
        return resetToken;
    }

    userSchema.methods.resetPasswordHandler = function(password,confirmPassword){
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.resetToken = undefined;   
    }

    // model =>

const userModel = mongoose.model("userModel",userSchema);
module.exports=userModel;
