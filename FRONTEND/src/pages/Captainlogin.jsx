import React, { useState , useContext } from 'react'
import logo from '../assets/logocaptain.png';
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContex } from '../contex/CaptainContex'
import axios from 'axios';



const Captainlogin = () => {


  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  
  const navigate = useNavigate()
  const { captain, setCaptain } = React.useContext(CaptainDataContex);
  
    const submitHandler = async (e) => {
      e.preventDefault() ;
  
      const captain = {
        email:email,
        password:password
      }
  
      const response = await axios.post(`https://uber-backend-4zhe.onrender.com/captains/login`, captain);

      if (response.status === 200) {
        const data = response.data;
        
        setCaptain(data.captain);
        localStorage.setItem('token', data.token)
        navigate('/captain-home')
      }
  
  
      setEmail('')
      setPassword('')
    }
  return (
   <div className='p-5 h-screen flex flex-col justify-between'>
        <div>
          <img className=' w-12 ml-2 mb-10  ' src={logo} />
          <form onSubmit={(e) => {
            submitHandler(e)
          }
          } >
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
              className='bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
              type="password"
              required
              placeholder='Password' />
  
            <button className='mt-3 bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base'
            >Login</button>
          </form>
          <p className='text-center'>Need a Job ? <Link className='text-blue-600 ' to='/captain-signup'>Register as a Captain</Link></p>
  
        </div>
  
        <div >
          <Link to='/login' className=' flex justify-center mt-2 bg-[#ba6f06] text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base'
          >Sign in as User </Link>
        </div>
      </div>
  )
}

export default Captainlogin
