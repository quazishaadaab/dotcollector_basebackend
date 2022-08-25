import app from "./server.js"

import mongodb from "mongodb"
import dotenv from "dotenv"
import ControllerDAO from "./dao/controllerDAO.js" //connects to restaurant API      
dotenv.config()
//initialize mongodb
const MongoClient = mongodb.MongoClient
//initialize port specefied in .env file. server port is 8000

//set custmized properties for database
MongoClient.connect(//connects to database
  process.env.RESTREVIEWS_DB_URI,//links to the URI database link in mongodb
  {
    maxpoolSize: 50,//only allow 50 ppl at once to acess server/database
    wtimeoutMS: 2500,//quit afer 2500 milliseconds
    useNewUrlParser: true } //parse the URL
  )
  .catch(err => { //catch any error if database connection goes wrong
    console.error(err.stack)
    process.exit(1)
  })
  .then(async client => { // async client i dont know much about
    await ControllerDAO.injectDB(client) //    // before anything loads, we connect to the restaurants collection.
//if promise is fufilled(connection succesful then we to the below)
 


app.listen(process.env.PORT || 5000, () => {
  console.log(`listening on port ${process.env.PORT}`) 
  //prints which port is being used
})


// setTimeout(function(){sandbox.listen(canvasport, () => {
//   console.log(`listening on port  ${canvasport}`); //prints which port is being used
//  })},2000)





// setTimeout(sandbox.listen(canvasport, () => {
//   console.log(`listening on port  ${canvasport}`); //prints which port is being used
// }),10000)
    

  })

  //index.js connects our reviews/restaurants API from the DAO files.



// app.listen(1337,function(){
//     console.log('Listening at port 1337');
// });