import ControllerDAO from "../dao/controllerDAO.js";


class Controller {
  // constructor(realData){

  //     this.realData=realData || '';
  // }

  
  static async postRooms(req, res, next) {
    const roomid = await req.body.roomid;
    const roomname = await req.body.roomname;

    res.json(req?.body); //this is not mandatory. it just shows reqbin or postman the data. POST requests mainly
    //just use req not res. res is more for GET

    console.log(req.body.roomid, req.body.roomname);
    ControllerDAO.inject(roomid, roomname);

    // this.realData= data;
  }
  
  static async getAllRooms(req, res, next) {
    const rooms = await ControllerDAO.getAllRooms();
    res.json(rooms);
    
  }

  static async getRoomId(req, res, next) {
    res.json(req.body.roomId);
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
    res.json(req?.body)
    ControllerDAO.injectUsersInRoom(roomid,userDoc)
  }

  static async postUsersInUsers(req,res,next){
    const userid= await req.body.userid
    const username=await req.body.username
    const userPhoto=await req.body.userPhoto
    // const avgDot=await req.body.avgDot
    // const password=await req.body.password
    // const dotCollection=await req.body.dotCollection
    // const peers=await req.body.peers


    const userDoc={
      userid:userid,
      username:username,
      userPhoto:userPhoto,
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
    ControllerDAO.injectSpeakerInRoom(roomid,speaker)


}

static async postCreatorInRoom(req,res,next){
    const creator = await req.body.creator 
    const roomid=await req.body.roomid

    res.json(req?.body)
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

    res.json(req?.body)
    ControllerDAO.injectDotInUser(userid,roomid,dot)
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




}
export default Controller;
