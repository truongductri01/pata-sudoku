const express = require("express");
const { connect, isRoomExist, isValidUserId, hasUserInRoom, isRoomFull, addUserIdToRoom, getUserList } = require("./create_test_data");
const app = express();
const testDataRoutes = require("./routes/TestDataRoutes");
const userRoutes = require("./routes/UserRoutes");
const gameRoutes = require("./routes/GameRoutes");
const boardRoutes = require("./routes/BoardRoutes");
const roomRoutes = require("./routes/RoomRoutes");
const apiRootPath = "/api/v1";

// socket config 
const cors = require("cors");
const { generateBoard } = require("./utils/sudokuApi");
const server = require('http').createServer(app);
const io = require('socket.io')(server, 
    {
        cors : {
            origin : "*"
        },
    }
    );
app.use(cors());

app.use(express.json());
app.use(express.static("build"));
// app.use(express.static("public"));

// Connect to postgres
connect();

// Use the Routes
app.use(`${apiRootPath}/testdata`, testDataRoutes);
app.use(`${apiRootPath}/user`, userRoutes);
app.use(`${apiRootPath}/games`, gameRoutes);
app.use(`${apiRootPath}/board`, boardRoutes);
app.use(`${apiRootPath}/rooms`, roomRoutes);
const PORT = 8080; // avoid collapse with client



io.on('connection', (socket) => {
    socket.on("disconnecting", () => {
        console.log(socket.rooms.values()); // the Set contains at least the socket ID
        // convert set to array
        let rooms = Array.from(socket.rooms.values());
        console.log(rooms);
        if (rooms.length === 2) {
            // if the user is in a room, then leave the room.
            socket.leave(rooms[1]);
            socket.to(rooms[1]).emit("message", `${socket.id} has left the room`);   
        }
    });
    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`);
    });
    socket.on('join', async (roomId, userId) => {
        // verify the room
        const roomExist = await isRoomExist(roomId);
        if (!roomExist) {
            // emit room failed
            socket.emit('joinfailmsg', `room ${roomId} does not exist`);
            return;
        }
        const userExist = await isValidUserId(userId);
        if (!userExist) {
            // emit user failed
            socket.emit('joinfailmsg', `user ${userId} does not exist`);
            return
        }
        const userInRoom = await hasUserInRoom(roomId, userId);
        if (userInRoom) {
            // emit user already in room
            socket.emit('joinfailmsg', `user ${userId} already in room ${roomId}`);
            return;
        }
        const roomFull = await isRoomFull(roomId);
        if (roomFull) {
            // emit room full
            socket.emit('joinfailmsg', `room ${roomId} is full`);
            return;
        } 
        addUserIdToRoom(roomId, userId).then( async () => {
            socket.join("room" + roomId);
            console.log(`${userId} ${socket.id} joined room ${roomId}`);
            socket.to("room" + roomId).emit('joinmsg', socket.id);
            // emit success
            socket.emit('joinsuccessmsg', `${userId} joined room ${roomId}`);
            io.to("room" + roomId).emit('usrlist', await getUserList(roomId));
            await isRoomFull(roomId).then( async (isFull) => {
                if (isFull) {
                    const board = await generateBoard("hard");
                    console.log(board);
                    io.to("room" + roomId).emit('board', board);
                    io.to("room"+roomId).emit("gameStart", `game start`);
                }
            });
            console.log(socket.rooms.values()); // the Set contains at least the socket ID
        });
    });
    socket.on('leave', (roomId) => {
        socket.to(roomId).emit('message', `${socket.id} has left the room`);
        socket.leave(roomId);
        console.log(`${socket.id} left room ${roomId}`);
    });
    socket.on('roomMessage', (roomId, message) => {
        console.log(`user sent message ${message} in room ${roomId}`);
        // socket.emit('message', message);
    });
    socket.on('userConnected', (userId) => {
        console.log(`user: ${userId} connected with id: ${socket.id}`);
    });
    socket.on('submit', (roomId, userId, board) => { 
        console.log(`user: ${userId} submitted in room ${roomId}`);
        io.to(roomId).emit('gameSubmitted', `${userId} has submitted`);
    });
});


server.listen(PORT, () => {
  console.log(`Listenning to ${PORT}`);
});