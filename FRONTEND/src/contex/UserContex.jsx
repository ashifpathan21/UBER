import React, { createContext, useState } from 'react'

export const UserDataContex = createContext();



const UserContex = ({ children }) => {


  
const [user , setUser] = useState({
  email:"",
  fullname:{
    firstname:"",
    lastname:""
  }
});




  return (
    <div>
      <UserDataContex.Provider value={{user , setUser}}>
        {children}
      </UserDataContex.Provider>
    </div>
  )
}

export default UserContex
