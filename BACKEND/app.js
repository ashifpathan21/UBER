require('dotenv').config() ;
const cookieParser = require('cookie-parser')
const cors = require('cors');
const express = require('express')
const app = express() ;

const db = require('./config/database')
db() ;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

//

const captainRoutes = require('./routes/captain.routes')
const mapsRoutes = require('./routes/maps.routes')
const userRoutes = require('./routes/user.routes')
const rideRoutes = require('./routes/ride.routes')




app.use('/users' ,userRoutes)

app.use('/captains' , captainRoutes)

app.use('/maps' , mapsRoutes)

app.use('/rides' , rideRoutes)



module.exports = app