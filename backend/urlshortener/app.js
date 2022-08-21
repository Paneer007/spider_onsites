require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const urlRouter = require('./controller/urlRouter')
try{
    mongoose.connect(process.env.MONGO_URL)
    console.log('no error') 
}catch(error){
    console.log('error')
}
app.use(express.json())
app.use(cors())
app.use(express.static('build'))
app.use('/api/url',urlRouter)
app.use(cors())
module.exports = app