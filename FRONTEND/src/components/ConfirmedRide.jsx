import React from 'react'
import motorcycle from '../assets/moto.jpg'
import auto from '../assets/auto.jpg'
import car from '../assets/car.png'

const ConfirmedVehicle = (props) => {

let logo ;

if(props.vehicleType === 'car'){
  logo = car ;
}else if(props.vehicleType === 'auto'){
  logo = auto ;
}else{
  logo = motorcycle
}

  return (
    <div>

      <h5 onClick={() => {
        props.setVehiclePanel(true)
        props.setConfirmRidePanel(false)

      }}
        className='p-1 text-center absolute top-0 w-[90%] mx-auto text-3xl text-gray-500  '>
        <i className=' ri-arrow-down-wide-line'></i>
      </h5>


      <h3 className='text-2xl font-semibold  mt-3 mb-5'>Confirm Your Ride</h3>

      <div className='flex flex-col gap-2  justify-between items-center '>
        <img className='h-20' src={logo} alt="" />


        <div className='w-full flex flex-col justify-between gap-2 mb-5'>

          <div className='flex justify-start gap-4 border-b py-2 items-center'>
            <i className='text-lg ri-map-pin-2-fill'></i>
            <div>
            <p className='text-sm  text-gray-600 '>{props.pickup}</p>
            </div>
          </div>

          <div  className='flex justify-start gap-4 border-b py-2 items-center'>
            <i className='text-lg ri-map-pin-2-fill'></i>
            <div>
              
              <p className='text-sm -mt-1 text-gray-600 '>{props.destination}</p>
            </div>
          </div>

          <div  className='flex justify-start gap-4  py-2 items-center'>
            <i className='text-lg ri-currency-line'></i>
            <div>
              <h3 className='text-lg font-medium'>{ props.fare && `₹${props.fare[props.vehicleType]}`}</h3>
              <p className='text-sm -mt-1 text-gray-600 '>Cash Cash</p>
            </div>
          </div>
        </div>



        <button 
          onClick={()=>{

           props.createRide() ;
            
          
                  
            props.setWaitingRidePanel(true)
          }}
          className='w-full py-2 text-lg text-white font-semibold rounded-lg  bg-green-500 ' >
          Confirm
        </button>

      </div>
    </div>
  )
}

export default ConfirmedVehicle
