import Button from "../Components/Button";
import { useState} from "react";
import axios from "axios"
const Register = () => {

  const [data , setData] = useState([{}]);
  
  const [name , setName] = useState("");
  const [role , setRole] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");

  const [response , setResponse] = useState("");

  async function handleRegister(e){
    e.preventDefault();
      try{
        const {data} = await axios.post("http://localhost:3000/api/v1/auth/register",{email , password , role , name});
        //setting token in localStorage
        localStorage.setItem("token" , data.token);
        setResponse("User Registered")
      }catch(error){
        if(error.status == 400) setResponse("Duplicate Email Value")
        else setResponse("Invalid Credentials")
        console.log(error)
      }
  }

  //email
  function handleEmailChange(event){
      setEmail(event.target.value)
  }

  //password
  function handlePasswordChange(event){
    setPassword(event.target.value);
  }


//name
  function handleNameChange(event){
    setName(event.target.value)
}


//Role
function handleRoleChange(event){
  setRole(event.target.value);
}

  return (
    <div
      className="fixed top-[100px] left-[5%] md:left-[12%] lg:left-[16%] xl:left-[25%] border-1 border-[rgba(0,0,0,0.2)]
       shadow-2xl lg:w-[70%] xl:w-[50%] md:w-[80%] m-auto w-[90%] mt-24"
    >
      <form action="" className="flex flex-col gap-10 p-10 mt-12 mb-12">

         
          {/*Name*/}
        <div className="flex gap-2 items-center">
          <label className="mr-[6%] text-xl md:text-2xl lg:text-2xl xl:text-2xl text-[rgba(1,0,0,0.91)]">
            Name
          </label>
          <input
            type="text"
            placeholder="Provide your name Please"
            className="outline-1 outline-gray-500 rounded-md text-xl p-3 w-[80%]"
            value={name}
            onChange={handleNameChange}
          />
        </div>


          {/*Role*/}
        <div className="flex gap-2 items-center">
          <label className="mr-[6%] text-xl md:text-2xl lg:text-2xl xl:text-2xl text-[rgba(1,0,0,0.91)]">
            Role
          </label>
          <input
            type="text"
            placeholder="Provide your Role Please"
            className="outline-1 outline-gray-500 rounded-md text-xl p-3 w-[80%]"
            value={role}
            onChange={handleRoleChange}
          />
        </div>

        {/* email */}
        <div className="flex gap-2 items-center">
          <label className="mr-[6%] text-xl md:text-2xl lg:text-2xl xl:text-2xl text-[rgba(1,0,0,0.91)]">
            Email
          </label>
          <input
            type="email"
            placeholder="Provide your Email Please"
            className="outline-1 outline-gray-500 rounded-md text-xl p-3 w-[80%]"
            value={email}
            onChange={handleEmailChange}
          />
        </div>

        {/* password */}
        <div>
          <label className="mr-2 text-xl md:text-2xl lg:text-2xl xl:text-2xl text-[rgba(1,0,0,0.91)]">
            Password
          </label>
          <input
            type="password"
            placeholder="Provide your Password Please"
            className="outline-1 outline-gray-500 rounded-md text-xl p-3 w-[80%]"
            value={password}
            onChange={handlePasswordChange}
            />
        </div>

        <div>
          <Button className={"!w-[80%] m-auto"} onClick={handleRegister}>Register</Button>
        </div>
        <div>
          <p className="text-center font-bold text-2xl">{response}</p>
        </div>
      </form>
    </div>
  );
};

export default Register;
