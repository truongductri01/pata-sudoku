import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
const socket = io();
socket.on("connect", () => {
  console.log("connected");
  socket.emit("userConnected", "user1");
});
socket.on("disconnect", () => {
  console.log("disconnected");
  // socket.emit("userDisconnected", "user1");
});
socket.on('message', (data) => {
  console.log(data);
});
socket.on('gameSubmitted', (data) => {
  document.getElementById("gameStatus").textContent = data;
});
let joinButton = document.getElementById("join-button");
joinButton.addEventListener("click", function() {
    socket.emit("join", "1");
    socket.emit("message", "1", "hello");
});

let leaveButton = document.getElementById("leave-button");
leaveButton.addEventListener("click", function() {
    socket.emit("leave", "1");
});

let submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", function() {
    socket.emit("submit", "1", "user1");
});