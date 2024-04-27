const express = require('express');
const {workflowModel} = require("../model/workflow.model")

const workflowroute = express.Router()

workflowroute.get("/",async(req,res)=>{
    try {
        const ans = await workflowModel.find()
        res.json(ans)
        
    } catch (error) {
        res.send({
            "msg":error.message
        })
    }
})


workflowroute.post("/",async(req,res)=>{
    console.log(req.body)
    try {
        const data = new workflowModel(req.body)
        await data.save();
        res.send({
            message: "post req successful",
            data: data
        })
    } catch (error) {
        res.send({
            "msg":error.message
        })
    }
})
module.exports = {workflowroute}