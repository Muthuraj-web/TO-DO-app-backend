const express = require('express')
const router = express.Router()
const Model = require('../Model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/',async(req,res)=>{
    try{
        const user = await Model.findOne({email:req.body.email})
        if(user){
            const compare = await bcrypt.compare(req.body.password,user.password)
            if(compare){
                const token = jwt.sign({_id:user._id,username:user.username},"jwt-private-key")
                res.send({token})
            }
            else{
                res.send({error:"invalid email or Password"})
            }
        }
        else res.send({error:"invalid email or Password"})
    }
    catch(er){
        res.send({error:er.message})
    }
})

module.exports=router