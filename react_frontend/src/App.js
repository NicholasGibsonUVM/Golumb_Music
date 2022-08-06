import React from "react";
import "./App.css";
import GridIndex from "./GridIndex";
import Login from "./Login/Login";
import { useState } from "react";

function App() {
  const [grids, setGrids] = useState([]);
  const [grid, setGrid] = useState({});
  const [JWT, setJWT] = useState("");
  const [userList, setUserList] = useState([]);

  const logout = () => {
    setJWT("");
  };

  const login = (username, password, e) => {
    fetch("/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((result) => setJWT(result.jwt))
      .catch((error) => console.log("Error setting JWT: ", error));
    e.preventDefault();
  };

  const newAccount = (username, email, password, e) => {
    fetch("/user/add", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .catch((error) => console.log("Error registering user: ", error));
    e.preventDefault();
  };

  const getUsers = () => {
    fetch("/user/list")
      .then((response) => response.json())
      .then((result) => setUserList(result))
      .catch((error) => console.log("Error getting users: ", error));
  };

  return (
    <div class="container">
      <div className="row">
        <div className="col-3">
          <div className="card m-3">
            <div className="card-body">
              <Login
                JWT={JWT}
                login={login}
                logout={logout}
                register={newAccount}
              />
            </div>
          </div>
        </div>
        <div className="GridContainer col">
          <GridIndex JWT={JWT} />
        </div>
        <div className="col-3" />
      </div>
    </div>
  );
}

export default App;
