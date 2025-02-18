const Doctor = require('../models/doctorModel')
const {StatusCodes} = require("http-status-codes")
const {NotFound , BadRequest} = require('../errors/indexErros');
// get all Doctors
const getAllDoctors = async (req , res) =>{
    const doctors = await Doctor.find().sort("name");
    res.status(StatusCodes.OK).json({doctors , count : doctors.length});
}

// get single Doctor
const getDoctor = async(req , res) =>{
   
    const {id : doctorID} = req.params;
    const doctors = await Doctor.find()
    const doctor = await Doctor.findOne({_id : doctors[doctorID]});
    if(!doctor) throw new NotFound(`no doctor with the id ${doctorID}`);
    res.status(StatusCodes.OK).json({doctor}); 
}

// create Doctor
const createDoctor = async (req , res) =>{
    req.body.createdBy = req.user.userID;
    const doctor = await Doctor.create(req.body);
    res.status(StatusCodes.CREATED).json({doctor});
}

// Update Doctor
const UpdateDoctor = async (req , res) =>{
    const {name , specialty , workingDays} = req.body;
    const {id : doctorID} = req.params;
    if(!name || !specialty) throw new BadRequest("the fields 'name' and 'specialty' can not be left empty")
    const doctors = await Doctor.find();
    const doctor =await Doctor.findOneAndUpdate({_id : doctors[doctorID]} ,req.body, {new : true , runvalidators : true });
    if(!doctor) throw new NotFound(`no doctor with the id : ${doctorID}`);
    res.status(StatusCodes.OK).json({doctor});
}

// Delete Doctor
const deleteDoctor = async (req , res) =>{
    const {id : doctorID} = req.params;
    const doctors = await Doctor.find();
    const doctor =await Doctor.findOneAndDelete({_id : doctors[doctorID]});
    if(!doctor) throw new NotFound(`can not find doctor with id : ${doctorID}`);
    res.status(StatusCodes.OK).send();
}

module.exports = {
    getAllDoctors,
    getDoctor,
    createDoctor,
    UpdateDoctor,
    deleteDoctor
}