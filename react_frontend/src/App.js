import React from "react";
import "./App.css";
import GridIndex from "./GridIndex";
import { useState, useEffect } from "react";

function App() {
  const [grids, setGrids] = useState([]);
  const [grid, setGrid] = useState({});
  const [JWT, setJWT] = useState("");
  const [userList, setUserList] = useState([]);

  const login = (username, password) => {
    fetch("/user/login", {
      username: username,
      password: password,
    })
      .then((response) => response.json())
      .then((result) => setJWT(result.jwt))
      .catch((error) => console.log("Error setting JWT: ", error));
  };

  const newAccount = (username, email, password) => {
    fetch("/user/add", {
      username: username,
      email: email,
      password: password,
    })
      .then((response) => response.json())
      .catch((error) => console.log("Error registering user: ", error));
  };

  const getUsers = () => {
    fetch("/user/list")
      .then((response) => response.json())
      .then((result) => setUserList(result))
      .catch((error) => console.log("Error getting users: ", error));
  };

  const saveGrid = () => {
    if (JWT != "") {
      fetch("/grid/save", {
        JWT: JWT,
        Grid: grid,
      })
        .then((response) => response.json())
        .then((result) => setGrids(result))
        .catch((error) => console.log("Error saving grid: ", error));
    }
  };

  const getGrids = () => {
    fetch("/grid/retrieveAll")
      .then((response) => response.json())
      .then((result) => setGrids(result))
      .catch((error) => console.log("Error retrieving grids: ", error));
  };

  const getGrid = (id) => {
    fetch("/grid/retrieve?id=" + id)
      .then((response) => response.json())
      .then((result) => setGrid(result))
      .catch((error) => console.log("Error retrieving grid: ", error));
  };

  return (
    <div className="GridContainer">
      <GridIndex
        grids={grids}
        getGrids={getGrids}
        grid={grid}
        getGrid={getGrid}
      />
    </div>
  );
}

export default App;
