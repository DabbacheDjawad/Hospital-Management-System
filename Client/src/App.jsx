import {Route , Routes} from 'react-router-dom'
import Header from "../Components/Header"
import Section from "../Components/Section"
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import Appointment from '../Pages/Appointment'
import Doctor from '../Pages/Doctor'
import Patient from '../Pages/Patient'

function App() {
  return (
    <>  
      <Header />
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/doctors' element={<Doctor />} />
          <Route path='/appointment' element={<Appointment />} />
          <Route path='/patients' element={<Patient />} />
      </Routes>
    </>
  )
}

export default App
