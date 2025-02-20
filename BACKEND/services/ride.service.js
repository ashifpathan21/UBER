const rideModel = require('../models/ride.model')
const mapService = require('../services/maps.service')
const crypto = require('crypto');
const { sendMessageToSocketId } = require('../socket');
const userModel = require('../models/user.model');


async function getFare(pickup , destination){

    if(!pickup || !destination){
throw new Error("Pickup & destination are required")
    }

    const distanceTime = await mapService.getDistanceTime(pickup , destination ) ;
     
    const { distance, duration } = distanceTime; // assume distance in km and duration in minutes

    const fareForCar = ((5 + (distance.value * 2) + (duration.value * 0.5))/200.0).toFixed(2);
    const fareForAuto = ((3 + (distance.value * 1.5) + (duration.value * 0.5))/200.0).toFixed(2);
    const fareForMotorcycle = ((2 + (distance.value * 1) + (duration.value * 0.3))/200.0).toFixed(2);

    return {
        car: fareForCar,
        auto: fareForAuto,
        motorcycle: fareForMotorcycle
    };

}



function generateOtp(num) {
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    return otp;
}


module.exports.createRide = async ({ 
    user , pickup , destination , vehicleType
}) => {

if(!user || !pickup || !destination || !vehicleType){
    throw new Error('All fields are required')
}

const fare = await getFare(pickup , destination) ;
// console.log(generateOtp(6))
const ride = rideModel.create({
    user ,
    pickup ,
    destination ,
    otp:generateOtp(6),
    fare:fare[vehicleType]
})

return ride ;


}


module.exports.getFare = async ({pickup , destination})=>{

 const fare = await getFare(pickup , destination) ;

 return fare ;

}


module.exports.confirmRide = async ({
    rideId , captain
}) => {
    if(!rideId){
        throw new Error('Ride id is required')
    
    }


    await rideModel.findOneAndUpdate({
        _id: rideId
    } , {
        status: 'accepted' ,
        captain : captain._id
    })

  
    const ride = await rideModel.findOne({_id: rideId}).populate('user').populate('captain').select('+otp')

    if(!ride){
        throw new Error('Ride not found ');
    }
return ride ;

}


module.exports.startRide = async ({
    rideId , otp , captain
}) => {

    if(!rideId || !otp){
        throw new Error('Ride id and OTP are required')
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp') ;

    if(!ride){
        throw new Error('Ride not found ') ;
    }

    if(ride.status !== 'accepted'){
        throw new Error('Ride not accepted')
    }


    if(ride.otp !== otp){
        throw new Error('Invalid OTP')
    }

    await rideModel.findOneAndUpdate({
        _id : rideId
    } , {
        status : 'ongoing'
    },{
        new: true 
    })

    
    sendMessageToSocketId(ride.user.socketId , {
        event: 'ride-started' ,
        data:ride
    })

    return ride 

}



module.exports.endRide = async({
    rideId , captain
}) => {

    if(!rideId){
        throw new Error('Ride id is required')
    
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp') ;

    const userDetails = await userModel.findById(ride.user)


    if(!ride){
        throw new Error('Ride not found ')
    }

    if(ride.status !== 'ongoing'){
        throw new Error('Ride not ongoing')
    }

    // Update ride and return the updated document
    const Ride = await rideModel.findOneAndUpdate({
        _id : rideId
    } , {
        status : 'completed'
    } , {
        new: true
    });

    return { Ride , userDetails} ;

}