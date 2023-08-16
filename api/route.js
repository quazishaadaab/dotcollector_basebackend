import express from "express"

import Controller from "./controller.js"

const router = express.Router()
export const dotrouter = express.Router()



// /*===================================================================================================================
//     difference between post and put and delete ? : post ,put,delete can all be used as the same thing since they all
//     manipulate data. they will work interchangebly. However, post will be called everytime, even if the parameters/data 
//     are the same. So you will get duplictes. 
//
//     PUT however will only insert/update the database or be called if the paremeter is different from previous call.Same with 
//     delete. Thus, not adding duplicates.





//port 5000
// rooms api

// insert peers
router.route("/addPeers").put(Controller.addPeers)
// delete peers by id
router.route("/deletePeerById").put(Controller.deletePeerById)

router.route("/postSpeakerInRoom").put(Controller.postSpeakerInRoom)

router.route("/postUsersInRoom").put(Controller.postUsersInRoom)

router.route("/deleteUsersInRoom").put(Controller.deleteUsersInRoom)

router.route("/postCreatorInRoom").put(Controller.postCreatorInRoom)

router.route("/updateDotInRoom").put(Controller.updateDotInRoom)

//testing
router.route("/updateDotRowandCol").put(Controller.updateDotRowandCol)

// users api
router.route("/postUsersInUsers").put(Controller.postUsersInUsers)




// getRoomById : returns all the objects in the room , including dots,speakers,etc

router.route("/getRoomById").post(Controller.getRoomById);
// getUserById

router.route("/getUserById").post(Controller.getUserById);

router.route("/getUsersInRoom").post(Controller.getUsersInRoom)

//port 2000------------------------

// router.route("/getAvgDot").post(Controller.getAvgDot)
// router.route("/getDotCollectionCount").post(Controller.getDotCollectionCount)


// router.route("/updateDotInUser").put(Controller.updateDotInUser)
// // this is useless and the dot insertion is messed up.
// router.route("/postDotInUser").put(Controller.postDotInUser)


// ----------port 5000/6000-----------
// get avgDot 

//dont use this anymore delte.
router.route("/postDotInUser").put(Controller.postDotInUser)


router.route("/postRooms").post(Controller.postRooms)
router.route("/getAllRooms").get(Controller.getAllRooms)

//get all rooms by id , makes rooms more selective
router.route("/getAllRoomsByUserId").post(Controller.getAllRoomsByUserId)


//useless 
router.route("/getRoomId").post(Controller.getRoomId)

// user search

router.route("/search").get(Controller.search)


// router.route("./postDotInUser").post(Controller.postDotInUser)
// router.route("./updateDot").update(Controller.updateDot)

// dashboard api + peer list api

//posts in attribute database
router.route("/postAttribute").post(Controller.postAttribute)


//by attributeid
router.route("/getAttribute").post(Controller.getAttribute)

router.route("/getAttributeByAuthorId").post(Controller.getAttributeByAuthorId)

//post attribute id in rooms
router.route("/postAttributeIdInRoom").put(Controller.postAttributeIdInRoom)



router.route("/sendEmailInvite").post(Controller.sendEmailInvite)



export default router
