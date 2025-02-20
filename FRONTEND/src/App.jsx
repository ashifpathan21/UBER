import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Usersignup from './pages/Usersignup'
import Captainlogin from './pages/Captainlogin'
import Captainsignup from './pages/Captainsignup'
import Userlogin from './pages/Userlogin'
import Start from './pages/Start'
import UserProtectedWrappper from './pages/UserProtectedWrappper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'


const App = () => {
  return (
    <div >
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<Userlogin />} />
        <Route path='/signup' element={<Usersignup />} />
        <Route path='/captain-login' element={<Captainlogin />} />
        <Route path='/captain-signup' element={<Captainsignup />} />
        <Route path='/home' element={
        
        <UserProtectedWrappper>
            <Home />
          </UserProtectedWrappper>
        } />
        <Route path='/riding' element={
          <UserProtectedWrappper>
            <Riding />
          </UserProtectedWrappper>
        } />
      <Route path='/user/logout' element={
        <UserProtectedWrappper>
       <UserLogout/>
        </UserProtectedWrappper>
      }/>
    
    
      <Route path='/captain-home' element={
        <CaptainProtectedWrapper> 
             <CaptainHome/>
        </CaptainProtectedWrapper>
     } />
      <Route path='/captain-riding' element={
        <CaptainProtectedWrapper> 
             <CaptainRiding/>
        </CaptainProtectedWrapper>
     } />
    
    <Route path='/captain-logout' element={
      <CaptainProtectedWrapper>
        <CaptainLogout/>
      </CaptainProtectedWrapper>
    }/>
      </Routes>
    </div>
  )
}

export default App
