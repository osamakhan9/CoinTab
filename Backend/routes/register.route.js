const express = require("express")
const UserModel = require("../model/user.model")
const register = express.Router()

register.post("/",async(req,res)=>{
    const {email,password} = req.body
    const isPresent = await UserModel.findOne({email:email})
    if(isPresent){
        return res.send({message:"This email has been used try to another email",signedUp:false})
    }
    const user = UserModel({email:email,password:password})
    await user.save()
    return res.send({message:"User registered successfully",signedUp:true})
})

module.exports = register