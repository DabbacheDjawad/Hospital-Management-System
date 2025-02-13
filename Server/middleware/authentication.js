const {UnAuthenticated} = require("../errors/indexErros")
const jwt = require("jsonwebtoken");

const authMiddleware = (req , res , next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")) throw new UnAuthenticated("Authentication Invalid");
    
    const token = authHeader.split(" ")[1];

    try{
        const payload = jwt.verify(token , process.env.JWT_SECRET);
        req.user = {userID : payload.userID , name : payload.name , role : payload.role};
        next();
    }catch(err){
        throw new UnAuthenticated("Authentication Invalid")
    }
}

module.exports = authMiddleware;