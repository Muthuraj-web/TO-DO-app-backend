const mongoose = require('mongoose')
const dataSchema={
    task:String,
    label:String,
    status:Boolean,
    important:Boolean,
    created:{dd:Number,mm:Number,yy:Number},
    due:{dd:Number,mm:Number,yy:Number}

}
const userSchema=mongoose.Schema({
    email:{
        unique:true,
        type:String
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true     
    },
    data:[dataSchema]
})
const Model = mongoose.model('users',userSchema)
module.exports = Model