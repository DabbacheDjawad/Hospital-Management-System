import Login from "../Pages/Login";
import Button from "./Button"
import Navbar from "./Navbar"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Header = () => {

  const [isOpen , setIsOpen] = useState(false);
  function handleNavBar(){
      setIsOpen(!isOpen);
  }

  const navigate = useNavigate();
  function handleNavigation(destination){
    navigate(`/${destination}`);
  }

  return (
    <div className="flex justify-center w-full items-center mt-8 transition-all md:flex-col-reverse sm:flex-col-reverse lg:flex-row xl:flex-row">
  <Navbar
    className={`flex flex-col ml-10 xl:min-h-fit lg:min-h-fit overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out 
    ${isOpen ? 'max-h-[500px] opacity-100 w-full' : 'max-h-0 opacity-0'}`}
  /> 
        <div className="flex justify-center items-center ">
            <Button onClick={()=>handleNavigation("login")}>Sign In</Button>
            <Button onClick={()=>handleNavigation("register")}>Register</Button>
            <Button className="lg:hidden xl:hidden block" onClick={handleNavBar}>☰</Button>
        </div>
      
    </div>
  )
}

export default Header

{/* <div className="flex justify-center w-full items-center mt-8 transition-all md:flex-col-reverse sm:flex-col-reverse lg:flex-row xl:flex-row">
    <Navbar className={`sm:${isOpen? `flex-col w-full ml-10 h-[auto]` : ` hidden`}`}/>   */}