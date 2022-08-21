const mongoose = require('mongoose')
const UrlSchema = new mongoose.Schema({
    url:String,
    uid:String,
})
module.exports = mongoose.model('Url',UrlSchema)
