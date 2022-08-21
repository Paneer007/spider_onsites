const userdataRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User= require('../models/user')
const getToken = (request)=>{
    let authorization = request.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer')){
        return authorization.substring(7)
    }
    else{
        return false
    }
}
userdataRouter.get('/',async(req,res)=>{
    const token = getToken(req)
    if(!token){
        return res.status(400).send({message:"enter valid credentials"})
    }
    const decodedToken = jwt.verify(token,process.env.SECRET)
    const person = await User.findById(decodedToken.id).populate('Books')
    return res.status(200).send(person)
})
module.exports= userdataRouter
