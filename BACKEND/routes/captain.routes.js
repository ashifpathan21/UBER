const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const captainController = require('../controllers/captain.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/register', [
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be 3 characters long'),
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6 character long '),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be 3 character long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be 3 char long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1 '),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid type ')
], captainController.registerCaptain)


router.post('/login',
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be 6 character long '),
    ],
    captainController.loginCaptain
)

router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile)

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain)


module.exports = router;