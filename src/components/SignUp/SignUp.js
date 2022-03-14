import React, { useState } from "react";
import "./signup.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { backendRoutes } from "../../routes";

export default function Signup() {
  const [userid, setuserid] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, confirm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(backendRoutes + "/api/v1/user/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        username: event.target[0].value,
        password: event.target[1].value,
        name: "Random name",
      }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          localStorage.setItem("id", data.id);
          localStorage.setItem("email", data.email);
          localStorage.setItem("gamesId", data.gamesId);
          localStorage.setItem("name", data.name);
          navigate("/");
        });
      } else {
        console.log(res);
      }
    });
  };
  return (
    <div className="signup">
      <h1 className="sudoku">Register</h1>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <label style={{ fontSize: "18px" }}>
            Username
            <input
              className="username"
              type="text"
              value={userid}
              onChange={(e) => setuserid(e.target.value)}
            />
          </label>
          <br></br>
          <br></br>
          <label style={{ fontSize: "18px" }}>
            password
            <br></br>
            <input
              className="pass"
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </label>
          <br></br>
          <br></br>
          <label style={{ fontSize: "18px" }}>
            Confirm password
            <br></br>
            <input
              className="confirmpass"
              type="password"
              value={confirmpassword}
              onChange={(e) => confirm(e.target.value)}
            />
          </label>
          <br></br>
          <br></br>
          <button
            className="register"
            disabled={
              !(
                userid.length > 0 &&
                password.length > 8 &&
                password == confirmpassword
              )
            }
          >
            register
          </button>
        </form>
        <br></br>
        <Link to={"/login"}>
          <button>login</button>
        </Link>
      </div>
    </div>
  );
}
