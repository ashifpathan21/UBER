import React, { useContext, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SocketContext } from '../contex/SocketContex';
import bg from '../assets/home.gif';
import car from '../assets/car.png';
import 'remixicon/fonts/remixicon.css';

const Riding = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ride = location.state; // received ride data
  const socket = useContext(SocketContext);

  // Memoized navigation function
  const handleNavigation = useCallback(() => {
    navigate('/home');
  }, [navigate]);

  useEffect(() => {
    // Event listener को एक बार ही सेट करें
    socket.once('ride-ended', (endedRide) => {
      console.log('Ride ended event received', endedRide);
      handleNavigation();
    });

    // Cleanup function: इवेंट लिसनर को हटाने के लिए
    return () => {
      socket.off('ride-ended');
    };
  }, [socket, handleNavigation]); // Dependencies में socket और navigation function

  return (
    <div className="h-screen">
      {/* Home Button */}
      <div
        onClick={handleNavigation}
        className="fixed m-3 h-10 w-10 bg-white flex items-center justify-center rounded-full"
      >
        <i className="ri-home-5-line"></i>
      </div>

      {/* Background Image */}
      <div className="h-1/2 w-full">
        <img className="h-full w-full object-cover" src={bg} alt="" />
      </div>

      {/* Ride Details */}
      <div className="h-1/2 p-3">
        <div className="flex mb-3 justify-between items-center p-1">
          <img className="h-16" src={car} alt="" />
          <div className="flex flex-col p-1 text-right">
            <h2 className="text-lg font-medium">
              {ride?.captain?.fullname?.firstname + ' ' + ride?.captain?.fullname?.lastname}
            </h2>
            <h4 className="text-xl font-semibold -my-1">{ride?.captain?.vehicle?.plate}</h4>
          </div>
        </div>

        <div className="flex flex-col gap-2 justify-between items-center">
          <div className="w-full flex flex-col justify-between gap-2 mb-5">
            <div className="flex justify-start gap-4 border-b py-2 items-center">
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                <p className="text-sm -mt-1 text-gray-600">{ride?.destination}</p>
              </div>
            </div>
            <div className="flex justify-start gap-4 py-2 items-center">
              <i className="text-lg ri-currency-line"></i>
              <div>
                <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
                <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <button className="w-full py-2 text-lg text-white font-semibold rounded-lg bg-green-500">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
