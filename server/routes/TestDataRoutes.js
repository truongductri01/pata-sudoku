const express = require("express");
const router = express.Router();
const {
  createRoomTable,
  addRoomQuery,
  addUserQuery,
  createUserTable,
  createBoardTable,
  addBoardQuery,
  createGameTable,
  addGameQuery,
} = require("../create_test_data");

async function userTableTests() {
  return createUserTable().then(() => {
    const name = "test";
    const email = "random@gmail.com";
    const gamesId = ["game1", "game2"];
    const salt = "salt";
    const username = "username";
    const hash = "hash";
    addUserQuery(name, email, gamesId, salt, username, hash).then(
      (response) => {
        console.log(response.command);
      }
    );
  });
}

async function roomTableTests() {
  return createRoomTable().then(() => {
    const capacity = 2;
    const gameId = "game1";
    const isHidden = false;
    const canWitness = false;
    const userIds = ["user1", "user2"];
    addRoomQuery(capacity, gameId, isHidden, canWitness, userIds).then(
      (response) => {
        console.log(response.command);
      }
    );
  });
}

async function boardTableTests() {
  return createBoardTable().then(() => {
    const board = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const difficulty = "easy";
    addBoardQuery(board, difficulty).then((response) => {
      console.log(response.command);
    });
  });
}

async function gameTableTests() {
  return createGameTable().then(() => {
    // time is now with seconds
    const startTime = new Date().toISOString();
    const endTime = new Date().toISOString();
    const boardId = "board1";
    const playersIds = ["user1", "user2"];
    const winnerId = "user1";
    addGameQuery(startTime, endTime, boardId, playersIds, winnerId).then(
      (response) => {
        console.log(response.command);
      }
    );
  });
}

router.post("/", (req, res) => {
  const promises = [
    roomTableTests(),
    userTableTests(),
    boardTableTests(),
    gameTableTests(),
  ];
  Promise.all(promises)
    .then(() => {
      res.send("Success");
    })
    .catch((reason) =>
      res.status(400).send("Some table has already been created")
    );
});

module.exports = router;
