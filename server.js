import express from 'express'
import cors from "cors"

import router from "./api/route.js"
import path from 'path';

import ControllerDAO from './dao/controllerDAO.js';
import dotenv from "dotenv";

// import { dotrouter } from "./api/route.js";
import axios from "axios";



import * as nodemailer from 'nodemailer'

import {google} from 'googleapis'

import email from './api/controller.js'

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



const CLIENT_ID = '345433280881-t1blvfjsg7rjsq7corcbevgu0eplbg5r.apps.googleusercontent.com'
const CLIENT_SECRET = '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'

const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
// const REFRESH_TOKEN='1//048z2BxrrvmmcCgYIARAAGAQSNwF-L9IrUmIXC6EYQtWuhl90S2wjrz7HvEqfGDBI6BTl_Vpe-FX7HzfmLQqgFgu6MbYd8NNxkqc'

//EXPIRES AFTER 7 DAYS, WILL NEED TO CREATE A NEW ONE
const REFRESH_TOKEN='1//04yDqjdbiikQ2CgYIARAAGAQSNwF-L9Ir1aBMGKOgD6wb-ICwDEhrj7UeTgeznSUWZIufzMrZw7JCyoY3dfO1lIPAfmW-EoxiNco'



const oAuth2Client= new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})


export async function sendMail(email,roomlink){

    try{
const accessToken=await oAuth2Client.getAccessToken()
console.log(accessToken)
const transport = nodemailer.createTransport({


    // kyjrexrrdiyrcqxz

    //Step 1 : auth
    service : 'gmail',
    auth:{

        type:'XOAuth2', //Changed from OAUTH2 to XOAUTH2 which is a different thing. idk what it is , but its a stackoverflow solution
        user:'shaadaabquazi@gmail.com',
        //since google disabled less secure apps, we need to use an app password for our mail service.
        pass:process.env.APP_PASSWORD,
        //the code below can be deleted and it the email service will still work.
        clientId:CLIENT_ID,
        clientSecret:CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken : accessToken
        }
})

console.log(email)
let mailOptions={

    from:' DotCollector <shaadaabquazi@gmail.com>',
    to : email,
    subject:'Join room',
    html: `<p>Click <a href=${roomlink}>here</a> to join a room</p>`
}



const result = await transport.sendMail(mailOptions)
console.log('res',result)
return result;

    }
    catch(e){console.log(e)}

}


// sendMail('bill.tomber@gmail.com','fuck')
// .then((res)=>console.log('Email sent',res))
// .catch((error)=> console.log(error.message))




// SEND EMAIL FUNCTIONALITY 











export default app
