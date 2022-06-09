import React, { Component } from "react";

class Square extends Component {
  squareClick = (e) => {
    if (this.props.clickable) {
      this.props.changeColor(this.props.row, this.props.col);
    }
  };

  render() {
    return (
      <div
        className="box"
        style={{ backgroundColor: this.props.color }}
        onClick={this.squareClick}
      />
    );
  }
}

export default Square;
