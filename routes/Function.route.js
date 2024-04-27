const express = require('express');
const {functionModel} = require("../model/function.model")
const {workflowModel}  = require('../model/workflow.model')
const axios = require('axios');
const functionroute = express.Router()


async function postData(data){
    try {
        console.log(data,"data")
        let res = await axios.post(`https://workflow.requestcatcher.com/test`,data)
        return res
        
    } catch (error) {
        console.log(error)
    }

}

function filterData(csvData){
    return csvData.toLowerCase();
}

function convertData(csvData){
    const lines = csvData.split('\r\n'); // Split CSV into lines
    const headers = lines[0].split(','); // Extract headers from the first line
    const jsonData = [];

    // Loop through each line (excluding the header)
    for (let i = 1; i < lines.length; i++) {
        const columns = lines[i].split(','); // Split line into columns
        const row = {};
        // Loop through each column and map it to its respective header
        for (let j = 0; j < headers.length; j++) {
            row[headers[j]] = columns[j];
        }
        jsonData.push(row); // Push the row object to the JSON array
    }

    return jsonData;

}

function wait(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Wait is complete after 60 seconds");
        }, 60000);
    });

}

functionroute.post('/',async(req,res)=>{
    
    try {
        const functionpost = new functionModel(req.body)
        await functionpost.save();
        console.log(req.body.workflowid)
        let getWorkflowIdData = await workflowModel.find({ workflowid: req.body.workflowid });
        let order = getWorkflowIdData[0].workfloworder;
        console.log(order)
        let response = []
        for(let i=0;i<order.length;i++){
            let orderName = order[i].split("_");
            console.log(orderName[0]);
            if(orderName[0]=="start"){
                response.push({"start":"The start of the funtion"})
            }
            else if(orderName[0]=="filter"){
                //Call the filter data function
                let filtercsv = filterData(req.body.csvdata);
                response.push({"filter":filtercsv})
            }
            else if(orderName[0]=="wait"){
                 //Call the wait function
                 wait().then((message) => {
                    response.push({"wait": message})
                });
                 

            }
            else if(orderName[0]=="convert"){
                //Call the convert data function
                let filtercsv = filterData(req.body.csvdata);
                let convertcsv = convertData(filtercsv);
                response.push({"convert":convertcsv})

            }
            else if(orderName[0]=="post"){
                //Call the post data function
                let filtercsv = filterData(req.body.csvdata);
                let convertcsv = convertData(filtercsv);
                let postcsv = postData(convertcsv);
                response.push({"post":postcsv})

            }
            else if(orderName[0]=="end"){
                response.push({"end":"Workflow ended"})
                res.send({
                    "Message":"The workflow has finally been completed",
                    "data":response
                })
            }
        }

       
        
    } catch (error) {
        res.send({
            'Message': error.message
        })
    }
})



module.exports = {functionroute}