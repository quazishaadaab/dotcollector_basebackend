import express from 'express'
import cors from "cors"

import router from "./api/route.js"
import path from 'path';

import ControllerDAO from './dao/controllerDAO.js';
import dotenv from "dotenv";

// import { dotrouter } from "./api/route.js";
import axios from "axios";

 const app = express()
app.use(cors())

app.use(express.json())



//get room id
// app.get(`/getRoomId/`,(req,res)=>{
// const d = req.body


// res.send(d)
// })


// app.post(`/getRoomId`,(req,res)=>{

// console.log(req.body)

// })
app.use("/",router)
// var id= Controller.giveData()
console.log(`server listening`   )

// app.listen(2000,function(){
//     console.log('Listening at port 1337');
// });




//serve static file
//  app.use(`/rooms/${id}`,express.static(__dirname +`/src`));



// app.get('/helloThere',function(request,response){


// })




export default app
