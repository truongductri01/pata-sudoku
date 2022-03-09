import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { backendRoutes } from "../../routes";

export default function Login() {
  const [userid, setuserid] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(backendRoutes + "/api/v1/user/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        username: event.target[0].value,
        password: event.target[1].value,
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
        alert("Username or Password not found");
      }
    });
  };
  return (
    <div className="login">
      <h1 className="sudoku">Login</h1>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <label style={{ fontSize: "18px" }}>
            Userid
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
          <button>login</button>
        </form>
        <br></br>
        <Link to={"/register"}>
          <button>register</button>
        </Link>
      </div>
    </div>
  );
}
