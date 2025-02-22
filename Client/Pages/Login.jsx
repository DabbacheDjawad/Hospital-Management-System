import Button from "../Components/Button";
import { useState} from "react";
import axios from "axios"
const Login = () => {

  const [data , setData] = useState([{}]);
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [response , setResponse] = useState("");

  async function handleLogin(e){
    e.preventDefault();
      try{
        const token = localStorage.getItem("token")

        const {data} = await axios.post("http://localhost:3000/api/v1/auth/login",{email , password} ,
         { headers : {
            Authorization : `Bearer ${token}`
          }}
        );

        setResponse("User Logged In");
      }catch(error){
        if(error.status === 401) setResponse("UNAUTHORIZED , Wrong Email or Password")
        else if(error.status === 400) setResponse("UNAUTHORIZED , Be Sure To Provide The Full Credentials")
        else setResponse("Something Went Wrong , Please Try Again")
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


  return (
    <div
      className="fixed top-[100px] left-[5%] md:left-[12%] lg:left-[16%] xl:left-[25%] border-1 border-[rgba(0,0,0,0.2)]
       shadow-2xl lg:w-[70%] xl:w-[50%] md:w-[80%] m-auto w-[90%] mt-24"
    >
      <form action="" className="flex flex-col gap-10 p-10 mt-12 mb-12">
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
          <Button className={"!w-[80%] m-auto"} onClick={handleLogin}>Login</Button>
        </div>
        <div>
        <p className="text-center font-bold text-2xl">{response}</p>
        </div>
      </form>
    </div>
  );
}

export default Login

{/* <form className="flex justify-evenly items-center mt-10">
<input type="text" placeholder="Search for a Doctor"
 className="w-[50%] bg-white px-8 py-4 rounded-lg border-none text-2xl outline-0 active:outline-0"/>
 <Button>Search</Button>
</form> */}