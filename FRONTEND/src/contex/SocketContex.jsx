import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();
const socket = io(`https://uber-backend-4zhe.onrender.com`); // change URL as required
const SocketContex = ({ children }) => {
 

  useEffect(() => {
    
  

    socket.on('connect', () => {
      console.log('connected to server');
    });
    socket.on('disconnect', () => {
      console.log('disconnected to server');
    } );

   
  },[]);



  return (
    <SocketContext.Provider value={ socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContex;
