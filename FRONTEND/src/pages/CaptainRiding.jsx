import React, { useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import bg from '../assets/home.gif';
import logo from '../assets/logocaptain.png';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css';
import FinishRide from '../components/FinishRide';

const CaptainRiding = () => {
  const finishRidePanelRef = useRef(null);
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const ride = state?.ride; // ride data passed from ConfirmRidePopup

  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(0)'
      });
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(100%)'
      });
    }
  }, [finishRidePanel]);

  return (
    <div className='h-screen'>
      <div className='bg-transparent fixed flex justify-between w-full items-center'>
        <img className='w-12 ml-4' src={logo} alt="Captain Logo" />
        <div
          onClick={() => {
            navigate('/captain-logout');
          }}
          className='m-3 h-10 w-10 bg-white flex items-center justify-center rounded-full'
        >
          <i className='ri-logout-box-r-line'></i>
        </div>
      </div>

      <div className='h-3/5 w-full'>
        <img className='h-full w-full object-cover' src={bg} alt="Ride Background" />
      </div>

      <div
        onClick={() => {
          setFinishRidePanel(true);
        }}
        className='h-2/5 relative bg-yellow-400 flex justify-between  items-center flex-col gap-2 p-8'
      >
        <h5 className='p-1 rotate-180 h-10 flex justify-center items-center rounded-xl absolute top-0 mx-auto text-3xl text-gray-500'>
          <i className='ri-arrow-down-wide-line'></i>
        </h5>
        <h4 className='px-3 my-1 mt-8 text-lg font-semibold'>
          {ride ? `${ride.pickup} to ${ride.destination}` : 'No Ride Data'}
        </h4>
        <button
          onClick={() => {
            setFinishRidePanel(true);
          }}
          className='w-full py-2 text-lg text-white font-semibold rounded-lg bg-green-500'
        >
          Complete Ride
        </button>
      </div>

      <div ref={finishRidePanelRef} className='bg-white translate-y-full h-screen w-full fixed bottom-0 z-10 px-3 py-6 pt-8'>
        <FinishRide ride={ride}  setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  );
};

export default CaptainRiding;
