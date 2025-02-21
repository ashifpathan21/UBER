import React, { useState } from 'react'
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { UserDataContex } from '../contex/UserContex'

const Usersignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserDataContex)

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      fullname: {
        firstname: firstname,
        lastname: lastname
      },
      email: email,
      password: password
    }

    
    try {
      const response = await axios.post(`https://uber-backend-4zhe.onrender.com/users/register`, newUser)
    
      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token' , data.token)
        navigate('/home')
      }
    } catch (error) {
      console.error("Registration error:", error)
    }

    setEmail('');
    setPassword('');
    setFirstName('')
    setLastName('')
  }

  return (
    <div className='p-5 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 ml-2 mb-10' src={logo} alt="logo" />
        <form onSubmit={submitHandler}>
          <h3 className='text-lg font-medium'>What's your Name ?</h3>
          <div className='w-full'>
            <input
              type="text"
              required
              value={firstname}
              placeholder='First Name'
              onChange={(e) => setFirstName(e.target.value)}
              className='w-[48%] bg-[#eeeeee] mr-2 mb-3 py-2 rounded border text-lg placeholder:text-base'
            />
            <input
              type="text"
              placeholder='Last Name'
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              className='bg-[#eeeeee] mb-3 rounded py-2 border text-lg placeholder:text-base w-[48%]'
            />
          </div>
          <h3 className='text-lg font-medium'>What's your Email</h3>
          <input
            type="email"
            className='bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='email@example.com'
          />
          <h3 className='text-lg font-medium'>Enter Password</h3>
          <input
            type="password"
            className='bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />
          <button
            className='mt-3 bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg'
          >
            Create Account
          </button>
        </form>
        <p className='text-center'>
          Already have an account ? <Link className='text-blue-600' to='/login'>Login</Link>
        </p>
      </div>
      <div className='h-10 mb-13 w-full'>
        <p className='text-sm text-center'>
          By proceeding, you consent to receiving calls, WhatsApp or SMS/RCS messages, including by automated means, from Uber and its affiliates to the number provided.
        </p>
      </div>
    </div>
  )
}

export default Usersignup
