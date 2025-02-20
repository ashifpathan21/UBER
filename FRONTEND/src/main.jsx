import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContex from './contex/UserContex.jsx'
import CaptainContex from './contex/CaptainContex.jsx'
import SocketContex from './contex/SocketContex.jsx'

createRoot(document.getElementById('root')).render(
    <SocketContex>
      <CaptainContex>
        <UserContex>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserContex>
      </CaptainContex>
    </SocketContex>
)
