import React, { useState } from "react";
import "./signup.css";
import { Link } from "react-router-dom";


export default function Signup() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword,confirm]=useState("");

  function validateForm() {
    return email.length > 0 && password.length > 8 && password==confirmpassword;
  }

 

  const handleSubmit = (event) => {
      event.preventDefault();
      
    }
  return(
    <div className="signup">
      <h1 className="sudoku">Register</h1>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <label style={{fontSize:"18px"}}>Email
            <input className="username"
                type="email" 
                value={email}
                onChange={(e) => setemail(e.target.value)}
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
          <label style={{fontSize:"18px"}}>Confirm password
            <br></br>
            <input className="confirmpass"
              type="password" 
              value={confirmpassword}
              onChange={(e) => confirm(e.target.value)}
              />
              </label>
              <br></br>
              <br></br>
              <button className="register" disabled={!validateForm()}>register</button>
            </form> 
            <br></br>
            <Link to={"/login"}><button>login</button></Link>
        </div> 


    </div>
  )
}
  
