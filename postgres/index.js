import { createRequire } from "module";
import {createClient} from '@supabase/supabase-js'
import dotenv from "dotenv"
import path from 'path';

dotenv.config({path: path.join(process.cwd(), '..', '.env')});

//for supabase
//const supabase = createClient(process.env.SUPABASE_DB_URL, process.env.SUPABASE_DB_APIKEY)
const supabase = createClient('https://ncejgpigjoseupkyrswi.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jZWpncGlnam9zZXVwa3lyc3dpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI3OTMzNzgsImV4cCI6MTk5ODM2OTM3OH0.EzCN2SJQxHhL6JwwoiHoCWoTqHsT_NvRA7WfK60sJyM')

//const require = createRequire(import.meta.url);

// const {Client,Pool}=require('pg')
// 

//   user: 'postgres', //postgres
//   host: 'localhost',
//   database: 'dotcollector',
//   password: 'Bangladesh123?',
//   port: 9000,
// })
// const pool = new Pool({
//     user: 'postgres', //postgres
//     // host: 'base-backend-db.internal',
//     host: '66.241.125.193',
//     database: 'base_backend',
//     password: '6facd9c32be240c848325004cd53981286e1d2bf4ff9a0e4',
//     port: 5433,
//   })
 

//   Username:    postgres
//   Password:    6facd9c32be240c848325004cd53981286e1d2bf4ff9a0e4
//   Hostname:    base-backend-db.internal
//   Proxy Port:  5432
//   PG Port: 5433


// Username:    postgres
// Password:    6facd9c32be240c848325004cd53981286e1d2bf4ff9a0e4
// Hostname:    base-backend-db.internal
// Proxy Port:  5432
// PG Port: 5433

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

//v2 changed


const EXECUTE_getRoomsByUser=async(userid)=>{
    //const result = await pool.query(`SELECT roomname,roomid FROM rooms_postgres_2,jsonb_array_elements(users) with ordinality arr(item_object, position) WHERE arr.item_object->>'userid'='${userid}' ORDER BY ID DESC`)
    try{
    const {data,error} = await supabase.rpc('execute_getroomsbyuser',{userid:userid})
    return data
    }
    catch(e){
console.log(e)
    }
}

//v2 changed
const EXECUTE_postRooms=async(roomID,roomname,room_type)=>{

    try{
        //insert all the room values along with an empty users array. we need to insert an empty users array or else we cannot append json into array.
        //await pool.query("INSERT INTO rooms_postgres_2 (roomID,roomname,users,room_type) VALUES ($1,$2,$3,$4);",[roomID,roomname,'[]',room_type])

        const {data,error} = await supabase.rpc('execute_postrooms',{roomid:roomID,roomname:roomname, users:[], room_type:room_type}) //users MUST have a blank array ( not a stringified array but a real array data type). if left empty, postUsersinRoom will not work/fill it 
        
        if(!error){return "Success your room has been posted"}else{return error}
        

    }
    catch(error){
        console.log(error)
    }

}
//v2 changed
const EXECUTE_setSpeaker=async(speakerid,roomid)=>{

    try{
        //await pool.query(`UPDATE rooms_postgres_2 SET speakerid = '${speakerid}' WHERE roomid='${roomid}' ;`)
        const {data,error} = await supabase.rpc('execute_setspeaker',{ roomid:roomid , speakerid:speakerid})

        if(!error){return "Success your speaker has been posted/updated"}else{return ` Failure, something went wrong : ${error}`}

    }
    catch(e){console.log(e)}
}

//v2 changes
const EXECUTE_setCreator=async(creatorid,roomid)=>{

    try{
        //await pool.query(`UPDATE rooms_postgres_2 SET creatorid = '${creatorid}' WHERE roomid='${roomid}' ;`)
        const {data,error} = await supabase.rpc('execute_setcreator',{ roomid:roomid , creatorid:creatorid})
        if(!error){return "Success your creator has been posted/updated"}else{return ` Failure, something went wrong ${error}`}

    }
    catch(e){console.log(e)}
}

// this is also an upsert. wont insert the same user in the room

const EXECUTE_postUserInRooms=async(postgres_userdoc,roomid)=>{
    //roomname must be in char or else it wont work
    
    const userDoc = `${JSON.stringify(postgres_userdoc)}` ;
    const userDocNoQuotes = `[${JSON.stringify(postgres_userdoc)}]` ;

    //console.log(userDoc,userDocNoQuotes)
    // console.log(userDoc?.userid)

    // //the code below is without upsert( will insert duplicates)
    // // await pool.query(`UPDATE rooms_postgres_2 SET users = users || ${userDoc}::jsonb WHERE roomid='${roomid}'  ;`)
    
    // // the code below is with upserts, will not insert duplicates. The ," AND NOT('[${userDoc2}]'::jsonb <@ users) ", prevents duplicated.
    // // The <@ means not in. '[userDoc2]' is specefic here because the statement searches for values in the user column. The entries in the user column start with [{"userid":----,"username":---,"userPhoto":---}]
    // //for that we cannot use the userDoc constant above, since it is wrapped in ''(single quotes). We need it to be more like '[]', thus we use no quotes.
    // //also , the @> or @< operator must match the whole json , so we have to include all three json keys(userid,username,and userphoto). We cant just use one.
    
     //await pool.query(`UPDATE rooms_postgres_2 SET users = users || ${userDoc}::jsonb WHERE roomid='${roomid}' AND NOT('[${userDocNoQuotes}]'::jsonb <@ users)`)
    
    // '{"userid":"123","username":"sadiya","userPhoto":"uuasdas.com"}'
    
    try{
    const {data,error} = await supabase.rpc('execute_postuserinrooms',{ userdoc:userDoc , roomid:roomid ,userdocnoquotes:userDocNoQuotes})
    if(!error){return "Success your user has been posted/updated in room"}else{return `Failure, something went wrong ${error}`}
    //console.log(data,error)

    }catch(error){
        console.log(error)
    }
    }




// pool.query(`UPDATE rooms_7 SET users = users || '{"name":"tim ferris","userid":"50000"}'::jsonb WHERE roomname='penguinRoom';`)

export {EXECUTE_postRooms,EXECUTE_postUserInRooms,EXECUTE_getRoomsByUser,EXECUTE_setCreator,EXECUTE_setSpeaker}
