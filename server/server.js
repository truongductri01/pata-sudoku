const express = require("express");
const app = express();
const {connect, 
  createRoomTable, addRoomQuery, 
  addUserQuery, createUserTable, 
  createBoardTable, addBoardQuery, 
  createGameTable, addGameQuery} = require("./create_test_data.js");
app.use(express.static("build"));

async function userTableTests() {
    createUserTable().then(() => {
    const name = "test";
    const email = "random@gmail.com";
    const gamesId = ["game1", "game2"];
    const salt = "salt";
    const username = "username";
    const hash = "hash";
    addUserQuery(name, email, gamesId, salt, username, hash).then(response => {
        console.log(response.command);
    }
    );
} );
}

async function roomTableTests() {
    createRoomTable().then(() => {
    const capacity = 2;
    const gameId = "game1";
    const isHidden = false;
    const canWitness = false;
    const userIds = ["user1", "user2"];
    addRoomQuery(capacity, gameId, isHidden, canWitness, userIds).then(response => {
        console.log(response.command);
    }
    );
} );
}

async function boardTableTests() {
    createBoardTable().then(() => {
    const board = [[1,2,3],[4,5,6],[7,8,9]];
    const difficulty = "easy";
    addBoardQuery(board, difficulty).then(response => {
        console.log(response.command);
    }
    );
} );
}

async function gameTableTests() {
    createGameTable().then(() => {
      // time is now with seconds
      const startTime = new Date().toISOString();
      const endTime = new Date().toISOString();
      const boardId = "board1";
      const playersIds = ["user1", "user2"];
      const winnerId = "user1";
      addGameQuery(startTime, endTime, boardId, playersIds, winnerId).then(response => {
        console.log(response.command);
      }
      );
    }
    );
}


connect().then(
    () => {
        roomTableTests();
        userTableTests();
        boardTableTests();
        gameTableTests();
    });


const PORT = 3000;



app.listen(PORT, () => {
  console.log(`Listenning to ${PORT}`);
});
