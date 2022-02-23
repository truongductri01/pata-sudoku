import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
const socket = io();
socket.on("connect", () => {
  console.log("connected");
});
socket.on("disconnect", () => {
  console.log("disconnected");
});
socket.on("message", (data) => {
  console.log(data);
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