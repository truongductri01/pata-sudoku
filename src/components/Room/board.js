import React, { useEffect } from "react";
import "./board.css";

function Square(props) {
  return (
    <input
      className={props.className}
      onKeyPress={props.onKeyPress}
      readOnly={true}
      value={props.value == null || props.value == 0 ? "" : props.value}
    ></input>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        className={"square" + (this.props.origin[i] !== 0 ? " readonly" : "")}
        value={this.props.squares[i]}
        onKeyPress={(event) => {
          this.props.onKeyPress(event, i);
        }}
      />
    );
  }

  render9(i) {
    return (
      <div className="board-row">
        {this.renderSquare(i)}
        {this.renderSquare(i + 1)}
        {this.renderSquare(i + 2)}
        {this.renderSquare(i + 3)}
        {this.renderSquare(i + 4)}
        {this.renderSquare(i + 5)}
        {this.renderSquare(i + 6)}
        {this.renderSquare(i + 7)}
        {this.renderSquare(i + 8)}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.render9(0)}
        {this.render9(9)}
        {this.render9(18)}
        {this.render9(27)}
        {this.render9(36)}
        {this.render9(45)}
        {this.render9(54)}
        {this.render9(63)}
        {this.render9(72)}
      </div>
    );
  }
}

function Submit(props) {
  return <button onClick={() => props.checkWin()}>{"Submit"}</button>;
}

function Game(props) {
  // constructor(props) {
  //   super(props);
  //   // this.state = {
  //   //   origin: props.origin,
  //   //   squares: props.squares,
  //   //   win: props.win,
  //   // };
  //   this.origin = props.origin;
  //   this.squares = props.squares;
  //   this.setOrigin = props.setOrigin;
  //   this.setSquares = props.setSquares;
  //   this.setWin = props.setWin;
  // }
  const origin = props.origin;
  const squares = props.squares;
  const setOrigin = props.setOrigin;
  const setSquares = props.setSquares;
  const setWin = props.setWin;

  function KeyPress(event, i) {
    if (origin[i] == 0) {
      if (event.nativeEvent.charCode > 47 && event.nativeEvent.charCode < 58) {
        let cur = squares;
        cur[i] = parseInt(event.key);
        setSquares([...cur]);
      }
    }
  }
  function doBoard(data) {
    let res = Array(81).fill(null);
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        res[i * 9 + j] = data[j][i] == 0 ? 0 : data[j][i];
      }
    }
    setSquares([...res]);
    setOrigin([...res]);
  }

  function validate(sol, board) {
    if (board === sol) {
      console.log("YOU WIN");
      setWin(true);
    } else {
      console.log("Try Again");
    }
  }

  function checkWin() {
    let board = [];
    let hold = JSON.parse(JSON.stringify(props.squares));
    while (props.squares.length) board.push(props.squares.splice(0, 9));

    for (let row in board) {
      for (let column in board[row]) {
        board[row][column] =
          board[row][column] === null ? 0 : board[row][column];
      }
    }
    const encodeBoard = (board) =>
      board.reduce(
        (result, row, i) =>
          result +
          `%5B${encodeURIComponent(row)}%5D${
            i === board.length - 1 ? "" : "%2C"
          }`,
        ""
      );

    const encodeParams = (params) =>
      Object.keys(params)
        .map((key) => key + "=" + `%5B${encodeBoard(params[key])}%5D`)
        .join("&");

    const data = { board };
    fetch("https://sugoku.herokuapp.com/solve", {
      method: "POST",
      body: encodeParams(data),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response.solution);
        validate(response.solution, board);
      })
      .catch(console.warn);
    setSquares(hold);
  }

  console.log(squares);

  return (
    <div className="page">
      <div className="game">
        <div className="game-board">
          <Board
            squares={squares}
            origin={origin}
            onKeyPress={(event, i) => {
              KeyPress(event, i);
            }}
          />
        </div>
      </div>
    </div>
  );
  // }
}

export default Game;
