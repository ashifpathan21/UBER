const mongoose = require('mongoose');
require('dotenv').config() ;

const dbConnect = async () => {
    try{
        await mongoose.connect(process.env.DB_URL)
        console.log("connected to data base");
    }catch(err){
        console.log("Failed to Connect with Database");
        process.exit(1);
    }
}

module.exports = dbConnect