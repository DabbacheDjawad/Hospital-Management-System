import Section from "../Components/Section"
import Button from "../Components/Button";
import { useState , useEffect} from "react";
import axios from "axios";
const Patient = () => {

const [patients , setPatients] = useState([])
const [response , setResponse] = useState("");
const [searchResponse , setSearchResponse] = useState("");
const [search , setSearch] = useState("");
const [updateResponse , setUpdateResponse] = useState("");
const [removeResponse , setRemoveResponse]= useState("")

//properties
const [name , setPatientName] = useState("");
const [phoneNumber , setPhoneNb] = useState("");
const [doctor , setPatientDoctor] = useState("");
const [appointments , setPatientAppointment] = useState([]);
const [illness , setPatientIllness] = useState("");


//updated Properties
const [update , setUpdate] = useState(null);
const [updatedPatientName , setUpdatedPatientName] = useState("");
const [updatedPhoneNb , setUpdatedPhoneNb] = useState("");
const [updatedPatientDoctor , setUpdatedPatientDoctor] = useState("");

useEffect(() => {
  async function fetchData() {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("http://localhost:3000/api/v1/patients", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPatients(data.patients);
       
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  fetchData();
}, []);


//handling States
//atts
function handlePatientName(e){
  setPatientName(e.target.value);
}

function handlePatientPhoneNb(e){
  setPhoneNb(e.target.value);
}

function handlePatientDoctor(e){
  setPatientDoctor(e.target.value);
}

function handlePatientAppointment(e){
  setPatientAppointment(e.target.value);
}

function handlePatientIllness(e){
  setPatientIllness(e.target.value);
}

//other
function handleSearch(e){
  setSearch(e.target.value);
}


function handleUpdatedPatientName(e){
  setUpdatedPatientName(e.target.value);
}

function handleUpdatedPatientPhoneNb(e){
  setUpdatedPhoneNb(e.target.value);
}

function handleUpdatedPatientDoctor(e){
  setUpdatedPatientDoctor(e.target.value);
}


//CRUD
async function addPatient(e){
  e.preventDefault();
  setResponse("");
  try{
    const token = localStorage.getItem("token");
    
    if(appointments !==""){
      const response =await axios.post("http://localhost:3000/api/v1/patients",
        {name ,phoneNumber , doctor , appointments , illness} , 
        { headers : {
         Authorization : `Bearer ${token}`}})
    }else{
      const response =await axios.post("http://localhost:3000/api/v1/patients",
        {name ,phoneNumber , doctor , illness} , 
        { headers : {
         Authorization : `Bearer ${token}`}})
    }


      const { data } = await axios.get("http://localhost:3000/api/v1/patients", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPatients([...data.patients]);
      
      setPatientName("")
      setPhoneNb("")
      setPatientDoctor("")
      setPatientAppointment("");
      setPatientIllness("")
  }catch(error){
      setResponse(error.message);
  }
}



async function SearchPatient(e){
  e.preventDefault();
  setSearchResponse("")
  try{
    const token = localStorage.getItem("token");
    const {data} = await axios.get(`http://localhost:3000/api/v1/patients?name=${search}`, {
      headers : {
        Authorization : `Bearer ${token}`
      }
    });

    setPatients(data.patients);
    
    if(data.patients.length == 0){
      setSearchResponse(`no Patients with the Name ${search}`)        
    }
  }catch(error){
       console.log(error);
       
  }
}



async function removePatient(id){
  try{
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:3000/api/v1/patients/${id}` , {
      headers : {
        Authorization : `Bearer ${token}`
      }
    });

    const { data } = await axios.get("http://localhost:3000/api/v1/patients", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setPatients([...data.patients]);
  }catch(error){
    if(error.status === 404) setRemoveResponse(`No Patients with the ID : ${id}`)
  }
}



async function UpdatePatient(id , doctor){
  setUpdateResponse("")
  try{
      const token = localStorage.getItem("token");
      const name = updatedPatientName;
      const phoneNumber = updatedPhoneNb;
      const doctor = updatedPatientDoctor;
      const {updatedPatient} = await axios.patch(`http://localhost:3000/api/v1/patients/${id}`,
      {name , phoneNumber , doctor},
      {headers : {
          Authorization : `Bearer ${token}`
        }
      })

      const { data } = await axios.get(`http://localhost:3000/api/v1/patients`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUpdate(false);
      setPatients(data.patients);

  }catch(error){
    if(error.status === 404) setUpdateResponse(`Something went wrong with the server , please recheck your doctor ID`)     
  }
}


  return (
    <Section home={false} head="Patients">
        <div className="mt-12">

          {/* add a Patient */}
        <h1 className="text-center underline text-white font-semibold text-2xl mb-10">Add a Patient</h1>
          <div className="flex flex-col items-center lg:flex-row xl:flex-row gap-6 w-full md:justify-center lg:justify-center xl:justify-center">

            {/* patient's Name */}
            <input type="text" placeholder="Name" className="outline-1
            xl:w-[50%] lg:w-[60%] md:w-[70%]
             outline-gray-500 rounded-md text-2xl p-3 w-[80%] bg-white ml-2"
              value={name} onChange={handlePatientName}/>

            {/* patient's phone Number */}
            <input type="text" placeholder="Phone Number" className="outline-1
            xl:w-[50%] lg:w-[60%] md:w-[70%]
             outline-gray-500 rounded-md text-2xl p-3 w-[80%] bg-white ml-2"
              value={phoneNumber} onChange={handlePatientPhoneNb}/>

            {/* Patients's Doctor */}
            <input type="text" placeholder="Doctor's ID" className="outline-1
            xl:w-[50%] lg:w-[60%] md:w-[70%]
             outline-gray-500 rounded-md text-xl p-3 w-[80%] bg-white ml-2" 
             value={doctor} onChange={handlePatientDoctor}/>

             {/* Patients's Appointments */}
            <input type="text" placeholder="Appointmen's ID" className="outline-1
            xl:w-[50%] lg:w-[60%] md:w-[70%]
             outline-gray-500 rounded-md text-xl p-3 w-[80%] bg-white ml-2" 
             value={appointments} onChange={handlePatientAppointment}/>

            {/* Patients's Illness */}
            <input type="text" placeholder="Illness" className="outline-1
            xl:w-[50%] lg:w-[60%] md:w-[70%]
             outline-gray-500 rounded-md text-xl p-3 w-[80%] bg-white ml-2" 
             value={illness} onChange={handlePatientIllness}/>

            <Button onClick={addPatient} className={`mr-2`}>Add</Button>
          </div>
          <p className="text-red-700 text-center mt-10 font-semibold text-2xl">{response}</p>


            {/* Search Patient */}
          <h1 className="text-center underline text-white font-semibold text-2xl mb-5 mt-10">Search for a Patient</h1>

          <div className="flex gap-6 w-full md:justify-center lg:justify-center xl:justify-center">
            <input type="text" placeholder="Search for Patient" className="outline-1
              xl:w-[50%] lg:w-[60%] md:w-[70%]outline-gray-500 rounded-md text-2xl p-3 w-[80%] bg-white ml-2"
              onChange={handleSearch} value={search}/>

              <Button onClick={SearchPatient} className={`mr-2`}>Search</Button>
          </div>
          <p className="text-white text-center mt-10 font-semibold text-2xl">{searchResponse}</p>          
          <ul
           className="flex flex-col gap-18 lg:gap-5 xl:gap-5 mt-10 items-center text-xl lg:text-2xl xl:text-2xl ">{
              patients.map((patient , index)=>(
                <div className="flex w-[90%] gap-5 flex-col lg:flex-row xl:flex-row">
                  <li key={index} className="flex flex-col bg-white w-full gap-3 rounded-lg p-5">
                  <span className="flex"><p className="text-[#092137] font-bold">ID</p>: {patient._id}</span>
                    <span className="flex"><p className="text-[#092137] font-bold">Name</p> : {patient.name}</span>
                    <span className="flex"><p className="text-[#092137] font-bold">Phone Nb</p>: {patient.phoneNumber}</span>
                    <span className="flex"><p className="text-[#092137] font-bold">Appointed Doctor</p>: {patient.doctor}</span>
                    <span className="flex"><p className="text-[#092137] font-bold">Appointments</p>: {patient.appointment}</span>
                    <span className="flex"><p className="text-[#092137] font-bold">ilness</p>: {patient.illness}</span>
                    

                    {/* Update Section (Hidden) */}
                    {update === index && (
          <div className="flex flex-col gap-6">
            <input
              type="text"
              placeholder="New Name"
              className="outline-1 xl:w-[50%] lg:w-[60%] md:w-[70%] outline-gray-500 rounded-md text-2xl p-3 w-[80%] bg-white ml-2"
              onChange={handleUpdatedPatientName}
              value={updatedPatientName}
            />
            <input
              type="tel"
              placeholder="New Phone Nb"
              className="outline-1 xl:w-[50%] lg:w-[60%] md:w-[70%] outline-gray-500 rounded-md text-2xl p-3 w-[80%] bg-white ml-2"
              onChange={handleUpdatedPatientPhoneNb}
              value={updatedPhoneNb}
            />
            <input
              type="text"
              placeholder="new Appointed Doctor"
              className="outline-1 xl:w-[50%] lg:w-[60%] md:w-[70%] outline-gray-500 rounded-md text-2xl p-3 w-[80%] bg-white ml-2"
              onChange={handleUpdatedPatientDoctor}
              value={updatedPatientDoctor}
            />
            
            


            <Button onClick={() => UpdatePatient(patient._id , updatedPatientDoctor)}>Confirm</Button>
          </div>
        )}
                  </li>
                  
                  <div key={index+1} className="flex gap-3  lg:flex-col xl:flex-col justify-center">
                    <Button onClick={()=>{
                      removePatient(patient._id)
                      }}>Remove Patient</Button>
                    <Button onClick={()=>setUpdate(update===index ? null : index)}>{update !==index?"Update Patient":"Cancel"}</Button>
                  </div>
                  <p className="text-red-700 text-center mt-10 font-semibold text-2xl">{update ===index? updateResponse:""}</p>
                </div>
              ))
            }</ul>
        </div>
      </Section>
  )
}

export default Patient
