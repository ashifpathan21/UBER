import React, { useRef, useState ,useEffect , useContext } from 'react'

import bg from '../assets/home.gif'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logocaptain.png'
import { useGSAP } from '@gsap/react'
import { SocketContext } from '../contex/SocketContex'
import { CaptainDataContex } from '../contex/CaptainContex'
import gsap from 'gsap'
import axios from 'axios'
import 'remixicon/fonts/remixicon.css'

import CaptainDetails from '../components/CaptainDetails'
import RidePopup from '../components/RidePopup'
import ConfirmRidePopup from '../components/ConfirmRidePopup'
const CaptainHome = () => {

  const navigate = useNavigate()
  const ridePopupRef = useRef();
  const [ridePopupPanel , setRidePopupPanel] = useState(false)
const confirmRidePopupRef = useRef() ;
const [confirmRidePopupPanel , setConfirmRidePopupPanel] = useState(false) ;
const [ride , setRide] = useState(null)
  useGSAP(function(){
    if(ridePopupPanel){
      gsap.to(ridePopupRef.current ,{
        transform:'translateY(0)'
      })
    }else{
      gsap.to(ridePopupRef.current , {
        transform:'translateY(100%)'
      })
    }

  },[ridePopupPanel])
  useGSAP(function(){
    if(confirmRidePopupPanel){
      gsap.to(confirmRidePopupRef.current ,{
        transform:'translateY(0)'
      })
    }else{
      gsap.to(confirmRidePopupRef.current , {
        transform:'translateY(100%)'
      })
    }

  },[confirmRidePopupPanel])

  const socket = useContext(SocketContext)
const {captain } = useContext(CaptainDataContex);

useEffect(()=>{

  socket.emit('join' , {
    userId: captain._id ,
    userType: 'captain'
  })


  const updateLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
   
      
        socket.emit('update-location-captain', {
          userId: captain._id,
     location: {    ltd: position.coords.latitude,
          lng: position.coords.longitude}
        });
      });
    }
  };

  const locationInterval = setInterval(updateLocation, 10000);
updateLocation()

  // return () => clearInterval(locationInterval);

} )

socket.on('new-ride' , (data)=> {
    setRide(data)
    setRidePopupPanel(true)

})


async function confirmRide(){

 const responce = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm` , {
  rideId:ride._id ,
  captain: captain ,


 } ,{
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
 })

  setRidePopupPanel(false)
  setConfirmRidePopupPanel(true)

}


  return (
    <div className='h-screen '>

      <div className='bg-transparent fixed flex justify-between w-full items-center'>
        <img className=' w-12 ml-4    ' src={logo} alt="" />
        <div
          onClick={async () => {
            navigate('/captain-logout')
          }}
          className=' m-3 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className='ri-logout-box-r-line'></i>
        </div>
      </div>

      <div className='h-3/5 w-full'>
        <img className='h-full w-full object-cover' src={bg} alt="" />
      </div>






      <div className='h-2/5  p-3'>
        <CaptainDetails />
      </div>

      <div ref={ridePopupRef} className='bg-white translate-y-full   w-full fixed bottom-0 z-10 px-3 py-6 pt-8'>
        <RidePopup 
        confirmRide={confirmRide}
        ride={ride}
         setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
      </div>
      <div ref={confirmRidePopupRef} className='bg-white translate-y-full h-screen  w-full fixed bottom-0 z-10 px-3 py-6 pt-8'>
        <ConfirmRidePopup  setRidePopupPanel={setRidePopupPanel}  ride={ride} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
      </div>


    </div>
  )
}

export default CaptainHome
