const mongoose = require("mongoose");

const workflowSchema = mongoose.Schema({
    workflowid: {type: String, required:true},
    workfloworder: {type: Array, required:true}
})

const workflowModel = mongoose.model("workflow",workflowSchema);

module.exports = {workflowModel};