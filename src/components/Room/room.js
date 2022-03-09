import React, {useState} from "react";
import Game from "./board";
import {useParams} from "react-router-dom";


function Room () {
    let { roomId } = useParams();
    console.log(roomId);
    const [origin, setOrigin] = useState(Array(81).fill(null));
    const [squares, setSquares] = useState(Array(81).fill(null));
    const [win, setWin] = useState(false);
    // console.log(squares);
    return(
        <div><Game origin={origin} squares={squares} win={win} setOrigin={setOrigin} setSquares={setSquares} setWin={setWin}/></div>
    );
}

export default Room
