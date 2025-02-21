import React ,{useState} from 'react'

import user from '../assets/user.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const FinishRide = (props) => {
const navigate = useNavigate()

    async function endRide(){

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
            rideId: props.ride._id
        }, {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });


        if(response.status === 200){
         
            navigate('/captain-home')
        }

    }

  return (
    <div>


            <h5 onClick={() => {
                props.setFinishRidePanel(false)

            }}
                className='p-1 h-10 bg-gray-200 flex justify-center items-center rounded-xl  rotate-90  text-center absolute mt-2  top-0  mx-auto text-3xl text-gray-500  '>
                <i className=' ri-arrow-down-wide-line'></i>
            </h5>
            <h3 className='text-2xl font-semibold mt-10  mb-5'>Finish this Ride  </h3>

            <div className='flex items-center px-3 mb-2 rounded-lg  justify-between gap-2'>

                <div className='flex mb-2 items-center justify-between p-3'>
                    <img className='w-12 rounded-full object-center object-cover h-12' src={user} alt="" />

                    <h4 className=' text-xl ml-5  p-2 font-semibold text-center '>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h4>


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
                            <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600 '>Cash Cash</p>
                        </div>
                    </div>
                </div>



                <div className=' w-full  fixed bottom-10 gap-3 flex flex-col justify-center items-center '>
                <button
                           onClick={
                            endRide
                           }
                            className='w-[95%] flex  justify-center  py-2 text-lg text-white font-semibold rounded-lg  bg-amber-500' >
                            Finish  Ride
                        </button>

                        <p className='text-sm text-gray-600 p-2'>Click on Finish Ride if you have completed the payment  </p>
                </div>
            </div>
        </div>
  )
}

export default FinishRide
