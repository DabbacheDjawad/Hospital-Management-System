const User = require("../models/user");
const {StatusCodes} = require("http-status-codes");
const {BadRequest , UnAuthenticated} = require("../errors/indexErros")
//register
const register = async(req , res) =>{
    const user = await User.create({...req.body});
    const token =user.createJWT();
    res.status(StatusCodes.CREATED).json({user : {name : user.name , role : user.role} , token});
}


//Login
const login = async (req , res) =>{
    const {email , password} = req.body;
    if(!email || !password) throw new BadRequest("please Provide Email and Password!!");

    const user = await User.findOne({email});
    if(!user) throw new UnAuthenticated("Invalid Credentials");

    const isMatched = await user.comparePasswords(password);
    if(!isMatched) throw new UnAuthenticated("wrong email or password");

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({user : {name : user.name , role : user.role} , token})
}

module.exports = {
    register,
    login
};