const startGrid = new Array(12);
for (let i = 0; i < startGrid.length; i++) startGrid[i] = new Array(12);
for (let i = 0; i < startGrid.length; i++)
  startGrid[i].fill({ clickable: true, bgColor: "white" });

class GridContainer extends React.Component {
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

  makeGrid = (height, width) => {
    const grid = new Array(height);
    for (let i = 0; i < grid.length; i++) grid[i] = new Array(width);
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (i < this.state.height && j < this.state.width) {
          grid[i][j] = {
            clickable: this.state.gamegrid[i][j].clickable,
            bgColor: this.state.gamegrid[i][j].bgColor,
          };
        } else {
          grid[i][j] = { clickable: true, bgColor: "white" };
        }
      }
    }
    return grid;
  };

  changeColor = (row, col) => {
    this.setState((prevState) => {
      const grid = prevState.gamegrid.map((el, i) => {
        if (i == row) {
          return el.map((square, j) => {
            if (j == col) {
              const newSquare = {
                clickable: square.clickable,
                bgColor: square.bgColor == "white" ? "red" : "white",
              };
              return newSquare;
            } else {
              return square;
            }
          });
        } else {
          return el;
        }
      });

      let active = [...prevState.activeArray];
      let distances = [...prevState.distanceArray];
      //Remove From active and distances
      if (grid[row][col].bgColor === "white") {
        //Remove Active
        let index = active.findIndex((pos) => {
          return pos.y == row && pos.x == col;
        });
        if (index != -1) {
          active.splice(index, 1);
        }
        //Remove Distances
        for (let i = 0; i < prevState.activeArray.length; i++) {
          let distance = {
            y: prevState.activeArray[i].y - row,
            x: prevState.activeArray[i].x - col,
          };
          if (!(distance.x == 0 && distance.y == 0)) {
            let disIndex = distances.findIndex((dist) => {
              return (
                (dist.x == distance.x && dist.y == distance.y) ||
                (dist.x == -1 * distance.x && dist.y == -1 * distance.y)
              );
            });
            if (disIndex != -1) {
              distances.splice(disIndex, 1);
            }
          }
        }
        //Add to active and distances
      } else if (grid[row][col].bgColor === "red") {
        //Add Active
        let index = active.findIndex((pos) => {
          return pos.y == row && pos.x == col;
        });
        if (index == -1) {
          active.push({ y: row, x: col });
        }
        //Add Distances
        for (let i = 0; i < prevState.activeArray.length; i++) {
          let distance = {
            y: prevState.activeArray[i].y - row,
            x: prevState.activeArray[i].x - col,
          };
          if (!(distance.x == 0 && distance.y == 0)) {
            let disIndex = distances.findIndex((dist) => {
              return (
                (dist.x == distance.x && dist.y == distance.y) ||
                (dist.x == -1 * distance.x && dist.y == -1 * distance.y)
              );
            });
            if (disIndex == -1) {
              distances.push(distance);
            }
          }
        }
      }

      //Set the State
      return { gamegrid: grid, activeArray: active, distanceArray: distances };
    });
  };

  verifyBounds = (num) => {
    var verified = num <= 0 ? 1 : num;
    verified = verified > 64 ? 64 : verified;
    verified = Number.isNaN(verified) ? 1 : verified;

    return verified;
  };

  changeHeight = (num) => {
    var verified = this.verifyBounds(num);

    this.setState((prevState) => {
      return {
        height: verified,
        gamegrid: this.makeGrid(verified, prevState.width),
      };
    });
  };

  changeWidth = (num) => {
    var verified = this.verifyBounds(num);

    this.setState((prevState) => {
      return {
        width: verified,
        gamegrid: this.makeGrid(prevState.height, verified),
      };
    });
  };

  render() {
    return (
      <div>
        <InputButton
          change={this.changeHeight}
          num={this.state.height}
          type="Height"
        />
        <InputButton
          change={this.changeWidth}
          num={this.state.width}
          type="Width"
        />
        <Grid
          height={this.state.height}
          width={this.state.width}
          gamegrid={this.state.gamegrid}
          changeColor={this.changeColor}
        />
      </div>
    );
  }
}

const domContainer = document.querySelector("#golumn-grid");
const root = ReactDOM.createRoot(domContainer);
root.render(
  <React.StrictMode>
    <GridContainer />
  </React.StrictMode>
);
