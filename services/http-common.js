import axios from "axios";
export default axios.create({
baseURL : "http://127.0.0.1:2000" , // this links to our server.js file and in it we set this api call. this is the base URL
headers:{
    "Content-type":"application/json"
}
});