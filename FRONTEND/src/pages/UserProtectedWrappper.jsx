import React, { useContext, useState , useEffect } from 'react'
import { UserDataContex } from '../contex/UserContex'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const UserProtectedWrappper = ({ children }) => {

  const token = localStorage.getItem('token')
    const navigate = useNavigate();

 
    useEffect(()=>{
        if (!token) {
             navigate('/login')
               }
           
    } , [token, navigate])


  const{user , setUser} = useContext(UserDataContex)
    const [isLoading , setIsLoading] = useState(true) ;
        
     
 
    axios.get(`https://uber-backend-4zhe.onrender.com/users/profile` , {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then(response => {
        if(response.status === 200){
     setUser(response.data)
     setIsLoading(false)
        }
    }).catch(err => {
        console.log(err) ;
        localStorage.removeItem('token');
        navigate('/login')
    })  



    if(isLoading){
        return (
            <div>.....Loading</div>
        )
    }


    return (
       <>
       {children}
       </>
    )
}

export default UserProtectedWrappper
