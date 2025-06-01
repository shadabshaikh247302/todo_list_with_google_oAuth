
const { default: mongoose } = require("mongoose");

const todoSchema = mongoose.Schema({
    tittle:{
        type:String,
        // required:true
    },
   
    day:{
        type:String
    },
    month:{
        type:String
    },
    year :{
        type : String
    },
    creator:{
        type:String,
        required:true
    }
})
const TDschema = mongoose.model("TDschem",todoSchema)
module.exports = TDschema
