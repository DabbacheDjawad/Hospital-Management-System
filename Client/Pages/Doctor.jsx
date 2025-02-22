import Section from "../Components/Section"
import Button from "../Components/Button";
import { useState , useEffect} from "react";
import axios from "axios";
const Doctor = () => {

  const [doctors , setDoctors] = useState([]);
  const [response , setResponse] = useState("");
  const [searchResponse , setSearchResponse] = useState("");

  const [name , setDoctorName] = useState("");
  const [specialty , setDoctorSpecialty] = useState("");
  const [workingDays , setDoctorWorkingDays] = useState([]);
  const [search , setSearch] = useState("");
  
  const [update , setUpdate] = useState(null);
  const [updatedName , setUpdatedName] = useState("");
  const [updatedSpecialty , setUpdatedSpecialty] = useState("");
  const [updatedWorkingDays , setUpdatedWorkingDays] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:3000/api/v1/doctors", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDoctors(data.doctors); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  
  function handleDoctorName(e){
    setDoctorName(e.target.value);
  }

  function handleDoctorSpecialty(e){
    setDoctorSpecialty(e.target.value);
  }

  function handleDoctorWorkingDays(e){
    setDoctorWorkingDays(e.target.value);
  }

  function handleSearch(e){
    setSearch(e.target.value);
  }

  function handleUpdate(){
    setUpdate(!update);
  }


  function handleUpdatedName(e){
    setUpdatedName(e.target.value)
  }

  function handleUpdatedSpecialty(e){
    setUpdatedSpecialty(e.target.value)
  }

  function handleUpdatedWorkingDays(e){
    setUpdatedWorkingDays(e.target.value)
  }

  async function addDoctor(e){
    e.preventDefault();
    setResponse("");
    try{
      const token = localStorage.getItem("token");
      
      const {doctor} =await axios.post("http://localhost:3000/api/v1/doctors",
       {name , specialty , workingDays} , 
       { headers : {
        Authorization : `Bearer ${token}`}})

        const { data } = await axios.get("http://localhost:3000/api/v1/doctors", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDoctors(data.doctors);
        setDoctorName("");
        setDoctorSpecialty("");
        setDoctorWorkingDays("");
    }catch(error){
        setResponse(error.message);
    }
  }

  async function SearchDoctor(e){
    e.preventDefault();
    setSearchResponse("")
    try{
      const token = localStorage.getItem("token");
      const {data} = await axios.get(`http://localhost:3000/api/v1/doctors?name=${search}`, {
        headers : {
          Authorization : `Bearer ${token}`
        }
      });

      setDoctors(data.doctors);
      
      if(data.doctors.length == 0){
        setSearchResponse(`no Doctors with the Name ${search}`)        
      }
    }catch(error){
         console.log(error);
         
    }
  }


  async function removeDoctor(index){
    try{
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/v1/doctors/${index}` , {
        headers : {
          Authorization : `Bearer ${token}`
        }
      });

      const { data } = await axios.get("http://localhost:3000/api/v1/doctors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDoctors(data.doctors)
    }catch(error){
      console.log(error);
      
    }
  }


  async function UpdateDoctor(index){
    console.log(index);
    
      try{
          const token = localStorage.getItem("token");
          const name = updatedName;
          const specialty = updatedSpecialty;
          const workingDays = updatedWorkingDays;
          const {updatedDoctor} = await axios.patch(`http://localhost:3000/api/v1/doctors/${index}`,
          {name , specialty , workingDays},
          {headers : {
              Authorization : `Bearer ${token}`
            }
          })

          const { data } = await axios.get(`http://localhost:3000/api/v1/doctors`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUpdate(false);
          setDoctors(data.doctors);

      }catch(error){
        console.log(error)
      }
  }

  return (
      <Section home={false} head="doctors">
        <div className="mt-12">

          {/* add a doctor */}
        <h1 className="text-center underline text-white font-semibold text-2xl mb-10">Add a Doctor</h1>
          <div className="flex gap-6 w-full md:justify-center lg:justify-center xl:justify-center">

            {/* doctor's Name */}
            <input type="text" placeholder="Name" className="outline-1
            xl:w-[50%] lg:w-[60%] md:w-[70%]
             outline-gray-500 rounded-md text-2xl p-3 w-[80%] bg-white ml-2"
              value={name} onChange={handleDoctorName}/>

            {/* doctor's Specialty */}
            <input type="text" placeholder="Specialty" className="outline-1
            xl:w-[50%] lg:w-[60%] md:w-[70%]
             outline-gray-500 rounded-md text-2xl p-3 w-[80%] bg-white ml-2"
              value={specialty} onChange={handleDoctorSpecialty}/>

            {/* Doctor's Working Days */}
            <input type="text" placeholder="Working Days" className="outline-1
            xl:w-[50%] lg:w-[60%] md:w-[70%]
             outline-gray-500 rounded-md text-xl p-3 w-[80%] bg-white ml-2" 
             value={workingDays} onChange={handleDoctorWorkingDays}/>

            <Button onClick={addDoctor} className={`mr-2`}>Add</Button>
          </div>
          <p className="text-red-700 text-center mt-10 font-semibold text-2xl">{response}</p>

            {/* Search Doctor */}
          <h1 className="text-center underline text-white font-semibold text-2xl mb-5 mt-10">Search for a Doctor</h1>

          <div className="flex gap-6 w-full md:justify-center lg:justify-center xl:justify-center">
            <input type="text" placeholder="Search for Doctor" className="outline-1
              xl:w-[50%] lg:w-[60%] md:w-[70%]outline-gray-500 rounded-md text-2xl p-3 w-[80%] bg-white ml-2"
              onChange={handleSearch} value={search}/>

              <Button onClick={SearchDoctor} className={`mr-2`}>Search</Button>
          </div>
          <p className="text-white text-center mt-10 font-semibold text-2xl">{searchResponse}</p>

          <ul className="flex flex-col gap-18 lg:gap-5 xl:gap-5 mt-10 items-center text-xl lg:text-2xl xl:text-2xl ">{
              doctors.map((doctor , index)=>(
                <div className="flex w-[90%] gap-5 flex-col lg:flex-row xl:flex-row">
                  <li key={index} className="flex flex-col bg-white w-full gap-3 rounded-lg p-5">
                    <span className="flex"><p className="text-[#092137] font-bold">Name</p> : {doctor.name}</span>
                    <span className="flex"><p className="text-[#092137] font-bold">Speacialty</p>: {doctor.specialty}</span>
                    <span className="flex"><p className="text-[#092137] font-bold">Working Days</p>: {doctor.workingDays+''}</span>
                    

                    {/* Update Section (Hidden) */}
                    {update === index && (
          <div className="flex flex-col gap-6">
            <input
              type="text"
              placeholder="New Name"
              className="outline-1 xl:w-[50%] lg:w-[60%] md:w-[70%] outline-gray-500 rounded-md text-2xl p-3 w-[80%] bg-white ml-2"
              onChange={handleUpdatedName}
              value={updatedName}
            />
            <input
              type="text"
              placeholder="New Specialty"
              className="outline-1 xl:w-[50%] lg:w-[60%] md:w-[70%] outline-gray-500 rounded-md text-2xl p-3 w-[80%] bg-white ml-2"
              onChange={handleUpdatedSpecialty}
              value={updatedSpecialty}
            />
            <input
              type="text"
              placeholder="New working days Program"
              className="outline-1 xl:w-[50%] lg:w-[60%] md:w-[70%] outline-gray-500 rounded-md text-2xl p-3 w-[80%] bg-white ml-2"
              onChange={handleUpdatedWorkingDays}
              value={updatedWorkingDays}
            />
            <Button onClick={() => UpdateDoctor(index)}>Confirm</Button>
          </div>
        )}
                  </li>
                  
                  <div className="flex gap-3  lg:flex-col xl:flex-col justify-center">
                    <Button onClick={()=>removeDoctor(index)}>Remove Doctor</Button>
                    <Button onClick={()=>setUpdate(update===index ? null : index)}>Update Doctor</Button>
                  </div>
                </div>
              ))
            }</ul>
        </div>
      </Section>
  )
}

export default Doctor
