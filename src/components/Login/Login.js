import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";


export default function Login() {
    const [userid, setuserid] = useState("");
    const [password, setpassword] = useState("");

   

    const handleSubmit = (event) => {
        event.preventDefault();
        
      }
    return (
        <div className="login">
            <h1 className="sudoku">Login</h1>
            <div className="form">
            <form onSubmit={handleSubmit}>
                <label style={{fontSize:"18px"}}>Userid
                    <input className="username"
                    type="text" 
                    value={userid}
                    onChange={(e) => setuserid(e.target.value)}
                    />
                </label>
                <br></br>
                <br></br>
                <label style={{fontSize:"18px"}}>password
                    <br></br>
                    <input className="pass"
                    type="password" 
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    />
                </label>
                <br></br>
                <br></br>
                <button>login</button>
                
                
            </form>
            <br></br>
            <Link to={"/register"}><button>register</button></Link>
            </div>
            
        </div>


    );
}
