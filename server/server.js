// using sockets with express requires sending server to io.
const express = require("express");
const app = express();
// setting up the requirements for io to work
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const {connect, 
  createRoomTable, addRoomQuery, 
  addUserQuery, createUserTable, 
  createBoardTable, addBoardQuery, 
  createGameTable, addGameQuery} = require("./create_test_data.js");
// for testing the sockets and database this has been changed from build to test
  app.use(express.static("../test"));

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
        // roomTableTests();
        // userTableTests();
        // boardTableTests();
        // gameTableTests();
        console.log("test database connected");
    });


const PORT = 3000;

// Websockets (socket.io) 
// 2 players per room, join socket, leave socket, brodcast socket status, remove room. 
// Three states: waiting, playing, finished (winner, draw).

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('join', (roomId) => {
        socket.join(roomId);
        console.log(`user joined room ${roomId}`);
    });
    socket.on('leave', (roomId) => {
        socket.leave(roomId);
        console.log(`user left room ${roomId}`);
    });
    socket.on('status', (status) => {
        console.log(`user status in room ${status}`);
    });
    socket.on('remove', (roomId) => {
        console.log(`user removed room ${roomId}`);
    });
    socket.on('message', (roomId, message) => {
        console.log(`user sent message ${message} in room ${roomId}`);
    });
});


server.listen(PORT, () => {
  console.log(`Listenning to ${PORT}`);
});
