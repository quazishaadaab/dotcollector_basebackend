import { createRequire } from "module";
const require = createRequire(import.meta.url);

const {Client,Pool}=require('pg')
const pool = new Pool({
  user: 'postgres', //postgres
  host: 'localhost',
  database: 'dotcollector',
  password: 'Bangladesh123?',
  port: 9000,
})



// async function createTable(){
//         await pool.query("CREATE TABLE user (userid int, username varchar(255),photoURL varchar(255) )")
//         console.log('success')
//         // await client.query("INSERT INTO users VALUES (423499334,'Ray Dalio','butterfly' )")
//     //    const {rows}= await client.query("SELECT * from users")
//     //    console.log(rows)
// }

// createTable()

//  await pool.query("INSERT INTO social VALUES (1123444,'Ray Dalio','adsadjiijf.png')")
//  const result = await pool.query("SELECT roomname FROM rooms_7,jsonb_array_elements(users) with ordinality arr(item_object, position) WHERE arr.item_object->>'name'='Ray Dalio'")


//  await pool.query("INSERT INTO rooms_7 (roomID,roomname,users,creatorid,speakerid,room_type) VALUES ($1,$2,$3,$4.$5,$6);",[roomID,roomname,users,creatorid,speakerid,room_type])
 //updating
//  await pool.query(" UPDATE rooms_7 SET users = users || '$1'::jsonb WHERE roomname='$2';",[postgres_userdoc,roomname])



// console.log(result)

const EXECUTE_getRoomsByUser=async(userid)=>{
    const result = await pool.query(`SELECT roomname,roomid FROM rooms_postgres_2,jsonb_array_elements(users) with ordinality arr(item_object, position) WHERE arr.item_object->>'userid'='${userid}' ORDER BY ID DESC`)
return result?.rows
}

const EXECUTE_postRooms=async(roomID,roomname,room_type)=>{

    try{
        //insert all the room values along with an empty users array. we need to insert an empty users array or else we cannot append json into array.
        await pool.query("INSERT INTO rooms_postgres_2 (roomID,roomname,users,room_type) VALUES ($1,$2,$3,$4);",[roomID,roomname,'[]',room_type])
    }
    catch(e){
        console.log(e)
    }
}


const EXECUTE_setSpeaker=async(speakerid,roomid)=>{

    try{
        await pool.query(`UPDATE rooms_postgres_2 SET speakerid = '${speakerid}' WHERE roomid='${roomid}' ;`)

    }
    catch(e){console.log(e)}
}

const EXECUTE_setCreator=async(creatorid,roomid)=>{

    try{
        await pool.query(`UPDATE rooms_postgres_2 SET creatorid = '${creatorid}' WHERE roomid='${roomid}' ;`)

    }
    catch(e){console.log(e)}
}

// this is also an upsert. wont insert the same user in the room
 const EXECUTE_postUserInRooms=async(postgres_userdoc,roomid)=>{
//roomname must be in char or else it wont work

const userDoc = `'${JSON.stringify(postgres_userdoc)}'` ;
console.log(userDoc)
await pool.query(`UPDATE rooms_postgres_2 SET users = users || ${userDoc}::jsonb WHERE roomid='${roomid}' ;`)
}




// pool.query(`UPDATE rooms_7 SET users = users || '{"name":"tim ferris","userid":"50000"}'::jsonb WHERE roomname='penguinRoom';`)

export {EXECUTE_postRooms,EXECUTE_postUserInRooms,EXECUTE_getRoomsByUser,EXECUTE_setCreator,EXECUTE_setSpeaker}
