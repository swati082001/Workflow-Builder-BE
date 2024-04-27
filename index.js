const express = require('express')
const cors = require('cors')
const connection = require("./configs/db")
const {workflowroute} = require("./routes/Workflow.route")
const {functionroute} = require("./routes/Function.route")
require('dotenv').config()


const app  = express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("homepage")
})

app.use("/workflow",workflowroute)
app.use("/function",functionroute)

app.listen(process.env.PORT,async()=>{
    try {
        await connection;
        console.log("Connected to DB")
        
    } catch (error) {
        console.log(error.message)
    }

    console.log(`The server is running on port ${process.env.PORT}`);

})