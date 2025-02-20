import React from 'react'
import motorcycle from '../assets/moto.jpg'
import auto from '../assets/auto.jpg'
import car from '../assets/car.png'

const DriverComing = (props) => {
    let logo ;
    
    if(props.vehicleType === 'car'){
      logo = car ;
    }else if(props.vehicleType === 'auto'){
      logo = auto ;
    }else{
      logo = motorcycle
    }
    


    return (
        <div className='mb-12'>

            <h5 onClick={() => {
                props.setComingPanel(false)

            }}
                className='p-1 text-center absolute top-0 w-[90%] mx-auto text-3xl text-gray-500  '>
                <i className=' ri-arrow-down-wide-line'></i>
            </h5>

            <div className='flex mb-3 justify-between items-center p-3'>
                <img className='h-16' src={logo} alt="" />
                <div className='flex flex-col p-1 text-right '>
                    <h2 className='text-medium uppercase  font-medium '>{props.ride?.captain.fullname.firstname + " " + props.ride?.captain.fullname.lastname}</h2>
                    <h4 className='text-lg font-semibold uppercase -my-1'>{props.ride?.captain.vehicle.plate}</h4>
                    <h4 className='text-medium font-semibold uppercase '>OTP : {props.ride?.otp}</h4>

                </div>
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





            </div>
        </div>
    )
}

export default DriverComing
