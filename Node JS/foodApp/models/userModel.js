const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");


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
        
    }
});

    // userSchema.pre('save',function(){
    //     console.log("Before saving in database",this);
    // });

    // userSchema.post('save',function(doc){    //data that is saved in database is stored in doc
    //     console.log("After saving in database",doc);
    // });

    // userSchema.pre("save",function(){
    //     this.confirmPassword = undefined;
    // });

    userSchema.pre("save",async function(){
        let salt = await bcrypt.genSalt();
        let hashedString = await bcrypt.hash(this.password,salt);
        this.password = hashedString;
        console.log(hashedString);
    });
    

    // model =>

const userModel = mongoose.model("userModel",userSchema);
module.exports=userModel;
