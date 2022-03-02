import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./main.css"

export default function Main(){
    const[roomid, setroomid]=useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        
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
                    <Link to={"/Room"}><button className="join">Join Room</button></Link>
                    </form>

       </div> 
    )

}