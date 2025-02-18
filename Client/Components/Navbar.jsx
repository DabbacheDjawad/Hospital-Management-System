
const navbar = ({className}) => {
    return (
        <div className={`${className} relative bg-[#05062d] text-white flex items-center p-2 rounded-lg z-50`}>
          <div className="p-4 hover:underline transition-all hover:text-lg "><a href="#">Home</a></div>
          <div className="p-4 hover:underline transition-all hover:text-lg "><a href="#">Patients</a></div>
          <div className="p-4 hover:underline transition-all hover:text-lg "><a href="#">Doctors</a></div>
          <div className="p-4 hover:underline transition-all hover:text-lg "><a href="#">Appointments</a></div>
        </div>
    )
  }
  
  export default navbar
  