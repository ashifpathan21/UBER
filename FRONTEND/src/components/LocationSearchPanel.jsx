import React from 'react'
import 'remixicon/fonts/remixicon.css'



const LocationSearchPanel = (props) => {

  
    const {setPanelOpen ,setPickup,setDestination,suggestions, selected} = props ;




  return (
    <div className=' flex w-full flex-col justify-center items-start'>
      
      {/* this is a sample data  */}
      {suggestions.length > 0 && suggestions.map((item , index) => {
        return (
          <div
            onClick={()=>{
              setPanelOpen(true) ;

              if(selected === 'pickup'){
                 setPickup(item.description)


              }else{
                setDestination(item.description)
              }
             
            }}
            key={index} 
            className='flex w-full gap-2 border-2 p-3 border-white active:border-black rounded-xl justify-start my-2 items-center'
          >
            <h2 className='bg-[#eee] flex justify-center items-center mr-5 rounded-full h-10 w-10'> 
              <i className='ri-map-pin-fill'></i>
            </h2>
            <h4 className='text-md '>{item.description}</h4>
          </div>
        )
      })}
    </div>
  )
}

export default LocationSearchPanel
