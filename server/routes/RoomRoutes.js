const express = require("express");
const {
  addRoomQuery,
  isRoomExist,
  isValidUserId,
  isRoomFull,
  addUserIdToRoom,
  hasUserInRoom,
  removeUserIdFromRoom,
  getRoomData,
  getGameWithId,
} = require("../create_test_data");
const { parseRoomData } = require("../utils/dataParsing");
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

router.get("/:roomId", async (req, res) => {
  const { roomId } = req.params;
  if (roomId) {
    const validRoom = await isRoomExist(roomId);
    if (validRoom) {
      getRoomData(roomId)
        .then((data) => {
          getGameWithId(data["gameid"])
            .then((poolRes) => res.json(parseRoomData(data, poolRes.rows[0])))
            .catch((e) => res.status(500).send(e));
        })
        .catch((e) => res.status(500).send(e));
    } else {
      res.status(404).send("Not valid room");
    }
  } else {
    res.status(400).send("Missing roomId");
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
          addUserIdToRoom(roomId, userId)
            .then(() => res.send("Success"))
            .catch((e) => res.status(500).send(e));
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

router.post("/userleave/:roomId", async (req, res) => {
  const { roomId } = req.params;
  const { userId } = req.body;
  if (roomId && userId) {
    const validRoom = await isRoomExist(roomId);
    const validUser = await isValidUserId(userId);
    if (validRoom && validUser) {
      const userInRoom = await hasUserInRoom(roomId, userId);
      if (userInRoom) {
        // remove
        removeUserIdFromRoom(roomId, userId)
          .then(() => res.send("Success"))
          .catch((e) => res.status(500).send(e));
      } else {
        res.status(400).send("User not in room");
      }
    } else {
      res.status(404).send("Either room or user not exist");
    }
  } else {
    res.status(400).send("Missing either roomId or userId");
  }
});

module.exports = router;
