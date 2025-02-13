
const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , "please provide the doctor's name"],
    },

    specialty : {
        type : String,
        required : [true , "please provide the doctor's specialty"]
    },

    workingDays : {
        type : [String],
        required : false,
        default : ["sunday" , "monday" , "tuesday" , "wednesday" , "thursday"]
    }
})

module.exports = mongoose.model("Doctor" , doctorSchema);