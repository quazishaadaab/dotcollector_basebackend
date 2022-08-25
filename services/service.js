import http from "./http-common.js" ;

 class DataService{


// createRoom(data){
// return http.post("/postRooms",data);

// }

// getAllRooms(){

//     return http.get("/getAllRooms");
// }

postDot(data){

    return http.post('/postDot',data)
}

}

export default new DataService();
