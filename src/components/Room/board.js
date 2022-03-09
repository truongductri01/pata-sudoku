import React, {useEffect} from "react";
import "./board.css"

function Square(props) {
  return (
      <input className="square"
              onKeyPress={props.onKeyPress}
              readOnly={true} value={props.value == null || props.value ==0? '': props.value} >

      </input>
  );
}

class Board extends React.Component {

  renderSquare(i) {
    return (<Square
        value = {this.props.squares[i]}
        onKeyPress={(event)=>{this.props.onKeyPress(event,i)}}
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

function Getter(props){
  useEffect(()=>{
    fetch("https://sugoku.herokuapp.com/board?difficulty=easy"
    ).then((res)=>{
      return res.json();
    }).then((data)=>{
      props.doBoard(data.board)});
  },[]);

  return(<div/>);
}

function Submit(props){
  return(
      <button
      onClick={()=>props.checkWin()}>

        {"Submit"}
      </button>
  )
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      origin :props.origin,
      squares :props.squares,
      win: props.win,
    }
    this.origin = props.origin;
    this.square = props.squares;
    this.setOrigin = props.setOrigin;
    this.setSquare = props.setSquares;
    this.setWin = props.setWin;
  }

  KeyPress(event,i){
    if (this.state.origin[i] == 0) {
      if (event.nativeEvent.charCode > 47 && event.nativeEvent.charCode < 58) {
        let cur = this.state.squares;
        cur[i] = parseInt(event.key);
        this.setSquare(cur);
      }
    }

  }
  doBoard(data) {
    let res = Array(81).fill(null);
    let res2 = Array(81).fill(null);
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        res[i * 9 + j] = data[j][i] == 0 ? 0 : data[j][i];
        res2[i * 9 + j] = data[j][i];
      }
    }
    this.setSquare(res);
    this.setOrigin(res2);
  }


  validate(sol,board){
    if(board === sol){
      console.log("YOU WIN");
      this.setWin(true)
    }

    else{
      console.log("Try Again");
    }
  }

  checkWin(){
    let board = [];
    let hold = JSON.parse(JSON.stringify( this.state.squares));
    while(this.state.squares.length) board.push(this.state.squares.splice(0,9));

    for (let row in board){
      for (let column in board[row]){
        board[row][column] = board[row][column]=== null ? 0 :board[row][column];
      }
    }
    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

    const encodeParams = (params) =>
        Object.keys(params)
            .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
            .join('&');

    const data = {board}
    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      body: encodeParams(data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
        .then(response => response.json())
        .then(response => {
          console.log(response.solution);
          this.validate(response.solution,board);
        })
        .catch(console.warn)
    this.setSquare(hold);
  }


  render() {
    const squares = this.state.squares;
    console.log(squares);
    let status = this.state.win ? 'Correct' :'Not yet correct' ;

    return (
        <div className="page">
          <div className="game">
            <div className="game-board">
              <Board
                  squares={squares}
                  onKeyPress={(event,i)=>{this.KeyPress(event,i)}}
              />
              <Getter
                 doBoard = {(data)=>this.doBoard(data)}
              />
              <div>{status}</div>
            </div>
          </div>
          <Submit
              checkWin = {()=>this.checkWin()}
          />
        </div>
    );
  }
}


export default Game;
