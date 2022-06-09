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

  changeColor = (row, col) => {
    this.setState((prevState) => {
      //Rebuild Active Array
      let active =
        prevState.gamegrid[row][col].bgColor == "green"
          ? prevState.activeArray.filter((pos) => {
              return row != pos.y || col != pos.x;
            })
          : [...prevState.activeArray, { y: row, x: col }];
      
      let distances = [];
      for (let i = 0; i < active.length; i++) {
        for (let j = 0; j < active.length; j++) {
          if (i != j) {
            distances.push({
              y: active[i].y - active[j].y,
              x: active[i].x - active[j].x,
            });
          }
        }
      }
      const newGrid = prevState.gamegrid.map((row, y) => {
        return row.map((square, x) => {
          //Check if its an active cell
          if (
            active.findIndex((pos) => {
              return pos.x == x && pos.y == y;
            }) != -1
          ) {
            return { clickable: true, bgColor: "green" };
          }

          //Check if its an unclickable cell
          if (
            active.findIndex((pos) => {
              return pos.y == y || pos.x == x;
            }) != -1
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
                    (dist.x == distance.x && dist.y == distance.y) ||
                    (dist.x == -1 * distance.x && dist.y == -1 * distance.y)
                  );
                }) != -1
              ) {
                return { clickable: false, bgColor: "red" };
              }
            }
          }

          return { clickable: true, bgColor: "white" };
        });
      });

      //Set the State
      return { gamegrid: newGrid, activeArray: active, distanceArray: distances };
    });
  };

  verifyBounds = (num) => {
    var verified = num <= 0 ? 1 : num;
    verified = verified > 64 ? 64 : verified;
    verified = Number.isNaN(verified) ? 1 : verified;

    return verified;
  };

  changeSize = (num) => {
    this.setState((prevState) => {
      const verified = this.verifyBounds(num);

      const active = prevState.activeArray.filter((activeSquare) => {
        return activeSquare.x < num && activeSquare.y < num;
      });

      let distances = [];
      for (let i = 0; i < active.length; i++) {
        for (let j = 0; j < active.length; j++) {
          if (i != j) {
            distances.push({
              y: active[i].y - active[j].y,
              x: active[i].x - active[j].x,
            });
          }
        }
      }

      const grid = new Array(verified);
      for (let i = 0; i < grid.length; i++) grid[i] = new Array(verified);
      //Each Array element needs to be defined or map will skip over them
      for (let i = 0; i < grid.length; i++) grid[i].fill(1);

      const newGrid = grid.map((row, y) => {
        return row.map((square, x) => {
          //Check if its an active cell
          if (
            active.findIndex((pos) => {
              return pos.x == x && pos.y == y;
            }) != -1
          ) {
            return { clickable: true, bgColor: "green" };
          }

          //Check if its an unclickable cell
          if (
            active.findIndex((pos) => {
              return pos.y == y || pos.x == x;
            }) != -1
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
                    (dist.x == distance.x && dist.y == distance.y) ||
                    (dist.x == -1 * distance.x && dist.y == -1 * distance.y)
                  );
                }) != -1
              ) {
                return { clickable: false, bgColor: "red" };
              }
            }
          }

          return { clickable: true, bgColor: "white" };
        });
      });

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
