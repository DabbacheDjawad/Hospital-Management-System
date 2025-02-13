
const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , "please provide a name for the patient"],
        maxlength : 30
    },

    phoneNumber : {
        type : Number,
        minlength : 8,
        maxlength : 20,
        required : [true , "please Provide a phone Number so we can call the patient"],
    },

    doctor : {
        type : mongoose.Schema.Types.ObjectId,
        required : [true , "please provide a name for the doctor"],
        ref : "Doctor",
    },

    appointments : [{
        type : mongoose.Schema.Types.ObjectId,
        required : false,
        ref : "Appointment",
    }],

    illness : {
        type : String,
        required : [true , "please provide a condition for the patient"],
    }

},{timestamps : true})

module.exports = mongoose.model("Patient" , patientSchema);