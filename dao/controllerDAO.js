// import mongodb from "mongodb";
// import { mongoClient, ObjectId } from "mongodb";

import { response } from "express";

let rooms;
let users;
let room_id;
let room_name;
let gridId;
let grid;
export default class ControllerDAO {
  static async injectDB(conn) {
    if (rooms & users) {
      return;
    }
    try {
      rooms = await conn.db(process.env.RESTREVIEWS_NS).collection("rooms");
      users = await conn.db(process.env.RESTREVIEWS_NS).collection("users");
    } catch (e) {
      console.error(`unable to establish a collection ${e}`);
    }
  }

  static async inject(roomid, roomname) {
    console.log("roomdoc " + roomid + "" + roomname);

    try {
      const roomdoc = {
        roomid: roomid,
        roomname: roomname,
      };
      return await rooms.insertOne(roomdoc);
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }

  static async injectDotInUser(userid, roomid, dot) {
    try {
      // javascript canot process back ticks in runtime, so we need to use brackets around it

      dot.map(async (array) => {
        await users.updateMany(
          { userid: userid },
          { $push: { [`dotCollection.${roomid}`]: array } }
        );
      });
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }

  static async updateDotInUser(userid, roomid, dot) {
    try {
      await users.updateMany(
        { userid: userid },
        { $set: { [`dotCollection.${roomid}`]: dot } }
      );
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
    // try {

    //   await users.updateMany({userid:userid},
    // {$push:{'dotCollection':'888'}})

    // }
    // catch(e){
    //   console.error(`Unable to post review: ${e}`);
    //   return { error: e };

    // }
  }



static async addPeers(userid,peerid){

  try{
await users.updateMany(
          { userid: userid },
          { $addToSet: {"peers": peerid } }
        );
        // $addToSet only adds value in peers array if the value is unique(doesnt already exist in the array.)
}catch(e){console.log(e)}
}

static async deletePeerById(userid,peerid){

try{
  
await users.updateMany(
        { userid: userid },
        { $pull: {"peers": peerid } }
      );
// pull deletes the peer based on their peerid. since this is an array we do not need to specify any key. if this was an array of JSON objects, then we would write
// {"peers":{peeerid:peerid}}
    }catch(e){console.log(e)}
}






  static async getAllRooms() {
    let cursor = await rooms.find().toArray();
    return await cursor;
  }

  static async getUsersInRoom(roomid) {
    try {
      const cursor = await rooms
        .find({ roomid: roomid }, { users: 1 })
        .toArray();

      return await cursor[0].users;
    } catch (e) {
      console.log(e);
    }
  }

  static async getRoomById(roomid) {
    const cursor = await rooms
      .find({ roomid: roomid }, { speakerid: 1 })
      .toArray();

    return await cursor[0];
  }

static async getUserById(userid) {
const cursor= await users.find({"userid":userid}).toArray();
return await cursor[0];
}


  static async injectUsersInRoom(roomid, userdoc) {
    try {
      await rooms.updateMany(
        { roomid: roomid },
        { $set: { [`users.${userdoc.userid}`]: userdoc } }
      );

      // we specify the key we want to update or push

      // {$push:{'users.0':"00000"}}) this is for inserting values by penetrating through nested keys
    } catch (e) {
      return { error: e };
    }
  }

  static async injectUsersInUsers(userdoc) {
    try {
      // await users.updateOne({},{$set:{'userid':userdoc.userid}})

      await users.updateMany(
        { userid: userdoc.userid },
        {
          $set: {
            userid: userdoc.userid,
            username: userdoc.username,
            photoURL: userdoc.userPhoto,

            // 'avgDot':userdoc.avgDot,
            // 'password':userdoc.password,
            // 'peers':userdoc.peers,
            // 'dotCollection':userdoc.dotCollection
          },
        },
        { upsert: true }
      );
      //we need to put upsert true because it allows use to create a doc
      //in mongodb if their are no docs that match the filter( userid:userdoc.userid)

      // we specify the key we want to update or push

      // {$push:{'users.0':"00000"}}) this is for inserting values by penetrating through nested keys
    } catch (e) {
      return { error: e };
    }
  }

  static async getAvgDot(userid) {
    try {
      const cursor = await users.find({ userid: userid }).toArray();
      return await cursor[0];
    } catch (e) {
      console.log(e);
    }
  }

  static async getDotCollectionCount(userid) {
    try {
      const cursor = await users.find({ userid: userid }).toArray();
      const t = cursor[0].dotCollection;

      return await t;
    } catch (e) {
      console.log(e);
    }
  }

  static async injectSpeakerInRoom(roomid, speaker) {
    try {
      await rooms.updateMany(
        { roomid: roomid },
        // set is for updating a key
        { $set: { speakerid: speaker } }
      );
    } catch (e) {
      return { error: e };
    }
  }

  static async injectCreatorInRoom(roomid, creator) {
    try {
      await rooms.updateMany(
        { roomid: roomid },
        { $set: { creatorid: creator } }
      );
    } catch (e) {
      return { error: e };
    }
  }

  static async injectDotInRoom(roomid, dot) {
    try {
      await rooms.updateMany({ roomid: roomid }, { $set: { dot: dot } });
    } catch (e) {
      return { error: e };
    }
  }


static async updateDotRowAndColumns(roomid,dot){


const row = dot?.row
const column = dot?.column

// we cannot use backticks when defining a mongodb query
let query = {}
var value = `dot.${row-1}.${column-1}`
query[value] = dot
console.log('cols',dot?.column)
console.log('rows',dot?.row)

  try{
await rooms.updateMany({roomid:roomid},{$set:query})

  }catch(e){

  }
}









  static async search(term) {
    try {
      let result = await users.aggregate([
        {
          $search: {
            "index":"default",
            autocomplete: {
              query: `${term}`,
              path: "username",
              fuzzy: {
                maxEdits: 2,
              },
            },
          },
        },
      ]).toArray();
      return result
    } catch (e) {
      console.log(e);
    }
  }
}
