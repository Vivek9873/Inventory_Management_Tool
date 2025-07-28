
const mongoose = require("mongoose")
const MONGODB_URI = process.env.MONGODB_URI;

const connectToDB = async()=>{
    try{
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDb connected successfully")

    }
    catch(err){
        console.log("Connection Failed due to ",err);
        throw new Error("Connection Failed due to ",err);
    }
}

module.exports = connectToDB;