
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    patient : {
        type : mongoose.Schema.Types.ObjectId,
        required : [true , "please provide a patient"],
    },

    doctor : {
        type : mongoose.Schema.Types.ObjectId,
        required : false,
        ref : "Doctor",
    },

    date : {
        type : Date,
        required : [true , "Please provide a Date for the Appointment"],
        default : `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`
    },

    illness : {
        type : String,
        required : [false , "please provide a condition for the patient"],
    },

    status : {
        type : String,
        required : [true , "please provide an appointment Status"],
        enum : ["completed" , "scheduled" , "cancelled"],
        default : "scheduled"
    }
} , 
{timestamps : true})

module.exports = mongoose.model("Appointment" , appointmentSchema);