    const mongoose = require("mongoose")
exports.mongoDBconnect = async (req,res)=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL)
        if(connect){
            console.log("mongoDBConnected")
        }
    } catch (error) {
        console.log(error)
    }
}   