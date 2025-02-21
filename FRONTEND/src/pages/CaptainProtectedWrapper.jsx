import React, { useContext , useEffect, useState } from 'react'
import { CaptainDataContex } from '../contex/CaptainContex'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainProtectedWrapper = ({children}) => {
  
     const token = localStorage.getItem('token')
        const navigate = useNavigate();
        const {captain , setCaptain} = useContext(CaptainDataContex) ;
        const [isLoading , setIsLoading] = useState(true) ;
        
     
        useEffect(() => {
            if (!token) {
                navigate('/captain-login');
                return;
            }
    
            const fetchCaptainProfile = async () => {
                try {
                    const response = await axios.get(`https://uber-backend-4zhe.onrender.com/captains/profile`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
    
                    if (response.status === 200) {
                        setCaptain(response.data.captain);
                    }
                } catch (error) {
                    console.error("Unauthorized:", error);
                    localStorage.removeItem('token');
                    navigate('/captain-login');
                } finally {
                    setIsLoading(false);
                }
            };
    
            fetchCaptainProfile();
        }, [token, navigate, setCaptain]); // Dependencies List
    
        if (isLoading) {
            return <div>.....Loading</div>;
        }

        

  
    return (
   <>
   {
    children
   }
   </>
  )
}

export default CaptainProtectedWrapper
