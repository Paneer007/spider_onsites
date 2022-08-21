const mongoose= require('mongoose')
const userSchema = new mongoose.Schema({
    Email:String,
    Password:String,
    Books:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Book"
        }
    ]
})
module.exports=mongoose.model('User',userSchema)