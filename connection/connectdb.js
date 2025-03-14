const mongoose = require("mongoose");


module.exports.connectDB = async(URI)=>{
    try{
        console.log("connecting db");
        await mongoose.connect(URI)
        console.log("connected db")
    }catch(err){
        console.log(err.message)
    }
}