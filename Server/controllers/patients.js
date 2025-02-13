
const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel")
const Patient = require("../models/patientModel");
const {NotFound, BadRequest} = require("../errors/indexErros");
const {StatusCodes} = require("http-status-codes");
// get all patients
const getAllPatients = async (req , res) =>{
    const patients =await Patient.find().sort("creatAt");
    res.status(StatusCodes.OK).json({patients , count : patients.length});
}

// get single Patient
const getPatient = async (req , res) =>{
    const {id : patientID} = req.params
    const patients =await Patient.find();
    const patient =await Patient.findOne({_id : patients[patientID]});
    if(!patient) throw new NotFound(`there is no patient with the id : ${patientID}`);
    res.status(StatusCodes.OK).json({patient});
}

// create Patient
const createPatient = async (req , res) =>{
    const doctor = await Doctor.findById(req.body.doctor);
    if(!doctor) throw new NotFound("no appointed doctor for the this patient , please try a valid doctor id");
    const appointment = await Appointment.findById(req.body.Appointment);

    const patient = await Patient.create(req.body);
    res.status(StatusCodes.CREATED).json({patient});
}

// Update Patient
const UpdatePatient = async (req , res) =>{
    const {name , phoneNumber , doctor} = req.body;
    const {id : patientID} = req.params;
    if(!name || !phoneNumber || !doctor) throw new BadRequest("the fields 'name' , 'phoneNumber' ,'doctor' can not be left empty")
    const patients = await Patient.find();
    const patient = await Patient.findOneAndUpdate({_id : patients[patientID]} , req.body , {new : true , runValidators : true});
    if(!patient) throw new NotFound(`no patient with the id : ${patientID}`);
    res.status(StatusCodes.OK).json({patient});
}

// Delete Patient
const deletePatient = async (req , res) =>{
    const {id : patientID} = req.params;
    const patients = await Patient.find();
    const patient = await Patient.findOneAndDelete({_id : patients[patientID]} , req.body , {new : true , runValidators : true});
    if(!patient) throw new NotFound(`no patient with the id : ${patientID}`);
    res.status(StatusCodes.OK).send();
}

module.exports = {
    getAllPatients,
    getPatient,
    createPatient,
    UpdatePatient,
    deletePatient
}