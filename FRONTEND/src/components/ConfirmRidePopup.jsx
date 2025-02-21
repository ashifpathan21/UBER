import React, { useState } from 'react'
import axios from 'axios'
import user from '../assets/user.png'
import { Link, useNavigate } from 'react-router-dom'
const ConfirmRidePopup = (props) => {

    const navigate = useNavigate()
    const [otp, setOtp] = useState('')

    const submitHandler = async (e) => {
        e.preventDefault();

        const response = await axios.get(`https://uber-backend-4zhe.onrender.com/rides/start-ride`, {
            params: {
                rideId: props.ride._id,
                otp: otp
            }
            ,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

      
        if (response.status === 200) {
            props.setConfirmRidePopupPanel(false);
            props.setRidePopupPanel(false);
            navigate('/captain-riding', { state: { ride: response.data } });
        }
    }



    return (


        <div>


            <h5 onClick={() => {
                props.setConfirmRidePopupPanel(false)

            }}
                className='p-1 h-10 bg-gray-200 flex justify-center items-center rounded-xl  rotate-90  text-center absolute mt-2  top-0  mx-auto text-3xl text-gray-500  '>
                <i className=' ri-arrow-down-wide-line'></i>
            </h5>
            <h3 className='text-2xl font-semibold mt-10  mb-5'>Summary </h3>

            <div className='flex items-center px-3 mb-2 rounded-lg  justify-between gap-2'>

                <div className='flex mb-2 items-center justify-between p-3'>
                    <img className='w-12 rounded-full object-center object-cover h-12' src={user} alt="" />

                    <h4 className=' text-xl ml-5  p-2 font-semibold text-center uppercase  '>{`${props.ride?.user.fullname.firstname} ${props.ride?.user.fullname.lastname}`}</h4>


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



                <div className=' w-full  fixed bottom-10 flex justify-center items-center '>

                    <form
                        onSubmit={(e) => {
                            submitHandler(e);
                        }}
                        className='gap-8 w-full flex flex-col items-center' >

                        <input
                            value={otp}
                            onChange={(e) => {
                                setOtp(e.target.value)
                            }}
                            required
                            className='bg-[#eee] px-12 py-2 text-base w-[80%] rounded-lg'
                            type="number" placeholder='Enter OTP' />


                        <button className='w-[95%] flex  justify-center  py-2 text-lg text-white font-semibold rounded-lg  bg-amber-500' >
                            Go to Pick Up
                        </button>
                    </form>






                </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopup
