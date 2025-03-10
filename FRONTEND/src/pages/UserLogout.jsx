import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {

    const token = localStorage.getItem('token');
const navigate = useNavigate()
    axios.get(`https://uber-backend-4zhe.onrender.com/users/logout` , {
         headers: {
        Authorization:`Bearer ${token}`
    }}).then((response) => {
        localStorage.removeItem('token')
        navigate('/login')
    })



  return (
    <div>
      
    </div>
  )
}

export default UserLogout
