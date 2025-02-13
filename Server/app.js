require('dotenv').config();
require("express-async-errors");

//extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

//express
const express = require("express");
const app = express();

//Connect DB
const connectDB = require("./db/connect");

//auth Middleware
const authenticationMiddleware = require("./middleware/authentication");

//Routers
const appointmentsRouter = require("./routes/appointments");
const patientsRouter = require("./routes/patients");
const doctorsRouter = require("./routes/doctors");
const authenticationRoute = require("./routes/auth");


//Error handlers
const errorHandlerMiddleware = require("./middleware/errorHandler");
const notFoundMiddleware = require("./middleware/not-found");


app.get("/" , (req , res)=>{
    res.send("Hospital Management App");
})

app.use(express.json());


//security packages
app.use(rateLimit({
    windowMs : 15*60*1000,   //15minutes
    max : 100,    //limits each IP to 100 request per windowMs
  }));
  app.use(helmet());
  app.use(cors());
  app.use(xss());



//routes
app.use("/api/v1/auth" , authenticationRoute);
app.use("/api/v1/appointments" , authenticationMiddleware ,appointmentsRouter);
app.use("/api/v1/patients", authenticationMiddleware ,patientsRouter);
app.use("/api/v1/doctors" , authenticationMiddleware , doctorsRouter);


//error Handlers(middleware)
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);



const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(3000 , ()=>{console.log("Server is listening on port 3000....")})
    }catch(error){
        console.log(error);
        
    }
}

start();