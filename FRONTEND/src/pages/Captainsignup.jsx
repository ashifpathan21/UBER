import React, { useState } from 'react'
import logo from '../assets/logocaptain.png';
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContex } from '../contex/CaptainContex'
import axios from 'axios';
const Captainsignup = () => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('')


  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const { captain, setCaptain } = React.useContext(CaptainDataContex);



  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();

    const captainData = {
      fullname: {
        firstname: firstname,
        lastname: lastname
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }


    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);

    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }

    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
    setVehicleCapacity('')
    setVehicleColor('')
    setVehicleType('');
    setVehiclePlate('')
  }
  return (
    <div className='p-5 h-screen flex flex-col justify-between'>
      <div>
        <img className=' w-12 ml-2 mb-5  ' src={logo} />
        <form onSubmit={(e) => {
          submitHandler(e)
        }
        } >

          <h3 className='text-lg font-medium md-2' >What's your Name ?</h3>
          <div className='w-full '>
            <input type="text"
              required
              value={firstname}
              placeholder='  First Name'
              onChange={(e) => {
                setFirstName(e.target.value)
              }}
              className='w-[48%]  bg-[#eeeeee] mr-2 mb-3 py-2 rounded  border text-lg placeholder:text-base' />
            <input type="text"
              placeholder='  LastName'
              value={lastname}
              onChange={(e) => { setLastName(e.target.value) }}
              className=' bg-[#eeeeee] mb-3 rounded py-2 border  text-lg placeholder:text-base w-[48%] '
            />
          </div>

          <h3 className='text-lg font-medium md-2'>What's your Email</h3>
          <input
            type="email"
            className='bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            required
            value={email}
            onChange={(e) => {

              setEmail(e.target.value)
            }}
            placeholder='email@example.com' />

          <h3 className='text-lg font-medium md-2'>Enter Password</h3>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            className='bg-[#eeeeee] mb-2 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="password"
            required
            placeholder='Password' />

          <div>
            <h3 className='text-lg font-medium md-2'>Vehicle Information</h3>

            <div className='w-full'>
              <input
                type="text"
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
                placeholder="   Vehicle Color"
                className='bg-[#eeeeee] mb-3 rounded  py-2 border w-[48%] mr-2 text-lg placeholder:text-base'
                required
              />
              <input
                type="text"
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
                placeholder="   Vehicle Plate"
                className='bg-[#eeeeee] mb-3 rounded  py-2 border w-[48%] text-lg placeholder:text-base'
                required
              />
            </div>

            <div className='w-full'>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className='bg-[#eeeeee] mb-3 rounded mr-2 py-2 border w-[48%] text-lg'
                required
              >
                <option value="">Select Vehicle Type</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="motorcycle">Motorcycle</option>
              </select>
              <input
                type="number"
                min="1"
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
                placeholder="   Vehicle Capacity"
                className='bg-[#eeeeee] mb-3 rounded  py-2 border w-[48%] text-lg placeholder:text-base'
                required
              /> </div>
          </div>



          <button className='mt-2 bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base'
          >Create Captain Account</button>
        </form>
        <p className='text-center -mt-1'>Already have an Account ? <Link className='text-blue-600 ' to='/captain-login'>Login</Link></p>

      </div>
      <div className='h-10 mb-2  w-full '>
        <p className='text-sm text-center' >Terms & Conditions apply.</p>
      </div>
    </div>
  )
}

export default Captainsignup
