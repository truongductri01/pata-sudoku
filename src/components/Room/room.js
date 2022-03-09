import React, { useEffect, useState } from "react";
import Game from "./board";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { backendRoutes } from "../../routes";

const socket = io(backendRoutes);
let originalBoard = [];
let renderedBoard = [];

function Room() {
  let { roomId } = useParams();
  const userId = localStorage.getItem("id");
  const [origin, setOrigin] = useState([...originalBoard]);
  const [squares, setSquares] = useState([...renderedBoard]);
  const [win, setWin] = useState(false);

  const [otherUserName, setOtherUserName] = useState("");
  const [msg, setMsg] = useState("");
  const [winnerId, setWinnerId] = useState("");
  const [useList, setUserList] = useState([]);

  console.log("Origin >>>", origin);
  console.log("User Id >>>", userId);
  const joinRoom = () => {
    socket.emit("join", roomId, userId);
  };

  function generateBoardToValid() {
    let board = [];
    let boardToSend = [...squares];
    while (boardToSend.length) {
      board.push(boardToSend.splice(0, 9));
    }

    for (let row in board) {
      for (let column in board[row]) {
        board[row][column] =
          board[row][column] === null ? 0 : board[row][column];
      }
    }
    return board;
  }
  const submitBoard = () => {
    let board = generateBoardToValid();
    socket.emit("submit", roomId, userId, board);
  };

  useEffect(() => {
    if (origin && squares) {
      originalBoard = [...origin];
      renderedBoard = [...squares];
    }
  }, [origin, squares]);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("userConnected", socket.id);
    });

    // room join socket
    socket.on("joinfailmsg", (msg) => console.log(msg));
    socket.on("joinsuccessmsg", (msg) => console.log(msg));
    socket.on("joinmsg", (userId) => {
      setOtherUserName(userId);
    });
    socket.on("usrlist", (userListSocket) => setUserList(userListSocket));

    // game
    socket.on("gameStart", (msg) => console.log(msg));
    socket.on("board", (board) => {
      let res = Array(81).fill(null);
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          res[i * 9 + j] = board[j][i] == 0 ? 0 : board[j][i];
        }
      }
      setOrigin([...res]);
      setSquares([...res]);
    });

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
      setMsg(message);
    });

    // winner determined
    socket.on("winner", (winnerIdSocket) => {
      setWinnerId(winnerIdSocket);
    });

    // emit signal on join
    joinRoom();
  }, []);

  return (
    <div>
      <div>
        <h1>Players</h1>
      </div>
      <div className="Message">
        <p>{msg ? msg : "No msg"}</p>
      </div>

      {(!origin || !squares) && <p>Wait for the game to start</p>}
      {origin.length > 0 && squares.length > 0 && (
        <div>
          <Game
            origin={origin}
            squares={squares}
            win={win}
            setOrigin={setOrigin}
            setSquares={setSquares}
            setWin={setWin}
          />
          <button onClick={submitBoard}>Submit</button>
        </div>
      )}
    </div>
  );
}

export default Room;
