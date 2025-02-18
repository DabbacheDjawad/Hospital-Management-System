import Button from "./Button"
import Navbar from "./Navbar"
import { useState } from "react"
const Header = () => {
  const [isOpen , setIsOpen] = useState(false);

  function handleNavBar(){
      setIsOpen(!isOpen);
  }

  return (
    <div className="flex justify-center items-center mt-8 md:flex-col-reverse sm:flex-col-reverse lg:flex-row xl:flex-row">
    <Navbar className={`transition-all duration-300 ease-in-out lg:opacity-100 xl:opacity-100
       sm:${isOpen? `flex-col w-[600px] opacity-100` : ` opacity-0`} lg:flex xl:flex mr-10`}/>   
        <div className="flex justify-center mx-10">
            <Button href={"/api/v1/appointments"} className={`${isOpen?"":""}`}>Sign In</Button>
            <Button>Register</Button>
            <Button className="lg:hidden xl:hidden block" onClick={handleNavBar}>☰</Button>
        </div>
      
    </div>
  )
}

export default Header
