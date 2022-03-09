import React, { useState } from "react";
import "./main.css"
import { useNavigate } from "react-router-dom";

export default function Main(){
    const[roomid, setroomid]=useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/room/${roomid}`);
      }
    return(
       <div className="main">
            <form onSubmit={handleSubmit}>
                <label style={{fontSize:"18px"}}>Enter Room Id
                <br></br>
                    <input className="id"
                        type="text"
                        value={roomid}
                        onChange={(e) => setroomid(e.target.value)}
                        />
                    </label>                
                    <button className="join" onClick={handleSubmit}>Join Room</button>
                    </form>

       </div> 
    )

}