const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require('dotenv').config()
const app = express()
const registerRouter = require("./routes/register.route")
const loginRouter = require("./routes/login.route")
const port = process.env.PORT

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Welcome to Server")
})
app.use("/register",registerRouter)
app.use("/login",loginRouter)





app.listen(port,async()=>{
    await mongoose.connect(process.env.DB_URL)
    console.log(`server started`)
    console.log(`listen at http://localhost:${port}`);
})