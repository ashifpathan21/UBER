import React from 'react'
import logo from '../assets/logo.png'
import bg from '../assets/bg.jpg'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div >
      <div className='h-screen flex justify-between  pt-8  flex-col w-full bg-cover bg-center '
      style={{ backgroundImage: `url(${bg})` }}>
      <img className=' w-16 ml-8' src={logo} />

        <div className='bg-white py-5 pb-7 px-4'>
          
          <h2 className=' text-3xl font-bold '>Get Started with Uber </h2>
          <Link to={'/login'}  className=' flex item-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5 font-bold'>Continue</Link>
        </div>
      </div>

    </div>
  )
}

export default Start
