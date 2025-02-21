import React, { useState, useContext } from 'react'
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom'
import { UserDataContex } from '../contex/UserContex';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Userlogin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});

  const { user, setUser } = useContext(UserDataContex)

  const navigate = useNavigate()

  const submitHandler = async  (e) => {
    e.preventDefault();

    const userData = {
      email:email,
      password:password
    }

    const response = await axios.post(`https://uber-backend-4zhe.onrender.com/users/login` , userData)

    if(response.status === 200){
      const data = response.data ;
      setUser(data) ;
 localStorage.setItem('token' , data.token)

      navigate('/home')
    }

    setEmail('')
    setPassword('')
  }

  return (
    <div className='p-5 h-screen flex flex-col justify-between'>
      <div>
        <img className=' w-16 ml-2 mb-10  ' src={logo} />
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
        <p className='text-center'>new here? <Link className='text-blue-600 ' to='/signup' >Create new Account</Link></p>

      </div>

      <div>
        <Link to='/captain-login' className=' flex justify-center mt-2 bg-[#9b9904] text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base'
        >Sign in as Captain </Link>
      </div>
    </div>
  )
}

export default Userlogin
