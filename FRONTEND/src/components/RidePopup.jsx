import React from 'react'
import user from '../assets/user.png'

const RidePopup = (props) => {
    return (
        <div>

            <h3 className='text-2xl font-semibold   mb-5'>New Ride Available !! </h3>
         
         <div className='flex items-center w-full px-1 mb-2 rounded-lg  bg-yellow-400 justify-between gap-2'>

         <div className='flex mb-2 items-center justify-between p-3'>
             <img className='w-12 rounded-full object-center object-cover h-12' src={user} alt="" />
           
             <h4 className=' text-medium ml-2 w-full  p-1 font-semibold  uppercase '>{`${props.ride?.user.fullname.firstname} ${props.ride?.user.fullname.lastname}`}</h4>
            
           
           </div>

           <h5 className='text-gray-900 text-lg font-semibold'>12.2 KM</h5>
         </div>
        
           

            <div className='flex flex-col gap-2  justify-between items-center '>



                <div className='w-full flex flex-col justify-between gap-2 mb-5'>

                    <div className='flex justify-start gap-4 border-b py-2 items-center'>
                        <i className='text-lg ri-map-pin-2-fill'></i>
                        <div>

                            <p className='text-sm -mt-1 text-gray-600 '>{props.ride?.pickup}</p>
                        </div>
                    </div>

                    <div className='flex justify-start gap-4 border-b py-2 items-center'>
                        <i className='text-lg ri-map-pin-2-fill'></i>
                        <div>
                            <p className='text-sm -mt-1 text-gray-600 '>{props.ride?.destination}</p>
                        </div>
                    </div>

                    <div className='flex justify-start gap-4  py-2 items-center'>
                        <i className='text-lg ri-currency-line'></i>
                        <div>
                            <h3 className='text-lg font-medium'>{`₹${props.ride?.fare}`}</h3>
                            <p className='text-sm -mt-1 text-gray-600 '>Cash Cash</p>
                        </div>
                    </div>
                </div>



                <div className='flex w-full justify-between gap-3'>
                    <button
                    onClick={ () => {
                       props.setRidePopupPanel(false)
                    }}

                        className='w-full py-2 text-lg text-white font-semibold rounded-lg  bg-gray-500 ' >
                        Ignore 
                    </button>
                    <button
                        onClick={ () => {
                            props.setConfirmRidePopupPanel(true)
                       props.confirmRide()
                        }}
                        className='w-full py-2 text-lg text-white font-semibold rounded-lg  bg-green-500 ' >
                       Accept
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RidePopup
