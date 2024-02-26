//Loads .env file contents into process.env by default.
require('dotenv').config()
//import express
const express =require('express')
//import cors
const cors =require('cors')
//import route
const router =require('./Router/route')
//db connection import
const db=require('./DB/connection')
const pfServer=express()
pfServer.use(cors())
pfServer.use(express.json())//Returns midddleware that only parses json
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads')) 
//server listen
//port creation
const PORT= 4000 || process.env.PORT
pfServer.listen(PORT,()=>{
    console.log('Listening on port ' +PORT);
})

//http=get resolving to http :// localhost/4000
pfServer.get("/",(req,res)=>{
res.send('<h1>Game Store is started</h1>')
})