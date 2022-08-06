import React, { Component } from "react";
import Grid from "./Grid/Grid";
import InputButton from "./Grid/InputButton";
import PlayButton from "./Grid/PlayButton";

const startGrid = new Array(12);
for (let i = 0; i < startGrid.length; i++) startGrid[i] = new Array(12);
for (let i = 0; i < startGrid.length; i++)
  startGrid[i].fill({ clickable: true, bgColor: "white" });

class GridContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 12,
      width: 12,
      gamegrid: startGrid,
      distanceArray: [],
      activeArray: [],
    };
  }

  saveGrid = () => {
    fetch("/grid/save", {
      method: "POST",
      body: JSON.stringify({
        JWT: this.props.JWT,
        Grid: this.state.gamegrid.map((row) => {
          return row.map((sqaure) => {
            return {
              clickable: sqaure.clickable ? "true" : "false",
              bgColor: sqaure.bgColor,
            };
          });
        }),
      }),
    })
      .then((response) => response.json())
      .catch((error) => console.log("Error saving grid: ", error));
  };

  getGrid = (id) => {
    fetch("/grid/retrieve?id=" + id)
      .then((response) => response.json())
      .then((result) => this.setState({ gamegrid: result.golombPattern }))
      .catch((error) => console.log("Error retrieving grid: ", error));
  };

  verifyBounds = (num) => {
    var verified = num <= 0 ? 1 : num;
    verified = verified > 64 ? 64 : verified;
    verified = Number.isNaN(verified) ? 1 : verified;

    return verified;
  };

  constructDistanceArray = (active) => {
    let distances = [];
    for (let i = 0; i < active.length; i++) {
      for (let j = 0; j < active.length; j++) {
        if (i !== j) {
          distances.push({
            y: active[i].y - active[j].y,
            x: active[i].x - active[j].x,
          });
        }
      }
    }
    return distances;
  };

  constructGrid = (size, active, distances) => {
    const grid = new Array(size);
    for (let i = 0; i < grid.length; i++) grid[i] = new Array(size);
    //Each Array element needs to be defined or map will skip over them
    for (let i = 0; i < grid.length; i++) grid[i].fill(1);

    const newGrid = grid.map((row, y) => {
      return row.map((square, x) => {
        //Check if its an active cell
        if (
          active.findIndex((pos) => {
            return pos.x === x && pos.y === y;
          }) !== -1
        ) {
          return { clickable: true, bgColor: "green" };
        }

        //Check if its an unclickable cell
        if (
          active.findIndex((pos) => {
            return pos.y === y || pos.x === x;
          }) !== -1
        ) {
          return { clickable: false, bgColor: "red" };
        } else {
          for (let k = 0; k < active.length; k++) {
            let distance = {
              y: active[k].y - y,
              x: active[k].x - x,
            };
            if (
              distances.findIndex((dist) => {
                return (
                  (dist.x === distance.x && dist.y === distance.y) ||
                  (dist.x === -1 * distance.x && dist.y === -1 * distance.y)
                );
              }) !== -1
            ) {
              return { clickable: false, bgColor: "red" };
            }
          }
        }

        return { clickable: true, bgColor: "white" };
      });
    });

    return newGrid;
  };

  changeColor = (row, col) => {
    this.setState((prevState) => {
      //Rebuild Active Array
      const active =
        prevState.gamegrid[row][col].bgColor === "green"
          ? prevState.activeArray.filter((pos) => {
              return row !== pos.y || col !== pos.x;
            })
          : [...prevState.activeArray, { y: row, x: col }];

      const distances = this.constructDistanceArray(active);

      const newGrid = this.constructGrid(prevState.height, active, distances);

      //Set the State
      return {
        gamegrid: newGrid,
        activeArray: active,
        distanceArray: distances,
      };
    });
  };

  changeSize = (num) => {
    this.setState((prevState) => {
      const verified = this.verifyBounds(num);

      const active = prevState.activeArray.filter((activeSquare) => {
        return activeSquare.x < num && activeSquare.y < num;
      });

      const distances = this.constructDistanceArray(active);

      const newGrid = this.constructGrid(verified, active, distances);

      return {
        height: verified,
        width: verified,
        gamegrid: newGrid,
        activeArray: active,
        distanceArray: distances,
      };
    });
  };

  render() {
    return (
      <div>
        <InputButton
          change={this.changeSize}
          num={this.state.height}
          type="Size"
        />
        <Grid
          height={this.state.height}
          width={this.state.width}
          gamegrid={this.state.gamegrid}
          changeColor={this.changeColor}
        />
        <PlayButton
          activeNotes={this.state.activeArray.sort((a, b) => a.x - b.x)}
          range={this.state.height}
          length={this.state.width}
        />
        {this.props.JWT !== "" ? (
          <button
            className="btn btn-primary"
            onClick={() => {
              this.saveGrid();
            }}
          >
            Save Grid
          </button>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default GridContainer;
