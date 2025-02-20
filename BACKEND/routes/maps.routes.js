const express = require('express') ;
const router = express.Router() ;
const authMiddleware = require('../middlewares/auth.middleware')
const mapController = require('../controllers/maps.controller')
const {query} = require('express-validator')



router.get('/get-coordinates' , 
    query('address').isString().isLength({min:3}).withMessage('Address length must be at least 3 character'), authMiddleware.authUser , mapController.getCoordinates )


router.get('/get-distance-time' ,
    query('origin').isString().isLength({min:3}).withMessage('Origin length must be at least 3 character'),
    query('destination').isString().isLength({min:3}).withMessage('Destination length must be at least 3 character')
, authMiddleware.authUser , mapController.getDistanceTime)



router.get('/get-suggestions' , 
    query('input').isString().isLength({min:3}),
    authMiddleware.authUser ,
    mapController.getAutoCompleteSuggestions
)

module.exports = router ;