import ControllerDAO from "../dao/controllerDAO.js";
import { EXECUTE_postUserInRooms,EXECUTE_postRooms,EXECUTE_getRoomsByUser,EXECUTE_setSpeaker,EXECUTE_setCreator } from "../postgres/index.js";


import {sendMail} from '../server.js'

class Controller {
  // constructor(realData){

  //     this.realData=realData || '';
  // }

  
  static async postRooms(req, res, next) {
    const roomid = await req.body.roomid;
    const roomname = await req.body.roomname;
    const room_type = await req.body.roomType
    res.json(req?.body); //this is not mandatory. it just shows reqbin or postman the data. POST requests mainly
    //just use req not res. res is more for GET

    console.log(req.body.roomid, req.body.roomname,req.body.room_type);

    //create the room in new row
    EXECUTE_postRooms(roomid,roomname,room_type)

    //add the person who created the room to the user list 
    ControllerDAO.inject(roomid, roomname,room_type);
    // inject a new empty dot array in rooms. This is required, or else the dots cannot be displayed in rooms when user first enters upon a room
    
    //needs to know the number of users 
    // ControllerDAO.injectDotInRoom(roomid,[[]])
    // this.realData= data;
  }
  
  static async getAllRooms(req, res, next) {
    const rooms = await ControllerDAO.getAllRooms();
    res.json(rooms);
    
  }


  static async getAllRoomsByUserId(req,res,next){
    const userid=await req.body.userid
    const rooms = await ControllerDAO.getAllRoomsByUserId(userid)
    // res.json(rooms)


    const result = await EXECUTE_getRoomsByUser(userid)
    res.json(result)

  }

  static async getRoomId(req, res, next) {
    res.json(req.body.roomId);
  }


  static async postAttribute(req,res,next){
const attributeArray = await req.body.attributes
const attributePackageName=await req.body.attributePackageName
const authorid=await req.body.authorid
const attributeid=await req.body.attributeid

ControllerDAO.postAttribute(attributeid,authorid,attributePackageName,attributeArray)

  }

  static async getAttribute(req,res,next){

const attributeid=await req.body.attributeid
  
    const attributeArray = await ControllerDAO.getAttribute(attributeid)
res.json(attributeArray)
  }



  static async postAttributeIdInRoom(req,res,next){

    const attributeid = await req.body.attributeid
    const roomid= await req.body.roomid

    ControllerDAO.postAttributeIdInRoom(roomid,attributeid)
    res.send('success')
  }
  

  static async getAttributeByAuthorId(req,res,next){

    const userid=await req.body.userid
      
    const attributeArray = await ControllerDAO.getAttributeByAuthorId(userid)
    res.json(attributeArray)
      }





  static async getUsersInRoom(req, res, next) {

    const roomid= await req.body.roomid
    const users = await ControllerDAO.getUsersInRoom(roomid);
    res.json({users});
  }




  static async getRoomById(req, res, next) {

    const roomid= await req.body.roomid
    const roomdata = await ControllerDAO.getRoomById(roomid);
    res.json({roomdata});
  }

  static async getUserById(req, res, next) {

const userid= await req.body.userid
const userinfo= await ControllerDAO.getUserById(userid)
res.json(userinfo)

}



  static async postUsersInRoom(req,res,next){
    const userid= await req.body.userid
    const username=await req.body.username
    const userPhoto=await req.body.userPhoto
    const roomid=await req.body.roomid

    const userDoc={
      userid:userid,
      username:username,
      userPhoto:userPhoto
    }

  
    EXECUTE_postUserInRooms(userDoc,roomid)

    res.json(req?.body)
    ControllerDAO.injectUsersInRoom(roomid,userDoc)
  }


  static async deleteUsersInRoom(req,res,next){
    const userid= await req.body.userid
    const username=await req.body.username
    const userPhoto=await req.body.userPhoto
    const roomid=await req.body.roomid

    const userDoc={
      userid:userid,
      username:username,
      userPhoto:userPhoto
    }
    res.json(req?.body)
    ControllerDAO.deleteUsersInRoom(roomid,userDoc)
  }

  static async postUsersInUsers(req,res,next){
    const userid= await req.body.userid
    const username=await req.body.username
    const userPhoto=await req.body.userPhoto
    const email=await req.body.email

    // const avgDot=await req.body.avgDot
    // const password=await req.body.password
    // const dotCollection=await req.body.dotCollection
    // const peers=await req.body.peers


    const userDoc={
      userid:userid,
      username:username,
      userPhoto:userPhoto,
      email:email
      // avgDot:avgDot,
      // password:password,
    
      // peers:peers,
      // dotCollection:dotCollection
    }
    res.json(req?.body)
    ControllerDAO.injectUsersInUsers(userDoc)
  }

static async getAvgDot(req,res,next){

  const userid =await req.body.userid

const userData =await ControllerDAO.getAvgDot(userid)
res.json({userData}?.userData?.avgDot)
}

static async getDotCollectionCount(req,res,next){

  const userid = await req.body.userid
  const count = await ControllerDAO.getDotCollectionCount(userid)
  res.json({count})
}














static async postSpeakerInRoom(req,res,next){
    const speaker= await req.body.speakerid
    const roomid=await req.body.roomid

    res.json(req?.body)

    EXECUTE_setSpeaker(speaker,roomid)
    ControllerDAO.injectSpeakerInRoom(roomid,speaker)


}

static async postCreatorInRoom(req,res,next){
    const creator = await req.body.creator 
    const roomid=await req.body.roomid

    res.json(req?.body)
    EXECUTE_setCreator(creator,roomid)
    ControllerDAO.injectCreatorInRoom(roomid,creator)

}

static async updateDotInRoom(req,res,next){
    const dot = await req.body.dot 
    const roomid=await req.body.roomid

    res.json(req?.body)
    ControllerDAO.injectDotInRoom(roomid,dot)
}


static async updateDotRowandCol(req,res,next){
const roomid =await req?.body?.roomid
const dot = await req?.body?.dot
res.json({roomid:roomid, dot:dot})
console.log('dot update')
ControllerDAO.updateDotRowAndColumns(roomid,dot)

}



// users

static async postDotInUser(req, res, next) {
    const dot = await req.body.dot 
    const roomid=await req.body.roomid
    const userid=await req.body.userid
    const attribute_id = await req.body.attribute_id
    res.json(req?.body)
    ControllerDAO.injectDotInUser(userid,roomid,dot,attribute_id)
  }


  static async updateDotInUser(req, res, next) {
    const dot = await req.body.dot 
    const roomid=await req.body.roomid
    const userid=await req.body.userid

    res.json(req?.body)
    ControllerDAO.updateDotInUser(userid,roomid,dot)
  }

static async addPeers(req,res,next){
try{
const peerid = await req.body.peerid
const userid = await req.body.userid
res.json(peerid + userid)

ControllerDAO.addPeers(userid,peerid)
}catch(e){console.log(e)}
}

static async deletePeerById(req,res,next){
try{
const peerid = await req.body.peerid
const userid = await req.body.userid
res.json(peerid + userid)

ControllerDAO.deletePeerById(userid,peerid)
}catch(e){console.log(e)}
}




  // search users autocomplete

  static async search(req,res,next){

    try{
     
      // have to put await during asynchronous calls! never forget this! either use await or .then()
      const result = await ControllerDAO.search(req.query.term)
      res.json(result)

    }
    catch(e){
      console.log(e)
    }


  }






  static async sendEmailInvite(req,res,next){

const emailData = await req.body.email
 const roomlink = await req.body.roomlink

res.json({email:emailData,roomlink:roomlink})


sendMail(emailData,roomlink)
.then((res)=>console.log('Email sent',result))
.catch((error)=> console.log(error.message))


  }





}
export default Controller;
