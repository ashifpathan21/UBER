const axios = require('axios');
require('dotenv').config()
const captainModel = require('../models/captain.model')
module.exports.getAddressCordinate = async (address) => {

    const apiKey = process.env.MAP_API_KEY;
    const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${address}&key=${apiKey}`


    try {
        const response = await axios.get(url);

        if (response.data.status === 'OK') {

            const location = response.data.results[0].geometry.location
            return {
                ltd: location.lat,
                lng: location.lng
            }
        } else {
            throw new Error('Unable to fetch coordinates');
        }


    } catch (error) {
        console.error(error);
        throw error;
    }

}


module.exports.getDistanceTime = async (origin, destination) => {

    if (!origin || !destination) {
        throw new Error('Origin and Destination are required ')
    }

    const apiKey = process.env.MAP_API_KEY;

    const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?destinations=${destination}&origins=${origin}&key=${apiKey}`

    try {

        const responce =  await axios.get(url)

      

        if (responce.data.status === 'OK') {

            if (responce.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                throw new Error('No routes found')
            }

            return responce.data.rows[0].elements[0];
        } else {
            throw new Error('Unable to  fetch distance and time')
        }

    } catch (error) {
        console.error(error);
        throw error
    }



}



module.exports.getAutoCompleteSuggestions = async (input) => {
    if(!input){
        throw new Error('Input is required') ;
    }

    const apiKey = process.env.MAP_API_KEY;


    const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}`


    try{
 
        const response = await axios.get(url)

      

        if(response.data.status === 'OK'){
            return response.data.predictions ;
        }else{
            throw new Error('Unable to fetch suggestions')
        }


    }catch(error){
        console.error(error) ;
        throw error ;
    }
}



module.exports.getCaptainsInTheRadius = async (ltd , lng , radius) => {
//radius in KM


    const captains = await captainModel.find({
        //mongo db bana ke deta he 
        location:{
            $geoWithin:{
                $centerSphere: [ [ltd,lng] , radius / 6378.1]
            }
        }

    })

    return captains ;

}