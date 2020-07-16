const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const login = require('./Router/login')
const register = require('./Router/register')
const data = require('./Router/data')
require('dotenv').config()
const {DBNAME,PASS} = process.env
mongoose.connect(`mongodb+srv://taskboom:${PASS}@cluster-5h32t.gcp.mongodb.net/${DBNAME}?retryWrites=true&w=majority`,{useFindAndModify:false,useUnifiedTopology:true,useNewUrlParser:true,useCreateIndex:true})
  .then(()=>{console.log("yes connected")})  
  .catch((res)=>{console.log(res)})

app.use(cors())
app.use(express.json())
app.use('/auth/login',login)
app.use('/auth/register',register)
app.use('/data',data)
app.all("/", (req, res) => {
   res.send("Hello  There!.")
})
app.listen(process.env.PORT)
