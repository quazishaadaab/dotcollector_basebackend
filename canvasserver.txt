import express from "express";
import cors from "cors";
import path from "path";

import dotrouter  from "./api/route.js";
import axios from "axios";


import mongodb from "mongodb"
import dotenv from "dotenv"
import ControllerDAO from "./dao/controllerDAO.js" //connects to restaurant API      

let ports = 2000;
dotenv.config()

  const sandbox = express();
sandbox.use(cors());

 sandbox.use(express.json());
 sandbox.use("/", dotrouter);

const __dirname = path.resolve();
 console.log(__dirname);
// const id = Controller.data;

// var id= Controller.giveData()
       
const BASE_URL = "http://localhost:5000";

// const retriveArray()=>{

//   return data 

// }

    // setIdArray(['123'])



  
    function setIdArray(data){
      // console.log(data)
      roomid_array=data
  }
let roomid_array

  var buffer=[]

   async function getRooms(response){


 
// to wait for all the data to collect in one array
    
let res = await response?.data;

     //to only map once there is a result variable with all data fields collected
                      res?.map((r) => { 
                     buffer?.push(r.roomid)   
                    setIdArray(buffer)
                    async function createSandboxElement(id){
                      return sandbox.use(`/rooms/${id}`, express.static(__dirname + "/src"));
                    };
                    
                    
                      
                      
                      
                         createSandboxElement(r?.roomid);
                      
                    // tempid=await buffer2
  // console.log('buffer2:'+buffer2 + " tempid: "+tempid)
                                        });
 console.log(buffer)

  
    // console.log( "tempid1: "+tempid)
};



try{
// need to put await here due to it being a promise. if we dont , the result array will not be filled
await axios.get(`${BASE_URL}/getAllRooms`).then(async response=>{
    getRooms(response)
  })

}catch(error) {
  console.log(error)
}

  // id.push(room_id_data)



console.log('---ENTERING ID ----')

console.log('ID :'+ roomid_array)

// data.map((response)=>{
// console.log(response.roomid)
// id.append(response.roomid)

// })
// const id=['df87dad5-05ea-4adb-9f9f-178111e920f3','b7c1dd1f-69a0-4469-90c6-8fa241ccec76']

// axios.post(`${BASE_URL}/getRoomId`)

// console.log(`fuck em how ${id}`);

// sandbox.use(`/rooms/df87dad5-05ea-4adb-9f9f-178111e920f3`,express.static(__dirname + '/src'))
// sandbox.use(`/rooms/b7c1dd1f-69a0-4469-90c6-8fa241ccec76`,express.static(__dirname + '/src'))

  





    // http://http://localhost:1337/rooms/${roomId}/home.html

    // initialize mongodb
    const MongoClient = mongodb.MongoClient;
    //initialize port specefied in .env file. server port is 8000

    //set custmized properties for database
    MongoClient.connect(
      //connects to database
      process.env.RESTREVIEWS_DB_URI, //links to the URI database link in mongodb
      {
        maxpoolSize: 50, //only allow 50 ppl at once to acess server/database
        wtimeoutMS: 2500, //quit afer 2500 milliseconds
        useNewUrlParser: true,
      } //parse the URL
    )
      .catch((err) => {
        //catch any error if database connection goes wrong
        console.error(err.stack);
        process.exit(1);
      })
      .then(async (client) => {
        // async client i dont know much about
        await ControllerDAO.injectDB(client); //    // before anything loads, we connect to the restaurants collection.
        //if promise is fufilled(connection succesful then we to the below)

        sandbox.listen(ports, () => {
          console.log(`listening on port 2000`); //prints which port is being used
        });
      });

// index.js connects our reviews/restaurants API from the DAO files.

// app.listen(1337,function(){
//     console.log('Listening at port 1337');
// });
export default sandbox
