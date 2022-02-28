const express = require("express");
const {
  addRoomQuery,
  isRoomExist,
  isValidUserId,
  isRoomFull,
  addUserIdToRoom,
  hasUserInRoom,
} = require("../create_test_data");
const router = express.Router();

router.post("/create", (req, res) => {
  const { capacity, gameId, isHidden, canWitness } = req.body;
  if (capacity && gameId) {
    addRoomQuery(
      capacity,
      gameId,
      isHidden ? isHidden : false,
      canWitness ? canWitness : false,
      []
    )
      .then((response) => {
        console.log(response.command);
        res.send("Success");
      })
      .catch((e) => res.status(500).send(e));
  } else {
    res.status(400).send("Missing either capicity or gameId");
  }
});

router.post("/userjoin/:roomId", async (req, res) => {
  const { userId } = req.body; // need userId
  const roomId = req.params.roomId;
  if (userId) {
    const validRoom = await isRoomExist(roomId);
    const validUser = await isValidUserId(userId);
    if (validRoom && validUser) {
      const roomFull = await isRoomFull(roomId);
      if (roomFull) {
        res.status(400).send("Room is full");
      } else {
        const userInRoom = await hasUserInRoom(roomId, userId);
        if (userInRoom) {
          res.send("User already in room");
        } else {
          addUserIdToRoom(roomId, userId);
          res.send("Success");
        }
      }
    } else {
      if (!validRoom) {
        res.status(404).send("Room id is invalid");
      } else if (!validUser) {
        res.status(404).send("User id is invalid");
      }
    }
  } else {
    res.status(400).send("Missing user Id");
  }
});

module.exports = router;
