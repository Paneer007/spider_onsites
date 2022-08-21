require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const loginRouter = require('./controller/loginRouter')
const signupRouter = require('./controller/signupRouter')
const bookRouter = require('./controller/bookRouter')
try{
    mongoose.connect(process.env.MONGO_URL)
    console.log('no error') 
}catch(error){
    console.log('error')
}
app.use(express.json())
app.use(cors())
app.use('/api/login',loginRouter)
app.use('/api/signup',signupRouter)
app.use('/api/book',bookRouter)
module.exports = app