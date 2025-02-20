import React, { useState, useRef, useEffect, useContext } from 'react'
import logo from '../assets/logo.png'
import bg from '../assets/home.gif'
import { useGSAP } from '@gsap/react'
import axios from 'axios'
import gsap from 'gsap'

import { SocketContext } from '../contex/SocketContex'
import {UserDataContex} from '../contex/UserContex'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmedRide from '../components/ConfirmedRide'
import WaitForDriver from '../components/WaitForDriver'
import DriverComing from '../components/DriverComing'
import { useNavigate } from 'react-router-dom'
const Home = () => {
 const navigate = useNavigate()

  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const confirmRidePanelRef = useRef(null);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const waitingRidePanelRef = useRef(null);
  const [waitingRidePanel, setWaitingRidePanel] = useState(false)
  const driverComingPanelRef = useRef(null)
  const [comingPanel, setComingPanel] = useState(false)
const [vehicleType , setVehicleType ] = useState()
  const [selected, setSelected] = useState('')
  const [suggestions, setSuggestions] = useState([]);
const [fare , setFare ]  = useState({})

const [rideDetail , setRideDetail] = useState({})
const {user } = useContext(UserDataContex)

const [ride , setRide] = useState(null)

const socket = useContext(SocketContext)


useEffect(()=> {
  if(socket && user._id)
  socket.emit('join' , {userType: 'user' , userId: user._id})
}, [socket , user._id])


socket.on('ride-confirmed' , ride => {
 setRide(ride)

 setConfirmRidePanel(false)
  setWaitingRidePanel(false);
  setComingPanel(true)
})


  async function getSuggestions(input) {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input },  // params को सही तरीके से पास करें
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // headers को object के रूप में पास करें
        }
      });


      return response.data;  // API से मिला डेटा रिटर्न करें
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      return null;  // एरर होने पर null रिटर्न करें
    }
  }


  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!selected) return;  // अगर selected empty है तो कुछ ना करें

      const input = selected === 'pickup' ? pickup : destination;
      if (input.trim() === '') return;  // खाली इनपुट पर API कॉल न करें

      try {
        if (input.length > 3) {
          const response = await getSuggestions(input);
          if (response) {
            setSuggestions(response || []); // response में predictions array हो सकती है
          }
        }

      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]); // एरर होने पर खाली array सेट करें
      }
    };

    fetchSuggestions();
  }, [pickup, destination]);



async function getFare() {

  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
    params: { pickup,destination },  // params को सही तरीके से पास करें
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}` // headers को object के रूप में पास करें
    }
  });

  setFare(response.data);
  
}


async function createRide(){
  
  const responce = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create` , {
    pickup ,
    destination ,
    vehicleType
  },{
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  } )
 
 setRideDetail(responce.data)


}




  const submitHandler = (e) => {
    e.preventDefault();

    getFare() ;

   setVehiclePanel(true) ;
   setPanelOpen(false) ;


  }

  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        display: "block"
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    } else {
      gsap.to(panelRef.current, {
        display: "none"
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
    }

  }, [panelOpen])

  useGSAP(function () {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }

  }, [vehiclePanel])

  useGSAP(function () {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }

  }, [confirmRidePanel])

  useGSAP(function () {
    if (waitingRidePanel) {
      gsap.to(waitingRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(waitingRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }

  }, [waitingRidePanel])

  useGSAP(function () {
    if (comingPanel) {
      gsap.to(driverComingPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(driverComingPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }

  }, [comingPanel])


  socket.on('ride-started', ride => {
    setComingPanel(false);
    navigate('/riding', { state: ride }); // pass ride data on navigate
  });


  return (
    <div className='overflow-hidden'>
      <div className='overflow-y-hidden relative h-screen w-screen'>
        <img className=' w-20  ml-2  mt-5 absolute  ' src={logo} />

        <div className='h-[100vh] bg-cover bg-center w-full '>
          <img className='h-full w-full object-fit object-cover' src={bg} alt="" />
        </div>
      </div>

      <div className=' h-screen w-full flex flex-col justify-end top-0 absolute '>

        <div className='  bg-white h-[35%] relative px-2 space-y-6 w-full p-5'>
          <h5 ref={panelCloseRef} onClick={() => { setPanelOpen(false) }} className='opacity-0 absolute top-6 right-6 text-2xl '>
            <i className=' ri-arrow-down-wide-line'></i>
          </h5>

          <h4 className='text-2xl font-semibold'> Find a trip     </h4>
          <form onSubmit={(e) => {
            submitHandler(e)
          }} >
            <div className='line absolute top-23 left-10 rounded-2xl h-15  w-1 bg-gray-800'> </div>

            <input

              value={pickup}
              onClick={() => {
                setPanelOpen(true);
                setSelected('pickup')
              }}
              onChange={(e) => {
                setPickup(e.target.value)
              }}
              required
              className='mb-3 bg-[#eee] px-12 py-2 text-base w-full rounded-lg' type="text" placeholder='Add a pickup Location' />
            <input
              value={destination}
              onClick={() => {
                setPanelOpen(true)
                setSelected('destination')
              }}
              onChange={(e) => {
                setDestination(e.target.value)
              }}
              required
              className='bg-[#eee] px-12 py-2 text-base w-full rounded-lg' type='text' placeholder='Enter your Destination' />

            <button className='mt-5 w-full py-2 text-lg text-white font-semibold rounded-lg  bg-black '>
              Find Trip
            </button>

          </form>
        </div>

        <div ref={panelRef} className='  h-[65%]  bg-white  hidden px-10 py-2 w-full '>
          <LocationSearchPanel setPanelOpen={setPanelOpen} setPickup={setPickup} setDestination={setDestination} suggestions={suggestions} selected={selected} />
        </div>


        <div ref={vehiclePanelRef} className='bg-white  translate-y-full w-full fixed bottom-0 z-10 px-3 py-6 pt-6'>
          <VehiclePanel setVehicleType={setVehicleType} fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
        </div>



        <div ref={confirmRidePanelRef} className='bg-white  translate-y-full w-full fixed bottom-0 z-10 px-3 py-6 pt-12'>
          <ConfirmedRide createRide={createRide} vehicleType={vehicleType} fare={fare} pickup={pickup} setVehiclePanel={setVehiclePanel} destination={destination} setWaitingRidePanel={setWaitingRidePanel} setConfirmRidePanel={setConfirmRidePanel} />

        </div>
        <div ref={waitingRidePanelRef} className='bg-white  translate-y-full w-full fixed bottom-0 z-10 px-3 py-6 pt-12'>
          <WaitForDriver  vehicleType={vehicleType} fare={fare} pickup={pickup} destination={destination}  setWaitingRidePanel={setWaitingRidePanel} />

        </div>
        <div ref={driverComingPanelRef} className='bg-white  translate-y-full w-full fixed bottom-0 z-10 px-3 py-6 pt-12'>
          <DriverComing  vehicleType={vehicleType} ride={ride} setComingPanel={setComingPanel} />

        </div>

      </div>



    </div>
  )
}

export default Home
