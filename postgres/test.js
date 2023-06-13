import {createClient} from '@supabase/supabase-js'
import dotenv from "dotenv"
import path from 'path';

dotenv.config({path: path.join(process.cwd(), '..', '.env')});

const supabase = createClient(process.env.SUPABASE_DB_URL, process.env.SUPABASE_DB_APIKEY)
//const supabase = createClient('https://ncejgpigjoseupkyrswi.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jZWpncGlnam9zZXVwa3lyc3dpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI3OTMzNzgsImV4cCI6MTk5ODM2OTM3OH0.EzCN2SJQxHhL6JwwoiHoCWoTqHsT_NvRA7WfK60sJyM')

//if primary key/roomid already exists , need a way to handle that error
const {data:d1,error:e1} = await supabase.rpc('execute_postrooms',{roomid:"1kill",roomname:"batman", users:[], room_type:'private'})


//const {data:d1,error:e1} = await supabase.rpc('execute_getroomsbyuser',{userid:'2'})
console.log(d1)

//const {data:d1,error:e1} = await supabase.rpc('execute_setspeaker',{ roomid:'1232' , speakerid:'sang'})

//const {data:d1,error:e1} = await supabase.rpc('execute_setcreator',{ roomid:'1232' , creatorid:'eater'})


//console.log(d1,e1)



const EXECUTE_postUserInRooms=async(postgres_userdoc,roomid)=>{
    //roomname must be in char or else it wont work
    
    const userDoc = `${JSON.stringify(postgres_userdoc)}` ;
    const userDocNoQuotes = `[${JSON.stringify(postgres_userdoc)}]` ;

    console.log(userDoc,userDocNoQuotes)
    // console.log(userDoc?.userid)
    // //the code below is without upsert( will insert duplicates)
    // // await pool.query(`UPDATE rooms_postgres_2 SET users = users || ${userDoc}::jsonb WHERE roomid='${roomid}'  ;`)
    
    // // the code below is with upserts, will not insert duplicates. The ," AND NOT('[${userDoc2}]'::jsonb <@ users) ", prevents duplicated.
    // // The <@ means not in. '[userDoc2]' is specefic here because the statement searches for values in the user column. The entries in the user column start with [{"userid":----,"username":---,"userPhoto":---}]
    // //for that we cannot use the userDoc constant above, since it is wrapped in ''(single quotes). We need it to be more like '[]', thus we use no quotes.
    // //also , the @> or @< operator must match the whole json , so we have to include all three json keys(userid,username,and userphoto). We cant just use one.
    
     //await pool.query(`UPDATE rooms_postgres_2 SET users = users || ${userDoc}::jsonb WHERE roomid='${roomid}' AND NOT('[${userDocNoQuotes}]'::jsonb <@ users)`)
    
    // '{"userid":"123","username":"sadiya","userPhoto":"uuasdas.com"}'
    const {data:d1,error:e1} = await supabase.rpc('execute_postuserinrooms',{ userdoc:userDoc , roomid:roomid ,userdocnoquotes:userDocNoQuotes})
    console.log(d1,e1)
    }
    //EXECUTE_postUserInRooms({userid:"2",username:"tira",userPhoto:"uuasdas.com"} , "tira")
