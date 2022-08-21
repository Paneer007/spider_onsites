const mongoose= require('mongoose')
const bookSchema = new mongoose.Schema({
    Name:String,
    Author:String,
})
module.exports=mongoose.model('Book',bookSchema)