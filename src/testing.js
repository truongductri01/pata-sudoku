import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://10.250.36.69:8080");
const board = [
  [1, 9, 2, 3, 5, 7, 8, 4, 6],
  [5, 3, 4, 1, 6, 8, 7, 2, 9],
  [6, 7, 8, 2, 4, 9, 1, 3, 5],
  [4, 1, 3, 6, 7, 5, 2, 9, 8],
  [2, 5, 6, 8, 9, 1, 3, 7, 4],
  [7, 8, 9, 4, 2, 3, 6, 5, 1],
  [3, 2, 1, 5, 8, 4, 9, 6, 7],
  [8, 4, 7, 9, 3, 6, 5, 1, 2],
  [9, 6, 5, 7, 1, 2, 4, 8, 3],
];
// const board = [
//   [0, 0, 0, 0, 0, 0, 8, 0, 0],
//   [0, 0, 4, 0, 0, 8, 0, 0, 9],
//   [0, 7, 0, 0, 0, 0, 0, 0, 5],
//   [0, 1, 0, 0, 7, 5, 0, 0, 8],
//   [0, 5, 6, 0, 9, 1, 3, 0, 0],
//   [7, 8, 0, 0, 0, 0, 0, 0, 0],
//   [0, 2, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 9, 3, 0, 0, 1, 0],
//   [0, 0, 5, 7, 0, 0, 4, 0, 3],
// ];
function SocketTest() {
  const [otherUserName, setOtherUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [msg, setMsg] = useState("");
  const [winnerId, setWinnerId] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connecting to the server");
      socket.emit("userConnected", socket.id);
    });

    // room join socket
    socket.on("joinfailmsg", (msg) => console.log(msg));
    socket.on("joinsuccessmsg", (msg) => console.log(msg));
    socket.on("joinmsg", (userId) => {
      console.log("Someone joined the room");
      setOtherUserName(userId);
    });
    socket.on("usrlist", (userList) => console.log(userList));

    // game
    socket.on("gameStart", (msg) => console.log(msg));
    socket.on("board", (board) => console.log(board));

    // submit board
    // emit submit from frontned
    // backend: broadcast signal to everyone in the room
    // if board is correctly check
    socket.on("gameSubmitted", (message) => {
      setMsg(message);
    });
    socket.on("gameSubmittedGood", (message) => {
      setMsg(message);
    });
    socket.on("gameSubmittedBad", (message) => {
      setMsg(message);
    });

    // on leave
    socket.on("gameUsrLeft", (message) => {
      console.log("Game End");
      setMsg(message);
    });

    // winner determined
    socket.on("winner", (winnerIdSocket) => {
      setWinnerId(winnerIdSocket);
    });
  }, []);

  useEffect(() => {
    if (winnerId) {
      if (winnerId === userId) {
        setMsg("You won");
      } else {
        setMsg("Good luck next time");
      }
    }
  }, [winnerId]);

  const joinHanleBtn = () => {
    console.log("I join the room haha >>>");
    socket.emit("join", "2", userId);
  };
  const leaveRoomBtn = () => {
    console.log("I leaved the room >>>");
    socket.emit("leave", userId, "2");
  };

  const submitBoard = () => {
    console.log("I submitted the board");
    socket.emit("submit", "2", userId, board);
  };
  return (
    <div>
      <input
        type="text"
        onChange={(e) => setUserId(e.target.value)}
        value={userId}
      />
      <button onClick={joinHanleBtn}>Join</button>
      <button onClick={leaveRoomBtn}>Leave Room</button>

      {otherUserName ? otherUserName : "No one else is here"}

      <button onClick={submitBoard}>submit</button>

      <p>{msg ? msg : "No message"}</p>
    </div>
  );
}

export default SocketTest;
