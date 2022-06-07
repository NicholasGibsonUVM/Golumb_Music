class Square extends React.Component {
  constructor(props) {
    super(props);
  }

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
