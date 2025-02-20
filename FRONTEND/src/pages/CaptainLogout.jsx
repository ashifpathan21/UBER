import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { CaptainDataContex } from '../contex/CaptainContex';

const CaptainLogout =  () => {

    const token = localStorage.getItem('token');

    const navigate = useNavigate()

useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout` , {
        headers: {
       Authorization:`Bearer ${token}`
   }}).then((response) => {
       localStorage.removeItem('token')
       navigate('/captain-login')
   })
} ,[])
    
  return (
    <div>
      
    </div>
  )
}

export default CaptainLogout
