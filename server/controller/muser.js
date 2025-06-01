const Mschema = require("../schema/monthlySchema")

exports.addTaskMonthly = async (req,res)=>{
    try {
        const data = await Mschema({...req.body})    
        const saveData = data.save()
        res.send({data,msg:"added the data"})
    } catch (error) {
        console.log(error);
    }
}
exports.getTaskMonthly = async (req,res)=>{
    try {
        const data = await Mschema.find({creator:req.params.id})
        console.log(req.params.id)
        res.send({data,msg:"Retrieve data"})
    } catch (error) {
        console.log(error);
    }
}

exports.deleteTaskMonthly = async(req,res)=>{
    try {
        const data = await Mschema.findByIdAndDelete(req.params.id)
        res.send({data,msg:"Task deleted successfully!"})
    } catch (error) {
        console.log(error)
    }
}