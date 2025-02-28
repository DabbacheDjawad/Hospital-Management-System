import Section from "../Components/Section"
import Button from "../Components/Button";
import { useState , useEffect} from "react";
import axios from "axios";
const Appointments = () => {

const [appointments , setAppointments] = useState([])
const [response , setResponse] = useState("");
const [searchResponse , setSearchResponse] = useState("");
const [search , setSearch] = useState("");
const [updateResponse , setUpdateResponse] = useState("");
const [removeResponse , setRemoveResponse]= useState("");
const [authResponse , setAuthResponse] = useState("");


//properties
const [patient , setAppointmentPatient] = useState("");
const [doctor , setAppointmentDoctor] = useState("");
const [illness , setPatientIllness] = useState("");
const [status , setStatus] = useState("");
const [date , setAppointmentDate] = useState(`${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`);


//updated Properties
const [update , setUpdate] = useState(null);
const [updatedDate , setUpdatedDate] = useState("");
const [updatedStatus , setUpdatedStatus] = useState("");

useEffect(() => {
  async function fetchData() {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("http://localhost:3000/api/v1/appointments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAppointments(data.appointments);
       
    } catch (error) {
      if(error.response.data.msg == "Authentication Invalid") setAuthResponse("Authentication Invalid , Please login or register first")
      console.error("Error fetching data:", error);
    }
  }

  fetchData();
}, []);


//handling States
//atts
function handlePatient(e){
  setAppointmentPatient(e.target.value);
}

function handleAppointmentDoctor(e){
  setAppointmentDoctor(e.target.value);
}

function handleAppointmentStatus(e){
  setStatus(e.target.value);
}

function handleAppointmentDate(e){
  setAppointmentDate(e.target.value);
}

function handlePatientIllness(e){
  setPatientIllness(e.target.value);
  
}

//other
function handleSearch(e){
  setSearch(e.target.value);
}


function handleUpdatedDate(e){
  setUpdatedDate(e.target.value);
}

function handleUpdatedStaus(e){
  setUpdatedStatus(e.target.value);
}



//CRUD
async function addAppointment(e){
  e.preventDefault();
  setResponse("");
  try{
    const token = localStorage.getItem("token");
    

      const response =await axios.post(`http://localhost:3000/api/v1/appointments`,
        {patient , status , date} , 
        { headers : {
         Authorization : `Bearer ${token}`}})


      const { data } = await axios.get("http://localhost:3000/api/v1/appointments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAppointments([...data.appointments]);

      setAppointmentPatient("")
      setAppointmentDoctor("")
      setPatientIllness("")
      setStatus("")
      setAppointmentDate(`${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`)

  }catch(error){
      if(error.status === 404) setResponse("server Error , check doctor ID or Patient ID")
      else setResponse(error.response.data.msg);
  }
}



async function SearchAppointment(e){
  e.preventDefault();
  setSearchResponse("")
  try{
    const token = localStorage.getItem("token");
    const {data} = await axios.get(`http://localhost:3000/api/v1/Appointments?id=${search}`, {
      headers : {
        Authorization : `Bearer ${token}`
      }
    });

    setAppointments([...data.appointments]);
    
    if(data.appointments.length == 0){
      setSearchResponse(`no appointment with the ID : ${search}`)        
    }
  }catch(error){
      setSearchResponse(error.response.data.msg);
  }
}



async function removeAppointment(id){
  try{
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:3000/api/v1/appointments/${id}` , {
      headers : {
        Authorization : `Bearer ${token}`
      }
    });

    const { data } = await axios.get("http://localhost:3000/api/v1/appointments", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setAppointments([...data.appointments]);
  }catch(error){
    if(error.status === 404) setRemoveResponse(`No Appointment with the ID : ${id}`)
  }
}



async function UpdateAppointment(id){
  setUpdateResponse("")
  try{
      const token = localStorage.getItem("token");
      const status = updatedStatus;
      const date = updatedDate;

      const response = await axios.patch(`http://localhost:3000/api/v1/appointments/${id}`,
      {status , date},
      {headers : {
          Authorization : `Bearer ${token}`
        }
      })

      const { data } = await axios.get(`http://localhost:3000/api/v1/appointments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUpdate(false);
      setAppointments([...data.appointments]);

  }catch(error){
    if(error.status === 404) setUpdateResponse(`Something went wrong with the server , please recheck your doctor ID`)     
  }
}


  return (
    <Section home={false} head="Appointments">
        <div className="mt-12">

          {/* add an Appointment */}
        <h1 className="text-center underline text-white font-semibold text-2xl mb-10">Add an Appointment</h1>
          <div className="flex flex-col items-center lg:flex-row xl:flex-row gap-6 w-full md:justify-center lg:justify-center xl:justify-center">

            {/* Appointment's Patient */}
            <input type="text" placeholder="Patient" className="outline-1
            xl:w-[50%] lg:w-[60%] md:w-[70%]
             outline-gray-500 rounded-md text-2xl p-3 w-[80%] bg-white ml-2"
              value={patient} onChange={handlePatient}/>


            {/* appointment's date */}
            <input type="text" placeholder="Appointment's Date" className="outline-1
            xl:w-[50%] lg:w-[60%] md:w-[70%]
             outline-gray-500 rounded-md text-xl p-3 w-[80%] bg-white ml-2" 
             value={date} onChange={handleAppointmentDate}/>

             {/* Appointments's Status */}
            <input type="text" placeholder="Status" className="outline-1
            xl:w-[50%] lg:w-[60%] md:w-[70%]
             outline-gray-500 rounded-md text-xl p-3 w-[80%] bg-white ml-2" 
             value={status} onChange={handleAppointmentStatus}/>


             {/*the Illness will set automatically corresponding to the Patient*/}
             {/* Appontment's Doctor will set automatically corresponding to the Patient*/} 


            <Button onClick={addAppointment} className={`mr-2`}>Add</Button>
          </div>
          <p className="text-red-700 text-center mt-10 font-semibold text-2xl">{response}</p>


            {/* Search Appointment */}
          <h1 className="text-center underline text-white font-semibold text-2xl mb-5 mt-10">Search for an Appointment</h1>

          <div className="flex gap-6 w-full md:justify-center lg:justify-center xl:justify-center">
            <input type="text" placeholder="Search for Appointment by Appointment ID" className="outline-1
              xl:w-[50%] lg:w-[60%] md:w-[70%]outline-gray-500 rounded-md text-2xl p-3 w-[80%] bg-white ml-2"
              onChange={handleSearch} value={search}/>

              <Button onClick={SearchAppointment} className={`mr-2`}>Search</Button>
          </div>

          <p className="text-red-700 text-center mt-10 font-semibold text-2xl">{authResponse}</p>

          <p className="text-white text-center mt-10 font-semibold text-2xl">{searchResponse}</p>          
          <ul
           className="flex flex-col gap-18 lg:gap-5 xl:gap-5 mt-10 items-center text-xl lg:text-2xl xl:text-2xl ">{
              appointments.map((appointment , index)=>(
                <div className="flex w-[90%] gap-5 flex-col lg:flex-row xl:flex-row">
                  <li key={index} className="flex flex-col bg-white w-full gap-3 rounded-lg p-5">
                  <span className="flex"><p className="text-[#092137] font-bold">AppointmentID</p>: {appointment._id}</span>
                    <span className="flex"><p className="text-[#092137] font-bold">Patient</p> : {appointment.patient}</span>
                    <span className="flex"><p className="text-[#092137] font-bold">Doctor</p>: {appointment.doctor}</span>
                    <span className="flex"><p className="text-[#092137] font-bold">Date</p>: {appointment.date.split("T")[0]}</span>
                    <span className="flex"><p className="text-[#092137] font-bold">Status</p>: {appointment.status}</span>
                    <span className="flex"><p className="text-[#092137] font-bold">Illness</p>: {appointment.illness}</span>
                    

                    {/* Update Section (Hidden) */}
                    {update === index && (
          <div className="flex flex-col gap-6">
            <input
              type="text"
              placeholder="New Date"
              className="outline-1 xl:w-[50%] lg:w-[60%] md:w-[70%] outline-gray-500 rounded-md text-2xl p-3 w-[80%] bg-white ml-2"
              onChange={handleUpdatedDate}
              value={updatedDate}
            />
            <input
              type="Status"
              placeholder="New Status"
              className="outline-1 xl:w-[50%] lg:w-[60%] md:w-[70%] outline-gray-500 rounded-md text-2xl p-3 w-[80%] bg-white ml-2"
              onChange={handleUpdatedStaus}
              value={updatedStatus}
            />


            <Button onClick={() => UpdateAppointment(appointment._id)}>Confirm</Button>
          </div>
        )}
                  </li>
                  
                  <div key={index+1} className="flex gap-3  lg:flex-col xl:flex-col justify-center">
                    <Button onClick={()=>{
                      removeAppointment(appointment._id)
                      }}>Remove Appointment</Button>
                    <Button onClick={()=>setUpdate(update===index ? null : index)}>{update !==index?"Update Appointment":"Cancel"}</Button>
                  </div>
                  <p className="text-red-700 text-center mt-10 font-semibold text-2xl">{update ===index? updateResponse:""}</p>
                  <p className="text-red-700 text-center mt-10 font-semibold text-2xl">{update === index? removeResponse : ""}</p>
                </div>
              ))
            }</ul>
        </div>
      </Section>
  )
}

export default Appointments
