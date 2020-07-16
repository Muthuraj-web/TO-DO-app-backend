const express = require('express')
const Model = require('../Model')
const Router = express.Router()
const jwt = require('jsonwebtoken')

Router.post('/',async(req,res)=>{
    try{
        const {_id} = jwt.decode(req.body.jwt)
        const result = await Model.findById(_id,{_id:0,data:1,username:1})
        res.send(result.data)
        res.end()
    }
    catch(ex){
        console.log(ex.message)
    }
})
Router.put('/new',async(req,res)=>{
    try{
        const {_id}  = jwt.decode(req.body.jwt)
        const result = await Model.findById(_id,{_id:0,data:1})
        result.data.push(req.body.newData)
        await Model.updateOne({_id:_id},{$set:{data:result.data}})
        const newResult = await Model.findById(_id,{_id:0,data:1})
        res.send(newResult.data)
        res.end()
    }
    catch(ex){
        res.send(ex.message)
    }
})
Router.put('/changes',async(req,res)=>{
    try{
        const {_id}  = jwt.decode(req.body.jwt)
        await Model.findOneAndUpdate({_id},{$set:{data:req.body.data}},{_id:0,data:1})
        res.end()
    }
    catch(ex){
        res.send(Ex.message)
    }
})
module.exports=Router