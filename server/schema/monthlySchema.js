
const { default: mongoose } = require("mongoose");

const monthlySchema = mongoose.Schema({
    tittle:{
        type:String,
    },
    creator:{
        type:String
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
const Mschema = mongoose.model("Mschema", monthlySchema);
module.exports = Mschema;
