import { useState , useEffect} from "react"
import Facebook from '@iconscout/react-unicons/icons/uil-facebook'
import Instagram from "@iconscout/react-unicons/icons/uil-instagram"
import GitHub from "@iconscout/react-unicons/icons/uil-github"
import LinkedIn from "@iconscout/react-unicons/icons/uil-linkedin"

import Button from "./Button"
const Section = ({home}) => {

  const [data , setData] = useState([{}]);

  useEffect(()=>{
    fetch("http://localhost:3000/api/v1/doctors").then(response => response.json).then(data => setData(data))
  } , [])

  return (
    <div className={`fixed top-[100px] lg:top-auto xl:top-auto ${home && home==true?'h-[500px]':"h-fit"}
     w-[80%] ml-[10%] mt-18 rounded-xl bg-gradient-to-r from-[#0a3d6d] via-[#092137] to-[#050E6E]`}>

        <h1 className="text-3xl text-center text-white pt-10 underline">Hospital Managment System</h1>
        {home && home==true ? 
        <p className="text-white text-center mt-8 text-2xl w-[80%] ml-[10%]">A simple Hospital Management System , to actually Get the Data , Be Sure to Login with your Account 
          And if you don't have an Account sign in by clicking the Button Above
        </p>
        :""}

        <div className="flex justify-center items-center mt-24">
            <a href="https://www.facebook.com/profile.php?id=100021755386728" target="_blank"><Facebook size="65" className='rounded-full mr-8' color="white" /></a>
            <a href="https://www.instagram.com/julius_the_ll/" target="_blank"><Instagram size="65" className='rounded-full mr-8' color="white" /></a>
            <a href="https://github.com/DabbacheDjawad" target="_blank"><GitHub size="65" className='rounded-full mr-8' color="white" /></a>
            <a href="https://www.linkedin.com/in/djawad-dabbache-97882a333/" target="_blank"><LinkedIn size="65" className='rounded-full mr-8' color="white" /></a>
        </div>
    </div>
  )
}

export default Section
