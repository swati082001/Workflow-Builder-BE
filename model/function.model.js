const mongoose = require("mongoose");

const functionSchema = mongoose.Schema({
    csvdata:{type:String,required:true},
    workflowid:{type:String,required:true}
})

const functionModel= mongoose.model("function",functionSchema);

module.exports = {functionModel};