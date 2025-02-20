const rideService = require('../services/ride.service')
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket')
const rideModel = require('../models/ride.model')
module.exports.createRide = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { pickup, destination, vehicleType } = req.body;

    try {
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType });

        res.status(201).json(ride)

        const pickupCoordinate = await mapService.getAddressCordinate(pickup);



        // maps ka api nahi liya he isliye sahi location tracking nahi ho pa rahi to lat = 22.7195687  and lng = 75.8577258 se testing ki to work kar raha he 
        pickupCoordinate.ltd = 22.7195687;
        pickupCoordinate.lng = 75.8577258;


        const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinate.ltd, pickupCoordinate.lng, 10);

        ride.otp = '';

        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user')

        captainsInRadius.map(captain => {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })
        })


    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message })
    }


}


module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { pickup, destination } = req.query;

    try {
        const ride = await rideService.getFare({ pickup, destination });
        return res.status(201).json(ride)


    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message })
    }
}


module.exports.confirmRide = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { rideId } = req.body;

    try {

        const ride = await rideService.confirmRide({ rideId, captain: req.captain })

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })

        return res.status(200).json(ride)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}



module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain })



        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }


}


module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {rideId} = req.body ;

    try{
        const { Ride , userDetails} = await rideService.endRide({rideId , captain: req.captain})



           sendMessageToSocketId(userDetails.socketId , {
            event: 'ride-ended' ,
            data : Ride
           })

           return res.status(200).json(Ride)

    }catch(err){
        return res.status(500).json({message : err.message})
    }



}