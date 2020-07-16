const express = require('express')
const router = express.Router()
const hash = require('../hash')
const jwt = require('jsonwebtoken')
const Model = require('../Model')

router.post('/',async(req,res)=>{
    try{
        req.body.password = await hash(req.body.password)
        const isUser = await Model.findOne({email:req.body.email})
        if (isUser) throw new Error("Already a user registered with this email ID")
        const newUser = await new Model(req.body).save()
        res.send({token:jwt.sign({_id:newUser._id,username:newUser.username},'jwt-private-key')})
    }
    catch(er){
        res.send({error:er.message})
    }
})

module.exports=router