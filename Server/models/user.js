
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv")

const userSchema = new mongoose.Schema({

    name : {
        type : String,
        required : [true , "please Provide your name!"],

    },

    role : {
        type : String,
        enum : ["admin" , "doctor"],
        required : [true , "please Provide your Role!"],
    },

    email : {
        type : String,
        required : [true , "Please Provide Your Email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "please provide a valid email",
          ],
          unique : true
    },

    password : {
        type : String,
        required : [true , "Please provide a Password !!"],
        minlength : 6
    }
})

//hashing the password
userSchema.pre("save" , async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password , salt);
    next();
})

//Comparing the passwords
userSchema.methods.comparePasswords = async function(enteredPassword){
    const matched = await bcrypt.compare(enteredPassword , this.password);
    return matched;
}

//signing the JWT
userSchema.methods.createJWT =function(){
    return jwt.sign({name : this.name , role : this.role , userID : this._id} ,process.env.JWT_SECRET,{expiresIn : process.env.JWT_LIFETIME});
}//weak jwt secret


module.exports = mongoose.model("User" , userSchema)