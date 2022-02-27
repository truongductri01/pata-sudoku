import React from "react";
import "./Room.css"

function Square(props) {
  return (
      <input className="square"
              /*onClick={props.onclick}*/
              onKeyDown={props.onKeyDown}>
        {props.value}
      </input>
  );
}

class Board extends React.Component {

  renderSquare(i) {
    return (<Square
        value={this.props.squares[i]}
        onclick={()=> this.props.onClick(i)}
        onKeyDown={this.props.onKeyDown}
    />);
  }

  render9(i){
    return (
        <div className="board-row">
          {this.renderSquare(i)}
          {this.renderSquare(i+1)}
          {this.renderSquare(i+2)}
          {this.renderSquare(i+3)}
          {this.renderSquare(i+4)}
          {this.renderSquare(i+5)}
          {this.renderSquare(i+6)}
          {this.renderSquare(i+7)}
          {this.renderSquare(i+8)}
        </div>
    )
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

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history:[{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
    };
  }
  handleClick(i){
    const history = this.state.history.slice(0,this.state.stepNumber+1);
    const current = history[history.length -1]
    const squares = current.squares.slice();
    if (calculateWinner(squares)|| squares[i]){
      return;
    }
    squares[i]=this.state.xIsNext? 'X':'O';
    this.setState({
      history:history.concat([{squares:squares,}]),
      xIsNext: !this.state.xIsNext,
      stepNumber:history.length,
    });
  }
  jumpTo(step){
    this.setState({
      stepNumber:step,
      xIsNext: (step%2) === 0,
    });
  }

  Keydown(event){
    let keyCode = ('which' in event) ? event.which : event.keyCode;
    alert ("The Unicode key code is: " + keyCode );
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step,move)=>{
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
          <li key={move}>
            <button onClick={()=> this.jumpTo(move)}>{desc}</button>
          </li>
      )
    })
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    }
    else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
        <div className="game">
          <div className="game-board">
            <Board
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
                onKeyDown={(event)=>{this.Keydown(event)}}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Room;
