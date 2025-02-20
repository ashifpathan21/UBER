const express = require('express') 
const router = express.Router() 
const {body , query} = require('express-validator')
const rideController = require('../controllers/ride.controller')
const authMiddleware = require('../middlewares/auth.middleware')
router.post('/create' , 
authMiddleware.authUser ,
    body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid type '),

    rideController.createRide
)


router.get('/get-fare' ,  query('pickup').isString().isLength({min:3}).withMessage('Origin length must be at least 3 character'),
    query('destination').isString().isLength({min:3}).withMessage('Destination length must be at least 3 character')
, authMiddleware.authUser , rideController.getFare)


router.post('/confirm' , authMiddleware.authCaptain , 
    body('rideId').isMongoId().withMessage('Invalid Ride ID'),
 rideController.confirmRide

)

router.get('/start-ride' , authMiddleware.authCaptain , 
    query('rideId').isMongoId().withMessage('Invalid Ride ID'),
 query('otp').isString().isLength({min:6 , max:6}).withMessage('Invalid OTP')
 ,   rideController.startRide)


 router.post('/end-ride' ,
    authMiddleware.authCaptain ,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.endRide 
  )


module.exports = router ;