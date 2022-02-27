import React from "react";
import "./Room.css"

function Square(props) {
  return (
      <input className="square"
              onKeyPress={props.onKeyPress}
              readOnly={true}>
        {props.value}
      </input>
  );
}

class Board extends React.Component {

  renderSquare(i) {
    return (<Square
        onKeyPress={this.props.onKeyPress}
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
  KeyPress(event){
    if ( event.nativeEvent.charCode > 47 && event.nativeEvent.charCode < 58){
      event.target.value = event.key;
    }
  }


  render() {
    return (
        <div className="game">
          <div className="game-board">
            <Board
                onKeyPress={(event)=>{this.KeyPress(event)}}
            />
          </div>
        </div>
    );
  }
}


export default Room;
