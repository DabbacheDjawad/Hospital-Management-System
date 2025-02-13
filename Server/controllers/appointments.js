
const Doctor = require("../models/doctorModel");
const Patient = require("../models/patientModel");
const Appointment = require("../models/appointmentModel");
const {StatusCodes} = require("http-status-codes");
const {BadRequest , NotFound} = require("../errors/indexErros")

// get all appointments
const getAllAppointments = async (req , res) =>{
    const appointments = await Appointment.find().sort("date");
    
    res.status(StatusCodes.OK).json({appointments , count : appointments.length});
}

// get single appointment
const getAppointment = async (req , res) =>{
    const {id : appointmentID} = req.params;
    const appointments = await Appointment.find();
    const appointment = await Appointment.findOne({_id : appointments[appointmentID]});
    if(!appointment) throw new NotFound(`no Appointment with the id : ${appointmentID}`);
    res.status(StatusCodes.OK).json({appointment});
}

// create appointment
const createappointment = async (req , res) =>{
    
    const patient = await Patient.findById(req.body.patient);
    if(!patient) throw new NotFound(`no patient with the id : ${req.body.patient}`);

    req.body.doctor = patient.doctor;
    req.body.illness = patient.illness;

    const appointment = await Appointment.create(req.body);
    res.status(StatusCodes.CREATED).json({appointment});
}

// Update appointment
const UpdateAppointment = async (req , res) =>{
    const {status , date} = req.body;
    const {id : appointmentID} = req.params;

    if(!status || !date) throw new BadRequest("the fields 'status' and 'date' can not be left empty")

    const appointments = await Appointment.find();
    const appointment = await Appointment.findOneAndUpdate(
        {_id : appointments[appointmentID]} , req.body , {new : true , runValidators : true}
    );

    if(!appointment) throw new NotFound(`no Appointment with the id : ${appointmentID}`);
    res.status(StatusCodes.OK).json({appointment});
}

// Delete appointments
const deleteAppointment = async (req , res) =>{
    const {id : appointmentID} = req.params;
    const appointments = await Appointment.find();
    const appointment = await Appointment.findOneAndDelete({_id : appointments[appointmentID]});
    res.status(StatusCodes.OK).send();
}

module.exports = {
    getAllAppointments,
    getAppointment,
    createappointment,
    UpdateAppointment,
    deleteAppointment
}