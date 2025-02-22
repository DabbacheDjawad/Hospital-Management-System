import Button from "./Button"
import Navbar from "./Navbar"
import { useState } from "react";
const Header = () => {

  const [isOpen , setIsOpen] = useState(false);
  function handleNavBar(){
      setIsOpen(!isOpen);
  }

  return (
    <div className="flex justify-center w-full items-center mt-8 transition-all md:flex-col-reverse sm:flex-col-reverse lg:flex-row xl:flex-row">
  <Navbar
    className={`flex flex-col ml-10 xl:min-h-fit lg:min-h-fit overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out 
    ${isOpen ? 'max-h-[500px] opacity-100 w-full' : 'max-h-0 opacity-0'}`}
  /> 
        <div className="flex justify-center items-center ">
            <Button href={"/api/v1/appointments"}>Sign In</Button>
            <Button>Register</Button>
            <Button className="lg:hidden xl:hidden block" onClick={handleNavBar}>☰</Button>
        </div>
      
    </div>
  )
}

export default Header

{/* <div className="flex justify-center w-full items-center mt-8 transition-all md:flex-col-reverse sm:flex-col-reverse lg:flex-row xl:flex-row">
    <Navbar className={`sm:${isOpen? `flex-col w-full ml-10 h-[auto]` : ` hidden`}`}/>   */}