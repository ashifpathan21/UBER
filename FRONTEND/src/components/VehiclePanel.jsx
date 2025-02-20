import React from 'react'
import moto from '../assets/moto.jpg'
import auto from '../assets/auto.jpg'
import car from '../assets/car.png'
const VehiclePanel = (props) => {

  const {fare } = props ;

 
  return (
  


    <div>
     
          
          <h5 onClick={() => {
            props.setVehiclePanel(false)
          }}
           className='p-1 text-center absolute top-0 w-[90%] mx-auto text-3xl text-gray-500  '>
          <i className=' ri-arrow-down-wide-line'></i>
            </h5> 
       
       <h3 className='text-2xl font-semibold  mt-3 mb-5'>Choose a vehicle</h3>
      
      
        <div onClick={() => {
          props.setVehicleType('car')
          props.setVehiclePanel(false)
          props.setConfirmRidePanel(true)
        }} className='active:border-black border-white border-2 rounded-xl  flex p-3 w-full mb-2 item-center justify-between '>
          <div className='rounded-full mr-2  flex justify-center items-center bg-[#eee] ' >
            <img className='h-14' src={car} alt="" />
          </div>

          <div className='flex w-1/2 flex-col '>
            <h4 className='text-lg font-medium'>UberGo <span><i className='ri-user-3-fill'></i>4</span> </h4>
            <h5 className='text-md '>2 mins away</h5>
            <p className='text-xs text-gray-900'>Affordable , Compact Rides</p>
          </div>
          <h2 className='text-xl font-semibold flex items-center ml-2'>{ fare && `₹${props.fare['car']}`}</h2>
        </div>

        <div onClick={() => {
          props.setVehicleType('auto')
          props.setVehiclePanel(false)
          props.setConfirmRidePanel(true)
        }} className='active:border-black  border-white border-2 rounded-xl  flex p-3 w-full mb-2 item-center justify-between '>
          <div className='rounded-full mr-2  flex justify-center items-center bg-[#eee] ' >
            <img className='h-14' src={auto} alt="" />
          </div>

          <div className='flex w-1/2 flex-col '>
            <h4 className='text-lg font-medium'>Auto <span><i className='ri-user-3-fill'></i>3</span> </h4>
            <h5 className='text-md '>3 mins away</h5>
            <p className='text-xs text-gray-900'>Affordable Ride</p>
          </div>
          <h2 className='text-xl font-semibold flex items-center ml-2'>{ fare && `₹${props.fare['auto']}`}</h2>
        </div>


        <div onClick={() => {
          props.setVehicleType('motorcycle')
          props.setVehiclePanel(false)
          props.setConfirmRidePanel(true)
        }} className='active:border-black border-white border-2 rounded-xl  flex p-3 w-full mb-2 item-center justify-between '>
          <div className='rounded-full mr-2  flex justify-center items-center bg-[#eee] ' >
            <img className='h-14' src={moto} alt="" />
          </div>

          <div className='flex w-1/2 flex-col '>
            <h4 className='text-lg font-medium'>Moto <span><i className='ri-user-3-fill'></i>1</span> </h4>
            <h5 className='text-md '>1 mins away</h5>
            <p className='text-xs text-gray-900'>Affordable Motorcycle Rides</p>
          </div>
          <h2 className='text-xl font-semibold flex items-center ml-2'>{ fare && `₹${props.fare['motorcycle']}`}</h2>
        </div>


      </div>


  )
}

export default VehiclePanel
