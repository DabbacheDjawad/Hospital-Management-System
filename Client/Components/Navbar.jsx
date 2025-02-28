import { useState } from "react";
import {Link} from "react-router-dom"
const navbar = ({className}) => {
 
    return (
        <div className={`${className} relative bg-[#05062d] text-white flex flex-col lg:flex-row xl:flex-row
         items-center p-2 rounded-lg z-20 transition-all duration-300 ease-in-out
         lg:opacity-100 xl:opacity-100 lg:flex xl:flex mr-10`}>
          <div className="p-4 hover:underline transition-all hover:text-lg "><Link to={"/"}>Home</Link></div>
          <div className="p-4 hover:underline transition-all hover:text-lg "><Link to={"/patients"}>Patients</Link></div>
          <div className="p-4 hover:underline transition-all hover:text-lg "><Link to={"/doctors"}>Doctors</Link></div>
          <div className="p-4 hover:underline transition-all hover:text-lg "><Link to={"/appointments"}>Appointments</Link></div>
        </div>
    )
  }
  
  export default navbar
  