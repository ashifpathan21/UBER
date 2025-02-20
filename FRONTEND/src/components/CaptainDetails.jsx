import React , {useContext} from 'react'
import captainIMG from '../assets/captain.jpg'
import { CaptainDataContex } from '../contex/CaptainContex'
const CaptainDetails = () => {

const {captain } = useContext(CaptainDataContex)
  


  return (
    <div>
       <div className='flex w-full flex-col justify-between p-3'>

<div className='w-full flex items-center justify-between p-1'>
  <img className='w-12 rounded-full object-cover h-12' src={captainIMG}alt="" />

  <h4 className=' text-lg   p-2  font-semibold text-start uppercase'>{`${captain.fullname.firstname} ${captain.fullname.lastname}`}</h4>
 
  <div className='p-2 bg-gray-200 rounded-lg text-center my-1' >
  <h4 className='text-xl font-semibold'>₹595.20</h4>
  <p className='text-sm'>Earned</p>
</div>
</div>



<div className='flex justify-between w-full mt-4 px-3 '>
  <div className='text-center'>
    <i className='font-semibold text-xl ri-timer-2-line'></i>
    <h5 className='text-lg font-semibold' >10.2</h5>
    <p  className='text-sm text-gray-600'>Hours Online</p>
  </div>
  <div className='text-center'>
    <i className='font-semibold text-xl ri-speed-up-line'></i>
    <h5  className='text-lg font-semibold'>120 KM</h5>
    <p className='text-sm text-gray-600'>Total Distance</p>
  </div>
  <div  className='text-center'>
    <i className='font-semibold text-xl ri-booklet-line'></i>
    <h5 className='text-lg font-semibold'>Booklet</h5>
    <p className='text-sm text-gray-600'>Booklet</p>
  </div>
</div>

</div>



    </div>
  )
}

export default CaptainDetails
